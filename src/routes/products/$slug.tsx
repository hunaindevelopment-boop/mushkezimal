import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronRight, Gift, Minus, Plus, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import products, { formatPrice, getProduct } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import Stars from '@/components/Stars'
import { useCart } from '@/lib/cart'
import { cdn } from '@/lib/image'

export const Route = createFileRoute('/products/$slug')({
  loader: ({ params }) => {
    const product = getProduct(params.slug)
    if (!product) throw notFound()
    return product
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — ${loaderData.category} | Noor & Oud` },
          { name: 'description', content: loaderData.shortDescription },
          { property: 'og:image', content: loaderData.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="font-arabic text-6xl text-saffron/60">؟</p>
      <h1 className="mt-4 font-display text-4xl">This scent has drifted away</h1>
      <Link to="/shop" className="mt-8 inline-block rounded-full bg-saffron px-6 py-3 text-sm font-medium text-ink">
        Back to the collection
      </Link>
    </div>
  ),
  component: ProductPage,
})

function ProductPage() {
  const product = Route.useLoaderData()
  const { add } = useCart()
  const [active, setActive] = useState(0)
  const [variantId, setVariantId] = useState(product.variants[0].id)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null)
  const scroller = useRef<HTMLDivElement>(null)

  // Reset selection state when navigating between products
  useEffect(() => {
    setActive(0)
    setVariantId(product.variants[0].id)
    setQty(1)
    scroller.current?.scrollTo({ left: 0 })
  }, [product.slug])

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]
  const related = products
    .filter((p) => p.id !== product.id && p.families.some((f) => product.families.includes(f)))
    .slice(0, 4)

  const handleAdd = () => {
    add(product.slug, variant.id, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const goTo = (i: number) => {
    setActive(i)
    const el = scroller.current
    if (el) el.scrollTo({ left: el.clientWidth * i, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = scroller.current
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-6 md:px-8">
        <nav className="flex items-center gap-1 text-xs text-sand/50" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-saffron">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" search={{ category: product.category }} className="hover:text-saffron">{product.category}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-sand/80">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 pt-6 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* GALLERY */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col-reverse gap-4 md:flex-row">
            <div className="flex gap-3 md:flex-col">
              {product.gallery.map((img, i) => (
                <button
                  key={img}
                  onClick={() => goTo(i)}
                  className={`arch h-20 w-16 overflow-hidden border-2 transition md:h-24 md:w-20 ${
                    active === i ? 'border-saffron' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={cdn(img, 160, 192)} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="relative flex-1">
              <div
                ref={scroller}
                onScroll={onScroll}
                className="no-scrollbar arch flex aspect-[4/5] snap-x snap-mandatory overflow-x-auto bg-plum"
              >
                {product.gallery.map((img, i) => (
                  <div
                    key={img}
                    className="relative h-full w-full shrink-0 snap-center overflow-hidden md:cursor-zoom-in"
                    onMouseMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect()
                      setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
                    }}
                    onMouseLeave={() => setZoom(null)}
                  >
                    <img
                      src={cdn(img, 1000, 1250)}
                      srcSet={`${cdn(img, 600, 750)} 600w, ${cdn(img, 1000, 1250)} 1000w, ${cdn(img, 1400, 1750)} 1400w`}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      alt={`${product.name} — image ${i + 1}`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      className="h-full w-full object-cover transition-transform duration-200"
                      style={
                        zoom && active === i
                          ? { transform: 'scale(1.8)', transformOrigin: `${zoom.x}% ${zoom.y}%` }
                          : undefined
                      }
                    />
                  </div>
                ))}
              </div>
              {product.badge && (
                <span className="absolute left-1/2 top-8 -translate-x-1/2 rounded-full bg-ink/70 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-saffron backdrop-blur">
                  {product.badge}
                </span>
              )}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
                {product.gallery.map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all ${active === i ? 'w-6 bg-saffron' : 'w-1.5 bg-sand/50'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-saffron">
            {product.category} · {product.families.join(' / ')}
          </p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <h1 className="font-display text-5xl leading-none md:text-6xl">{product.name}</h1>
            <span className="font-arabic text-3xl text-saffron/80 md:text-4xl">{product.arabic}</span>
          </div>
          <p className="mt-3 font-display text-xl italic text-sand/70">{product.tagline}</p>
          <a href="#reviews" className="mt-4 inline-flex items-center gap-2 text-sm text-sand/60 hover:text-saffron">
            <Stars rating={product.rating} /> {product.rating} · {product.reviews} reviews
          </a>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl text-saffron">{formatPrice(variant.price)}</span>
            {variant.compareAt && (
              <>
                <span className="text-lg text-sand/40 line-through">{formatPrice(variant.compareAt)}</span>
                <span className="rounded-full bg-rose/20 px-2.5 py-0.5 text-xs text-rose">
                  Save {formatPrice(variant.compareAt - variant.price)}
                </span>
              </>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-sand/75">{product.description}</p>

          {/* Variants */}
          <div className="mt-8">
            <div className="mb-3 flex justify-between text-xs uppercase tracking-[0.2em]">
              <span className="text-sand/50">Size</span>
              <span className="text-sand">{variant.label}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Choose size">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  role="radio"
                  aria-checked={v.id === variantId}
                  onClick={() => setVariantId(v.id)}
                  className={`relative rounded-2xl border px-4 py-4 text-left transition ${
                    v.id === variantId
                      ? 'border-saffron bg-saffron/10 shadow-[0_0_24px_-6px_rgba(232,163,61,0.6)]'
                      : 'border-white/15 hover:border-saffron/50'
                  }`}
                >
                  <span className="block text-sm font-medium">{v.label}</span>
                  <span className="mt-1 block text-sm text-sand/60">{formatPrice(v.price)}</span>
                  {v.compareAt && (
                    <span className="absolute -top-2 right-3 rounded-full bg-rose px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                      Best value
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + add */}
          <div className="mt-6 flex gap-3">
            <div className="flex items-center rounded-full border border-white/15">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-4 hover:text-saffron" aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center" aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(10, q + 1))} className="p-4 hover:text-saffron" aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 rounded-full bg-gradient-to-r from-saffron to-ember py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:brightness-110 active:scale-[0.98]"
            >
              {added ? '✦ Added to bag' : `Add to bag · ${formatPrice(variant.price * qty)}`}
            </button>
          </div>

          <ul className="mt-6 grid grid-cols-3 gap-3 text-center text-[11px] text-sand/60">
            <li className="rounded-2xl bg-white/[0.03] p-3"><Truck className="mx-auto mb-1.5 h-4 w-4 text-saffron" />Free over $120</li>
            <li className="rounded-2xl bg-white/[0.03] p-3"><Gift className="mx-auto mb-1.5 h-4 w-4 text-saffron" />Gift wrapped</li>
            <li className="rounded-2xl bg-white/[0.03] p-3"><RotateCcw className="mx-auto mb-1.5 h-4 w-4 text-saffron" />30-day returns</li>
          </ul>

          {/* Notes pyramid */}
          <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-b from-plum/60 to-transparent p-6">
            <h2 className="mb-5 font-display text-2xl">The scent story</h2>
            {(
              [
                ['Top', product.notes.top, 'First 15 minutes'],
                ['Heart', product.notes.heart, '1–4 hours'],
                ['Base', product.notes.base, 'The lingering trail'],
              ] as const
            ).map(([label, notes, when], i) => (
              <div key={label} className="flex items-start gap-4 border-t border-white/5 py-4 first:border-t-0 first:pt-0">
                <span
                  className="mt-1 h-3 w-3 shrink-0 rounded-full"
                  style={{ background: product.accent, opacity: 0.4 + i * 0.3 }}
                />
                <div className="flex-1">
                  <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-sand/50">
                    <span>{label} notes</span>
                    <span className="normal-case tracking-normal">{when}</span>
                  </div>
                  <p className="mt-1 text-lg">{notes.join(' · ')}</p>
                </div>
              </div>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-6 border-t border-white/5 pt-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-sand/50">Intensity</p>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={`h-1.5 flex-1 rounded-full ${n <= product.intensity ? 'bg-gradient-to-r from-saffron to-ember' : 'bg-white/10'}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-sand/50">Longevity</p>
                <p className="mt-1">{product.longevity}</p>
              </div>
            </div>
          </div>

          {/* Accordions */}
          <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
            <Accordion title={product.category === 'Attar' ? 'How to wear attar' : 'How to wear'}>
              {product.category === 'Attar'
                ? 'Warm the bottle in your palm. Glide the dipstick over your wrists, behind the ears and at the base of the throat. Do not rub — let the oil unfold with your body heat. Layer beneath a parfum for extra depth.'
                : 'Spray from 15 cm onto pulse points and clothing. For an evening trail, layer over a drop of attar from the same scent family.'}
            </Accordion>
            <Accordion title="Ingredients & craft">
              {product.category === 'Attar'
                ? 'Botanical distillates macerated in a sandalwood or fractionated coconut base for 40+ days. Alcohol-free, vegan, and free from phthalates.'
                : 'Perfume-grade alcohol, fragrance oils (up to 25% concentration), aged for six weeks before bottling. Vegan and cruelty-free.'}
            </Accordion>
            <Accordion title="Shipping & returns">
              Orders ship within 1–2 business days in a hand-sealed gift box. Free standard shipping over $120. Unopened
              items can be returned within 30 days.
            </Accordion>
          </div>

          <p className="mt-6 flex items-center gap-2 text-xs text-sand/50">
            <ShieldCheck className="h-4 w-4 text-saffron" /> Secure checkout · Authentic, atelier-blended
          </p>
        </div>
      </section>

      {/* Reviews snapshot */}
      <section id="reviews" className="mx-auto max-w-7xl scroll-mt-28 px-4 pb-20 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-saffron/20 bg-plum/40 p-8">
            <p className="font-display text-6xl text-saffron">{product.rating}</p>
            <Stars rating={product.rating} size={18} />
            <p className="mt-2 text-sm text-sand/60">Based on {product.reviews} verified reviews</p>
          </div>
          {[
            { name: 'Aisha K.', text: 'I get compliments every single time. One drop lasts me well into the evening.' },
            { name: 'Omar R.', text: 'Rich and genuinely beautiful. The packaging alone felt like opening a gift.' },
          ].map((r) => (
            <blockquote key={r.name} className="rounded-3xl border border-white/10 p-8">
              <Stars rating={5} />
              <p className="mt-4 font-display text-lg italic leading-relaxed">“{r.text}”</p>
              <footer className="mt-4 text-xs uppercase tracking-[0.2em] text-sand/50">{r.name} · Verified buyer</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8 lg:pb-0">
          <h2 className="mb-10 font-display text-4xl md:text-5xl">
            You may also <em className="text-saffron">adore</em>
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile sticky add-to-bag */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-white/10 bg-ink/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm">{product.name}</p>
          <p className="text-xs text-sand/60">{variant.label} · <span className="text-saffron">{formatPrice(variant.price)}</span></p>
        </div>
        <button
          onClick={handleAdd}
          className="rounded-full bg-gradient-to-r from-saffron to-ember px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-ink"
        >
          {added ? 'Added ✦' : 'Add to bag'}
        </button>
      </div>
    </>
  )
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-4 text-left text-sm uppercase tracking-[0.18em]"
        aria-expanded={open}
      >
        {title}
        <ChevronDown className={`h-4 w-4 text-saffron transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]'}`}>
        <p className="overflow-hidden text-sm leading-relaxed text-sand/70">{children}</p>
      </div>
    </div>
  )
}
