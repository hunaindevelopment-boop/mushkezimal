import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import products, { CATEGORIES, FAMILIES, minPrice } from '@/data/products'
import type { Category, Family } from '@/data/products'
import ProductCard from '@/components/ProductCard'

const SORTS = {
  featured: 'Featured',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  rating: 'Top rated',
  intensity: 'Most intense',
} as const
type Sort = keyof typeof SORTS

const PRICE_CAPS = [50, 100, 150] as const

interface ShopSearch {
  q?: string
  category?: Category
  family?: Family
  sort?: Sort
  max?: number
}

export const Route = createFileRoute('/shop')({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search.q === 'string' && search.q ? search.q : undefined,
    category: CATEGORIES.includes(search.category as Category) ? (search.category as Category) : undefined,
    family: FAMILIES.includes(search.family as Family) ? (search.family as Family) : undefined,
    sort: search.sort && search.sort in SORTS ? (search.sort as Sort) : undefined,
    max: PRICE_CAPS.includes(Number(search.max) as (typeof PRICE_CAPS)[number]) ? Number(search.max) : undefined,
  }),
  head: () => ({ meta: [{ title: 'Shop attars & parfums — Noor & Oud' }] }),
  component: Shop,
})

function Shop() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: '/shop' })
  const [query, setQuery] = useState(search.q ?? '')
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Debounce typing into the URL so the query stays shareable without thrashing history
  useEffect(() => {
    const t = setTimeout(() => {
      if ((search.q ?? '') !== query) {
        navigate({ search: (s) => ({ ...s, q: query || undefined }), replace: true })
      }
    }, 200)
    return () => clearTimeout(t)
  }, [query])

  useEffect(() => setQuery(search.q ?? ''), [search.q])

  const update = (patch: Partial<ShopSearch>) =>
    navigate({ search: (s) => ({ ...s, ...patch }), replace: true, resetScroll: false })

  const results = useMemo(() => {
    const q = (search.q ?? '').trim().toLowerCase()
    const list = products.filter((p) => {
      if (search.category && p.category !== search.category) return false
      if (search.family && !p.families.includes(search.family)) return false
      if (search.max && minPrice(p) > search.max) return false
      if (q) {
        const haystack = [p.name, p.tagline, p.shortDescription, p.category, ...p.families, ...p.notes.top, ...p.notes.heart, ...p.notes.base]
          .join(' ')
          .toLowerCase()
        return q.split(/\s+/).every((term) => haystack.includes(term))
      }
      return true
    })
    switch (search.sort) {
      case 'price-asc':
        return [...list].sort((a, b) => minPrice(a) - minPrice(b))
      case 'price-desc':
        return [...list].sort((a, b) => minPrice(b) - minPrice(a))
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
      case 'intensity':
        return [...list].sort((a, b) => b.intensity - a.intensity)
      default:
        return list
    }
  }, [search])

  const activeCount = [search.category, search.family, search.max].filter(Boolean).length

  const heading = search.family
    ? `${search.family} fragrances`
    : search.category === 'Attar'
      ? 'Attars'
      : search.category
        ? `${search.category}s`
        : 'All fragrances'

  const filters = (
    <div className="space-y-8">
      <FilterGroup title="Type">
        <Chip active={!search.category} onClick={() => update({ category: undefined })}>All</Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c} active={search.category === c} onClick={() => update({ category: search.category === c ? undefined : c })}>
            {c}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="Scent family">
        {FAMILIES.map((f) => (
          <Chip key={f} active={search.family === f} onClick={() => update({ family: search.family === f ? undefined : f })}>
            {f}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="Starting price">
        <Chip active={!search.max} onClick={() => update({ max: undefined })}>Any</Chip>
        {PRICE_CAPS.map((cap) => (
          <Chip key={cap} active={search.max === cap} onClick={() => update({ max: search.max === cap ? undefined : cap })}>
            Under ${cap}
          </Chip>
        ))}
      </FilterGroup>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 md:px-8 md:pt-12">
      <header className="mb-10">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-saffron">The collection</p>
        <h1 className="font-display text-5xl md:text-7xl">{heading}</h1>
      </header>

      {/* Search + sort bar */}
      <div className="sticky top-16 z-30 -mx-4 mb-10 flex flex-wrap items-center gap-3 border-y border-white/10 bg-ink/85 px-4 py-3 backdrop-blur-xl md:top-20 md:mx-0 md:rounded-full md:border md:px-3">
        <label className="relative flex min-w-0 flex-1 items-center">
          <Search className="pointer-events-none absolute left-4 h-4 w-4 text-sand/50" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search oud, rose, saffron, vanilla…"
            className="w-full rounded-full bg-white/5 py-3 pl-11 pr-4 text-sm outline-none ring-saffron/50 placeholder:text-sand/40 focus:ring-2"
            aria-label="Search fragrances"
          />
        </label>
        <button
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
          {activeCount > 0 && <span className="grid h-5 w-5 place-items-center rounded-full bg-saffron text-[10px] font-bold text-ink">{activeCount}</span>}
        </button>
        <select
          value={search.sort ?? 'featured'}
          onChange={(e) => update({ sort: e.target.value === 'featured' ? undefined : (e.target.value as Sort) })}
          className="rounded-full border border-white/15 bg-ink px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-saffron/50"
          aria-label="Sort by"
        >
          {Object.entries(SORTS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-44">{filters}</div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-sand/60">
            <span>{results.length} {results.length === 1 ? 'fragrance' : 'fragrances'}</span>
            {search.category && <ActiveTag label={search.category} onClear={() => update({ category: undefined })} />}
            {search.family && <ActiveTag label={search.family} onClear={() => update({ family: undefined })} />}
            {search.max && <ActiveTag label={`Under $${search.max}`} onClear={() => update({ max: undefined })} />}
            {search.q && <ActiveTag label={`“${search.q}”`} onClear={() => setQuery('')} />}
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-2 md:gap-x-6 xl:grid-cols-3">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center rounded-3xl border border-dashed border-white/15 py-20 text-center">
              <p className="font-arabic text-5xl text-saffron/60">؟</p>
              <p className="mt-4 font-display text-3xl">No scent matches… yet</p>
              <p className="mt-2 text-sm text-sand/60">Try a different note or clear your filters.</p>
              <Link to="/shop" className="mt-6 rounded-full bg-saffron px-6 py-3 text-sm font-medium text-ink">
                Clear everything
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <div className={`fixed inset-0 z-50 lg:hidden ${filtersOpen ? '' : 'pointer-events-none'}`} aria-hidden={!filtersOpen}>
        <div
          className={`absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity ${filtersOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setFiltersOpen(false)}
        />
        <div
          className={`absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-white/10 bg-night p-6 transition-transform duration-300 ${
            filtersOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl">Filters</h2>
            <button onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="p-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          {filters}
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => update({ category: undefined, family: undefined, max: undefined })}
              className="flex-1 rounded-full border border-white/15 py-3 text-sm"
            >
              Reset
            </button>
            <button onClick={() => setFiltersOpen(false)} className="flex-1 rounded-full bg-saffron py-3 text-sm font-semibold text-ink">
              Show {results.length}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs uppercase tracking-[0.25em] text-sand/50">{title}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active ? 'border-saffron bg-saffron text-ink' : 'border-white/15 text-sand/80 hover:border-saffron/60 hover:text-saffron'
      }`}
    >
      {children}
    </button>
  )
}

function ActiveTag({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <button
      onClick={onClear}
      className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-sand hover:bg-rose/30"
    >
      {label} <X className="h-3 w-3" />
    </button>
  )
}
