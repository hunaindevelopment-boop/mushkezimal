import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/lib/cart'

const nav = [
  { label: 'Shop all', to: '/shop', search: {} },
  { label: 'Attars', to: '/shop', search: { category: 'Attar' } },
  { label: 'Parfums', to: '/shop', search: { category: 'Eau de Parfum' } },
  { label: 'Extraits', to: '/shop', search: { category: 'Extrait' } },
  { label: 'Gift sets', to: '/shop', search: { category: 'Gift Set' } },
] as const

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="Mush e Zimal home">
      <span className="arch relative grid h-9 w-7 place-items-center border border-saffron/70 bg-gradient-to-b from-saffron/25 to-transparent">
        <span className="h-2 w-2 rounded-full bg-saffron shadow-[0_0_12px_3px_rgba(232,163,61,0.7)] transition group-hover:scale-125" />
      </span>
      <span className="font-display text-xl tracking-wide md:text-2xl">
        Noor <span className="italic text-saffron">&amp;</span> Oud
      </span>
    </Link>
  )
}

export default function Header() {
  const { count, open } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="bg-saffron py-1.5 text-center text-[11px] font-medium uppercase tracking-[0.25em] text-ink">
        Free shipping over $120 · Complimentary attar sample with every order
      </div>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'border-b border-white/10 bg-ink/80 backdrop-blur-xl' : 'bg-transparent'
          }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
          <button
            className="-ml-2 p-2 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Logo />

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                search={item.search}
                activeOptions={{ includeSearch: true }}
                className="text-sm tracking-wide text-sand/75 transition hover:text-saffron data-[status=active]:text-saffron"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link to="/shop" className="hidden p-2 text-sand/80 hover:text-saffron sm:block" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
            <button
              onClick={open}
              className="relative -mr-2 p-2 text-sand/90 hover:text-saffron"
              aria-label={`Open bag, ${count} items`}
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-rose px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 left-0 flex w-80 max-w-[85%] flex-col bg-night p-6 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="mb-10 flex items-center justify-between">
            <Logo />
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                search={item.search}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/5 py-4 font-display text-2xl hover:text-saffron"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="mt-auto font-arabic text-3xl text-saffron/60">نور و عود</p>
        </aside>
      </div>
    </>
  )
}
