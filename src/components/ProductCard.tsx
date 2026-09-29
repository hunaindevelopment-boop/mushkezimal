import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { formatPrice, minPrice } from '@/data/products'
import type { Product } from '@/data/products'
import { useCart } from '@/lib/cart'
import { cdn } from '@/lib/image'
import Stars from './Stars'

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart()
  const from = minPrice(product)

  return (
    <article
      className="rise group relative flex flex-col"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="arch relative block aspect-[4/5] overflow-hidden bg-plum"
      >
        <img
          src={cdn(product.image, 600, 750)}
          srcSet={`${cdn(product.image, 400, 500)} 400w, ${cdn(product.image, 600, 750)} 600w, ${cdn(product.image, 900, 1125)} 900w`}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div
          className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(to top, ${product.accent}55, transparent 60%)` }}
        />
        {product.badge && (
          <span className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-saffron backdrop-blur">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-3 right-3 font-arabic text-lg text-sand/80 drop-shadow">
          {product.arabic}
        </span>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-sand/50">
            {product.category} · {product.families.slice(0, 2).join(' / ')}
          </p>
          <h3 className="mt-1 truncate font-display text-lg leading-tight md:text-xl">
            <Link to="/products/$slug" params={{ slug: product.slug }} className="hover:text-saffron">
              {product.name}
            </Link>
          </h3>
          <div className="mt-1.5 flex items-center gap-2 text-xs text-sand/50">
            <Stars rating={product.rating} size={12} />
            <span>({product.reviews})</span>
          </div>
          <p className="mt-2 text-sm">
            <span className="text-sand/50">from </span>
            <span className="font-medium text-saffron">{formatPrice(from)}</span>
          </p>
        </div>
        <button
          onClick={() => add(product.slug, product.variants[0].id)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-saffron/40 text-saffron transition hover:rotate-90 hover:bg-saffron hover:text-ink"
          aria-label={`Add ${product.name} (${product.variants[0].label}) to bag`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
