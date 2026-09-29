import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { createCheckoutSession, getStripeEnabled } from '@/lib/stripe'
import { formatPrice } from '@/data/products'
import { cdn } from '@/lib/image'

const FREE_SHIPPING = 120

export default function CartDrawer() {
  const { lines, subtotal, isOpen, close, setQty, remove, count } = useCart()
  const [stripeEnabled, setStripeEnabled] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getStripeEnabled().then(setStripeEnabled).catch(() => setStripeEnabled(false))
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close])

  const checkout = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = await createCheckoutSession({
        data: lines.map(({ slug, variantId, qty }) => ({ slug, variantId, qty })),
      })
      if (url) window.location.href = url
    } catch (e) {
      console.error('Checkout error:', e)
      setError('Something went wrong starting checkout. Please try again.')
      setLoading(false)
    }
  }

  const remaining = Math.max(0, FREE_SHIPPING - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100)

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div
        className={`absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={close}
      />
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-white/10 bg-night shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="font-display text-2xl">
            Your bag <span className="text-base text-sand/50">({count})</span>
          </h2>
          <button onClick={close} className="p-2 hover:text-saffron" aria-label="Close bag">
            <X className="h-5 w-5" />
          </button>
        </div>

        {lines.length > 0 && (
          <div className="border-b border-white/10 px-6 py-4">
            <p className="mb-2 text-xs text-sand/70">
              {remaining > 0 ? (
                <>
                  You're <span className="text-saffron">{formatPrice(remaining)}</span> away from free shipping
                </>
              ) : (
                <span className="text-saffron">✦ You've unlocked free shipping</span>
              )}
            </p>
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose via-ember to-saffron transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="arch mb-6 grid h-28 w-20 place-items-center border border-saffron/30">
                <ShoppingBag className="h-7 w-7 text-saffron/70" />
              </div>
              <p className="font-display text-2xl">Your bag is empty</p>
              <p className="mt-2 text-sm text-sand/60">Every signature scent starts with a single drop.</p>
              <Link
                to="/shop"
                onClick={close}
                className="mt-6 rounded-full bg-saffron px-6 py-3 text-sm font-medium text-ink hover:bg-sand"
              >
                Explore the collection
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {lines.map((line) => (
                <li key={`${line.slug}-${line.variantId}`} className="flex gap-4 py-4">
                  <Link
                    to="/products/$slug"
                    params={{ slug: line.slug }}
                    onClick={close}
                    className="arch block h-24 w-20 shrink-0 overflow-hidden bg-plum"
                  >
                    <img src={cdn(line.product.image, 160, 192)} alt={line.product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-display text-lg leading-tight">{line.product.name}</p>
                        <p className="text-xs text-sand/50">{line.variant.label}</p>
                      </div>
                      <button
                        onClick={() => remove(line.slug, line.variantId)}
                        className="p-1 text-sand/40 hover:text-rose"
                        aria-label={`Remove ${line.product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-white/15">
                        <button
                          onClick={() => setQty(line.slug, line.variantId, line.qty - 1)}
                          className="p-2 hover:text-saffron"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{line.qty}</span>
                        <button
                          onClick={() => setQty(line.slug, line.variantId, line.qty + 1)}
                          className="p-2 hover:text-saffron"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-saffron">{formatPrice(line.lineTotal)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5">
            <div className="mb-1 flex justify-between text-sm text-sand/70">
              <span>Subtotal</span>
              <span className="text-lg text-sand">{formatPrice(subtotal)}</span>
            </div>
            <p className="mb-4 text-xs text-sand/40">Shipping and taxes calculated at checkout.</p>
            {error && <p className="mb-3 text-xs text-rose">{error}</p>}
            <button
              onClick={checkout}
              disabled={loading || !stripeEnabled}
              className="w-full rounded-full bg-gradient-to-r from-saffron to-ember py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Opening checkout…' : stripeEnabled === false ? 'Checkout coming soon' : 'Checkout'}
            </button>
            {stripeEnabled === false && (
              <p className="mt-2 text-center text-xs text-sand/40">
                Secure payments are being configured for this store.
              </p>
            )}
          </div>
        )}
      </aside>
    </div>
  )
}
