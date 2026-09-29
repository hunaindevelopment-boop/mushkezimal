import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useCart } from '@/lib/cart'

export const Route = createFileRoute('/checkout/success')({
  component: CheckoutSuccess,
})

function CheckoutSuccess() {
  const { clear } = useCart()

  useEffect(() => {
    clear()
  }, [])

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-5">
      <div className="max-w-lg text-center">
        <div className="arch mx-auto mb-8 grid h-32 w-24 place-items-center border border-saffron/50 bg-gradient-to-b from-saffron/20 to-transparent">
          <span className="font-display text-4xl text-saffron">✦</span>
        </div>
        <p className="font-arabic text-3xl text-saffron/70">شكراً</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Your order is on its way</h1>
        <p className="mt-4 text-sand/70">
          Thank you for choosing Noor &amp; Oud. Your fragrances are being hand-sealed in our atelier, with a
          complimentary attar sample tucked inside. A confirmation email is headed to your inbox.
        </p>
        <Link to="/shop" className="mt-8 inline-block rounded-full bg-saffron px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink hover:bg-sand">
          Continue exploring
        </Link>
      </div>
    </div>
  )
}
