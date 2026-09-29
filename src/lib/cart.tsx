import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import products from '@/data/products'
import type { Product, Variant } from '@/data/products'

export interface CartLine {
  slug: string
  variantId: string
  qty: number
}

export interface ResolvedLine extends CartLine {
  product: Product
  variant: Variant
  lineTotal: number
}

interface CartContextValue {
  lines: Array<ResolvedLine>
  count: number
  subtotal: number
  isOpen: boolean
  open: () => void
  close: () => void
  add: (slug: string, variantId: string, qty?: number) => void
  setQty: (slug: string, variantId: string, qty: number) => void
  remove: (slug: string, variantId: string) => void
  clear: () => void
}

const STORAGE_KEY = 'noor-oud-cart'
const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<Array<CartLine>>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setRaw(JSON.parse(saved))
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(raw))
  }, [raw, hydrated])

  const lines = useMemo(
    () =>
      raw.flatMap((line) => {
        const product = products.find((p) => p.slug === line.slug)
        const variant = product?.variants.find((v) => v.id === line.variantId)
        if (!product || !variant) return []
        return [{ ...line, product, variant, lineTotal: variant.price * line.qty }]
      }),
    [raw],
  )

  const add = useCallback((slug: string, variantId: string, qty = 1) => {
    setRaw((prev) => {
      const existing = prev.find((l) => l.slug === slug && l.variantId === variantId)
      if (existing) {
        return prev.map((l) => (l === existing ? { ...l, qty: Math.min(l.qty + qty, 10) } : l))
      }
      return [...prev, { slug, variantId, qty }]
    })
    setIsOpen(true)
  }, [])

  const setQty = useCallback((slug: string, variantId: string, qty: number) => {
    setRaw((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.slug === slug && l.variantId === variantId))
        : prev.map((l) => (l.slug === slug && l.variantId === variantId ? { ...l, qty: Math.min(qty, 10) } : l)),
    )
  }, [])

  const remove = useCallback((slug: string, variantId: string) => setQty(slug, variantId, 0), [setQty])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const clear = useCallback(() => setRaw([]), [])

  const value: CartContextValue = {
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
    isOpen,
    open,
    close,
    add,
    setQty,
    remove,
    clear,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
