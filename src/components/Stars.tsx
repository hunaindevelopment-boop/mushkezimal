import { Star } from 'lucide-react'

export default function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={i <= Math.round(rating) ? 'fill-saffron text-saffron' : 'text-sand/25'}
        />
      ))}
    </span>
  )
}
