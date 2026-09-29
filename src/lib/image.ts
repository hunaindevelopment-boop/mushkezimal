/** Serve images through Netlify Image CDN so pages never ship full-size originals. */
export function cdn(src: string, w: number, h?: number) {
  const params = new URLSearchParams({ url: src, w: String(w), fm: 'webp', q: '78' })
  if (h) {
    params.set('h', String(h))
    params.set('fit', 'cover')
  }
  return `/.netlify/images?${params.toString()}`
}
