import { Link, createFileRoute } from '@tanstack/react-router'
import { useCart } from '@/lib/cart'

export const Route = createFileRoute('/checkout/cancel')({
  component: CheckoutCancel,
})

function CheckoutCancel() {
  const { open } = useCart()

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-5">
      <div className="max-w-lg text-center">
        <p className="font-arabic text-5xl text-saffron/60">؟</p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">Checkout paused</h1>
        <p className="mt-4 text-sand/70">
          No charge was made. Your bag is saved exactly as you left it — whenever you're ready.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={open} className="rounded-full bg-saffron px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink hover:bg-sand">
            Return to bag
          </button>
          <Link to="/shop" className="rounded-full border border-sand/30 px-7 py-4 text-sm uppercase tracking-[0.18em] hover:border-saffron hover:text-saffron">
            Keep browsing
          </Link>
        </div>
      </div>
    </div>
  )
}
