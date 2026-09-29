import { Link } from '@tanstack/react-router'
import { Logo } from './Header'

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-night">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 right-0 select-none font-arabic text-[10rem] leading-none text-white/[0.03] md:text-[18rem]"
      >
        نور و عود
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand/60">
            Hand-blended attars and parfums from our atelier — rooted in centuries-old Arabian
            perfumery, made for the way you live now.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-saffron">Shop</h4>
          <ul className="space-y-2 text-sm text-sand/70">
            <li><Link to="/shop" search={{ category: 'Attar' }} className="hover:text-saffron">Attars</Link></li>
            <li><Link to="/shop" search={{ category: 'Eau de Parfum' }} className="hover:text-saffron">Eau de Parfum</Link></li>
            <li><Link to="/shop" search={{ category: 'Extrait' }} className="hover:text-saffron">Extraits</Link></li>
            <li><Link to="/shop" search={{ category: 'Gift Set' }} className="hover:text-saffron">Gift sets</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-saffron">House</h4>
          <ul className="space-y-2 text-sm text-sand/70">
            <li>Shipping &amp; returns</li>
            <li>The art of attar</li>
            <li>Contact the atelier</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/5 py-6 text-center text-xs text-sand/40">
        © {new Date().getFullYear()} Noor &amp; Oud Atelier. Crafted with patience.
      </div>
    </footer>
  )
}
