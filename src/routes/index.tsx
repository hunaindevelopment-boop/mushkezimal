import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Droplet, Flame, Leaf, Sparkles } from 'lucide-react'
import products, { FAMILIES } from '@/data/products'
import type { Family } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import { cdn } from '@/lib/image'

export const Route = createFileRoute('/')({
  component: Home,
})

const familyArt: Record<Family, { img: string; line: string; arabic: string }> = {
  Oud: { img: '/img/ctx-oud.jpg', line: 'Smoky, resinous, regal', arabic: 'عود' },
  Floral: { img: '/img/ctx-florals.jpg', line: 'Rose, jasmine, blossom', arabic: 'زهور' },
  Amber: { img: '/img/p-desert-amber.jpg', line: 'Warm, golden, sweet', arabic: 'عنبر' },
  Musk: { img: '/img/p-white-musk.jpg', line: 'Clean, soft, skin-close', arabic: 'مسك' },
  Citrus: { img: '/img/p-neroli-souk.jpg', line: 'Bright, sunlit, fresh', arabic: 'حمضيات' },
  Spice: { img: '/img/ctx-spice.jpg', line: 'Saffron, clove, fire', arabic: 'توابل' },
  Woody: { img: '/img/p-sandalwood-sultan.jpg', line: 'Sandalwood, cedar, calm', arabic: 'خشب' },
}

const marquee = ['Cambodian Oud', 'Taif Rose', 'Iranian Saffron', 'Mysore Sandalwood', 'White Musk', 'Moroccan Amber', 'Jasmine Sambac', 'Tunisian Neroli']

function Home() {
  const bestsellers = products.filter((p) => p.badge === 'Bestseller' || p.badge === 'New').slice(0, 4)
  const attars = products.filter((p) => p.category === 'Attar').slice(0, 4)

  return (
    <>
      {/* HERO */}
      <section className="relative -mt-16 overflow-hidden md:-mt-20">
        <div className="absolute inset-0">
          <img
            src={cdn('/img/hero.jpg', 1920)}
            srcSet={`${cdn('/img/hero.jpg', 900)} 900w, ${cdn('/img/hero.jpg', 1400)} 1400w, ${cdn('/img/hero.jpg', 1920)} 1920w`}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-transparent md:via-ink/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        </div>

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pb-20 pt-40 md:justify-center md:px-8 md:pb-24">
          <p className="rise mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-saffron/30 bg-ink/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-saffron backdrop-blur">
            <Sparkles className="h-3 w-3" /> The Autumn Oud Collection
          </p>
          <h1 className="rise max-w-3xl font-display text-5xl leading-[0.95] sm:text-6xl md:text-8xl" style={{ animationDelay: '100ms' }}>
            Wear the <em className="gold-text">light</em>,<br />
            leave the <em className="gold-text">smoke</em>.
          </h1>
          <p className="rise mt-6 max-w-lg text-base leading-relaxed text-sand/75 md:text-lg" style={{ animationDelay: '200ms' }}>
            Pure attars and artisan parfums, hand-blended from oud, Taif rose, saffron and amber.
            Alcohol-free oils and long-lasting extraits made to linger long after you've left the room.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: '300ms' }}>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-saffron to-ember px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:brightness-110"
            >
              Shop the collection <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/shop"
              search={{ category: 'Attar' }}
              className="inline-flex items-center gap-2 rounded-full border border-sand/30 px-7 py-4 text-sm uppercase tracking-[0.18em] backdrop-blur transition hover:border-saffron hover:text-saffron"
            >
              Discover attars
            </Link>
          </div>
          <div className="rise mt-14 flex gap-10 text-sm text-sand/60" style={{ animationDelay: '400ms' }}>
            <div><span className="block font-display text-3xl text-sand">40+</span>days maceration</div>
            <div><span className="block font-display text-3xl text-sand">100%</span>alcohol-free attars</div>
            <div className="hidden sm:block"><span className="block font-display text-3xl text-sand">4.8★</span>3,000+ reviews</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative overflow-hidden border-y border-saffron/20 bg-plum/60 py-5">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-2xl italic text-sand/80 md:text-3xl">
              {item}
              <span className="text-base not-italic text-saffron">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* BESTSELLERS */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-saffron">Most coveted</p>
            <h2 className="font-display text-4xl md:text-6xl">
              The <em className="text-saffron">signatures</em>
            </h2>
          </div>
          <Link to="/shop" className="group inline-flex items-center gap-2 text-sm text-sand/70 hover:text-saffron">
            View all {products.length} fragrances <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 lg:grid-cols-4">
          {bestsellers.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* SCENT FAMILIES */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-saffron">Find your family</p>
          <h2 className="mb-12 max-w-2xl font-display text-4xl md:text-6xl">
            What does your <em className="text-saffron">soul</em> smell like?
          </h2>
        </div>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {FAMILIES.map((family) => (
            <Link
              key={family}
              to="/shop"
              search={{ family }}
              className="group arch relative block aspect-[3/4] w-56 shrink-0 snap-start overflow-hidden md:w-64"
            >
              <img
                src={cdn(familyArt[family].img, 400, 533)}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <span className="absolute left-1/2 top-8 -translate-x-1/2 font-arabic text-3xl text-saffron/80">
                {familyArt[family].arabic}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                <h3 className="font-display text-3xl">{family}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-sand/60">{familyArt[family].line}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* THE ART OF ATTAR */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 md:grid-cols-2 md:gap-20 md:px-8">
        <div className="relative">
          <div className="arch aspect-[4/5] overflow-hidden">
            <img src={cdn('/img/ctx-ritual.jpg', 800, 1000)} alt="Applying attar oil to the wrist" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="arch absolute -bottom-8 -right-4 hidden aspect-[3/4] w-40 overflow-hidden border-4 border-ink sm:block md:-right-10 md:w-52">
            <img src={cdn('/img/ctx-atelier.jpg', 400, 533)} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div aria-hidden className="smoke absolute bottom-1/3 left-1/2 h-24 w-24 rounded-full bg-sand/20 blur-2xl" />
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-saffron">The art of attar</p>
          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            One drop. <em className="text-saffron">All day.</em> No alcohol.
          </h2>
          <p className="mt-6 leading-relaxed text-sand/70">
            Attar is perfume in its oldest, purest form — botanicals slowly distilled into precious oil, then aged
            until every note melts into the next. Dab a single drop on your pulse points and let the warmth of your
            skin bring it to life.
          </p>
          <ul className="mt-10 space-y-6">
            {[
              { icon: Droplet, title: 'Pure concentrated oil', text: 'Up to 10× the concentration of a typical eau de parfum.' },
              { icon: Flame, title: 'Slow-distilled in copper', text: 'Traditional deg-bhapka distillation over wood fire.' },
              { icon: Leaf, title: 'Skin-kind & alcohol-free', text: 'Gentle on skin, halal-friendly, travel-ready.' },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-saffron/40 text-saffron">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-sand/60">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ATTARS */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-saffron">Pure perfume oils</p>
            <h2 className="font-display text-4xl md:text-6xl">
              The <em className="text-saffron">attar</em> cellar
            </h2>
          </div>
          <Link
            to="/shop"
            search={{ category: 'Attar' }}
            className="group inline-flex items-center gap-2 text-sm text-sand/70 hover:text-saffron"
          >
            All attars <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 lg:grid-cols-4">
          {attars.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* DISCOVERY SET CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-saffron/20 bg-gradient-to-br from-velvet via-plum to-night">
          <div className="grid items-center md:grid-cols-2">
            <div className="p-8 md:p-14">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-saffron">Can't decide?</p>
              <h2 className="font-display text-4xl leading-tight md:text-5xl">
                Six jewels.<br /> <em className="gold-text">One velvet box.</em>
              </h2>
              <p className="mt-5 max-w-md text-sand/70">
                Our six best-loved attars in miniature — the most beautiful way to find your signature. Includes
                credit toward your first full size.
              </p>
              <Link
                to="/products/$slug"
                params={{ slug: 'attar-discovery-set' }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-sand px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-saffron"
              >
                Shop the set · $58
              </Link>
            </div>
            <img
              src={cdn('/img/p-discovery-set.jpg', 900, 800)}
              alt="Six Jewels attar discovery set"
              loading="lazy"
              className="h-72 w-full object-cover md:h-full"
            />
          </div>
        </div>
      </section>
    </>
  )
}
