import { createServerFn } from '@tanstack/react-start'
import products from '@/data/products'

export const getStripeEnabled = createServerFn({ method: 'GET' }).handler(
  () => !!process.env.STRIPE_SECRET_KEY
)

type CheckoutLine = { slug: string; variantId: string; qty: number }

export const createCheckoutSession = createServerFn({
  method: 'POST',
})
  .inputValidator((lines: Array<CheckoutLine>) => lines)
  .handler(async ({ data: lines }) => {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe is not configured')
    }
    const { default: Stripe } = await import('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const siteUrl = process.env.URL ?? process.env.SITE_URL ?? 'http://localhost:3000'

    // Prices are always resolved server-side from the catalog, never trusted from the client
    const line_items = lines.map((line) => {
      const product = products.find((p) => p.slug === line.slug)
      const variant = product?.variants.find((v) => v.id === line.variantId)
      if (!product || !variant) {
        throw new Error('Product not found')
      }
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${product.name} — ${variant.label}`,
            description: product.shortDescription,
            images: [`${siteUrl}${product.image}`],
          },
          unit_amount: variant.price * 100,
        },
        quantity: Math.max(1, Math.min(10, Math.floor(line.qty))),
      }
    })

    if (line_items.length === 0) {
      throw new Error('Cart is empty')
    }

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'AE', 'SA', 'IN', 'AU'] },
      success_url: `${siteUrl}/checkout/success`,
      cancel_url: `${siteUrl}/checkout/cancel`,
    })

    return session.url
  })
