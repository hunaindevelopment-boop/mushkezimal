export type Category = 'Attar' | 'Eau de Parfum' | 'Extrait' | 'Gift Set'
export type Family = 'Oud' | 'Floral' | 'Amber' | 'Musk' | 'Citrus' | 'Spice' | 'Woody'

export interface Variant {
  id: string
  label: string
  price: number
  compareAt?: number
}

export interface Product {
  id: number
  slug: string
  name: string
  arabic: string
  tagline: string
  category: Category
  families: Array<Family>
  image: string
  gallery: Array<string>
  description: string
  shortDescription: string
  notes: { top: Array<string>; heart: Array<string>; base: Array<string> }
  intensity: 1 | 2 | 3 | 4 | 5
  longevity: string
  variants: Array<Variant>
  rating: number
  reviews: number
  badge?: 'Bestseller' | 'New' | 'Limited' | 'Alcohol-free'
  accent: string
}

export const CATEGORIES: Array<Category> = ['Attar', 'Eau de Parfum', 'Extrait', 'Gift Set']
export const FAMILIES: Array<Family> = ['Oud', 'Floral', 'Amber', 'Musk', 'Citrus', 'Spice', 'Woody']

const attarSizes = (base: number): Array<Variant> => [
  { id: '3ml', label: '3 ml', price: base },
  { id: '6ml', label: '6 ml', price: Math.round(base * 1.8) },
  { id: '12ml', label: '12 ml · Tola', price: Math.round(base * 3.2), compareAt: Math.round(base * 3.6) },
]
const parfumSizes = (base: number): Array<Variant> => [
  { id: '30ml', label: '30 ml', price: base },
  { id: '50ml', label: '50 ml', price: Math.round(base * 1.5) },
  { id: '100ml', label: '100 ml', price: Math.round(base * 2.3), compareAt: Math.round(base * 2.6) },
]

const products: Array<Product> = [
  {
    id: 1,
    slug: 'royal-oud',
    name: 'Royal Oud',
    arabic: 'عود ملكي',
    tagline: 'Smoke, leather & a throne of agarwood',
    category: 'Extrait',
    families: ['Oud', 'Woody'],
    image: '/img/p-royal-oud.jpg',
    gallery: ['/img/p-royal-oud.jpg', '/img/ctx-oud.jpg', '/img/ctx-atelier.jpg'],
    shortDescription: 'Aged Cambodian oud wrapped in smoked leather and dark rose.',
    description:
      'Our flagship extrait. Twelve-year aged Cambodian oud is layered over smoked leather and a whisper of Bulgarian rose, then anchored with resinous labdanum. Regal from the first spray and still humming on skin the next morning.',
    notes: { top: ['Pink pepper', 'Saffron'], heart: ['Bulgarian rose', 'Leather'], base: ['Cambodian oud', 'Labdanum', 'Patchouli'] },
    intensity: 5,
    longevity: '14+ hours',
    variants: parfumSizes(145),
    rating: 4.9,
    reviews: 412,
    badge: 'Bestseller',
    accent: '#e8a33d',
  },
  {
    id: 2,
    slug: 'taif-rose-attar',
    name: 'Taif Rose',
    arabic: 'ورد طائفي',
    tagline: 'A thousand mountain roses in one drop',
    category: 'Attar',
    families: ['Floral'],
    image: '/img/p-taif-rose.jpg',
    gallery: ['/img/p-taif-rose.jpg', '/img/ctx-florals.jpg', '/img/ctx-ritual.jpg'],
    shortDescription: 'Pure Taif rose oil, hand-distilled at dawn in the Hejaz mountains.',
    description:
      'Harvested at first light when the petals are richest, Taif roses are slow-distilled in copper degs and aged in sandalwood oil. The result is a jammy, honeyed rose that blooms warmly on skin — alcohol-free and endlessly wearable.',
    notes: { top: ['Rose dew', 'Lychee'], heart: ['Taif rose', 'Geranium'], base: ['Sandalwood', 'White musk'] },
    intensity: 3,
    longevity: '10 hours',
    variants: attarSizes(38),
    rating: 4.8,
    reviews: 288,
    badge: 'Alcohol-free',
    accent: '#d9577a',
  },
  {
    id: 3,
    slug: 'saffron-ember',
    name: 'Saffron Ember',
    arabic: 'جمر الزعفران',
    tagline: 'Glowing coals dusted with red gold',
    category: 'Eau de Parfum',
    families: ['Spice', 'Amber'],
    image: '/img/p-saffron-ember.jpg',
    gallery: ['/img/p-saffron-ember.jpg', '/img/ctx-spice.jpg', '/img/ctx-oud.jpg'],
    shortDescription: 'Iranian saffron and smouldering amber over burnt sugar.',
    description:
      'Saffron threads crackle over a heart of incense and caramelised amber. Saffron Ember is the warmth of a desert fire after sunset — magnetic, golden and a little dangerous.',
    notes: { top: ['Saffron', 'Bergamot'], heart: ['Incense', 'Jasmine sambac'], base: ['Amber', 'Burnt sugar', 'Cedar'] },
    intensity: 4,
    longevity: '10 hours',
    variants: parfumSizes(98),
    rating: 4.7,
    reviews: 196,
    badge: 'New',
    accent: '#f07a2e',
  },
  {
    id: 4,
    slug: 'white-musk-attar',
    name: 'Musk Tahara',
    arabic: 'مسك الطهارة',
    tagline: 'Clean skin, fresh linen, quiet light',
    category: 'Attar',
    families: ['Musk'],
    image: '/img/p-white-musk.jpg',
    gallery: ['/img/p-white-musk.jpg', '/img/ctx-ritual.jpg', '/img/ctx-florals.jpg'],
    shortDescription: 'The traditional white musk — soft, powdery and radiantly clean.',
    description:
      'A creamy, skin-close white musk inspired by the classic Musk Tahara of the old souks. Soft, powdery and gentle enough to wear every single day, it leaves a comforting halo that feels like freshly washed silk.',
    notes: { top: ['Aldehydes', 'Pear'], heart: ['Iris', 'Cotton flower'], base: ['White musk', 'Ambrette'] },
    intensity: 2,
    longevity: '8 hours',
    variants: attarSizes(24),
    rating: 4.9,
    reviews: 530,
    badge: 'Bestseller',
    accent: '#e9dcc8',
  },
  {
    id: 5,
    slug: 'desert-amber',
    name: 'Desert Amber',
    arabic: 'عنبر الصحراء',
    tagline: 'Sun-warmed resin on golden dunes',
    category: 'Attar',
    families: ['Amber', 'Woody'],
    image: '/img/p-desert-amber.jpg',
    gallery: ['/img/p-desert-amber.jpg', '/img/ctx-spice.jpg', '/img/ctx-atelier.jpg'],
    shortDescription: 'Molten amber, benzoin and vanilla — a warm embrace in oil.',
    description:
      'Chunks of Moroccan amber resin are macerated for forty days with benzoin and Madagascan vanilla. Desert Amber is a sweet, glowing, resinous attar that grows richer the longer it sits on skin.',
    notes: { top: ['Mandarin', 'Cinnamon'], heart: ['Amber resin', 'Benzoin'], base: ['Vanilla', 'Tonka', 'Cedar'] },
    intensity: 4,
    longevity: '12 hours',
    variants: attarSizes(32),
    rating: 4.8,
    reviews: 244,
    accent: '#d9933a',
  },
  {
    id: 6,
    slug: 'jasmine-noir',
    name: 'Jasmine Noir',
    arabic: 'ياسمين الليل',
    tagline: 'Midnight blooms, heady and unapologetic',
    category: 'Eau de Parfum',
    families: ['Floral', 'Musk'],
    image: '/img/p-jasmine-noir.jpg',
    gallery: ['/img/p-jasmine-noir.jpg', '/img/ctx-florals.jpg', '/img/ctx-ritual.jpg'],
    shortDescription: 'Night-blooming jasmine and tuberose over violet-tinted musk.',
    description:
      'Picked after dark when jasmine is at its most intoxicating, this bouquet of sambac, tuberose and violet leaf dries down to a velvety musk. Made for long nights and slow dances.',
    notes: { top: ['Violet leaf', 'Plum'], heart: ['Jasmine sambac', 'Tuberose'], base: ['Musk', 'Orris', 'Vetiver'] },
    intensity: 3,
    longevity: '9 hours',
    variants: parfumSizes(92),
    rating: 4.6,
    reviews: 158,
    accent: '#9b6bd6',
  },
  {
    id: 7,
    slug: 'mukhallat-majlis',
    name: 'Mukhallat Majlis',
    arabic: 'مخلط المجلس',
    tagline: 'The scent of a gathering of kings',
    category: 'Extrait',
    families: ['Oud', 'Spice', 'Amber'],
    image: '/img/p-mukhallat-majlis.jpg',
    gallery: ['/img/p-mukhallat-majlis.jpg', '/img/ctx-oud.jpg', '/img/ctx-spice.jpg'],
    shortDescription: 'A classic Emirati mukhallat of oud, rose, frankincense and cardamom.',
    description:
      'Inspired by the majlis — the gathering place where coffee is poured and bakhoor drifts through the air. Cardamom and frankincense open onto oud and rose, finishing in a smooth ambergris-like glow.',
    notes: { top: ['Cardamom', 'Frankincense'], heart: ['Oud', 'Damask rose'], base: ['Ambergris accord', 'Sandalwood'] },
    intensity: 5,
    longevity: '16+ hours',
    variants: parfumSizes(165),
    rating: 4.9,
    reviews: 121,
    badge: 'Limited',
    accent: '#3fae8c',
  },
  {
    id: 8,
    slug: 'neroli-souk',
    name: 'Neroli Souk',
    arabic: 'زهر السوق',
    tagline: 'Orange blossom in a sunlit courtyard',
    category: 'Eau de Parfum',
    families: ['Citrus', 'Floral'],
    image: '/img/p-neroli-souk.jpg',
    gallery: ['/img/p-neroli-souk.jpg', '/img/ctx-florals.jpg', '/img/ctx-atelier.jpg'],
    shortDescription: 'Bright neroli, bitter orange and petitgrain with a salted musk trail.',
    description:
      'A sparkling burst of Tunisian neroli and bitter orange, softened by orange blossom absolute and a mineral, sea-salt musk. The freshest bottle in the house — perfect for heat and daylight.',
    notes: { top: ['Bitter orange', 'Neroli'], heart: ['Orange blossom', 'Petitgrain'], base: ['Salted musk', 'Ambrette'] },
    intensity: 2,
    longevity: '6 hours',
    variants: parfumSizes(78),
    rating: 4.5,
    reviews: 97,
    accent: '#f2c14e',
  },
  {
    id: 9,
    slug: 'sandalwood-sultan',
    name: 'Sandal Sultan',
    arabic: 'صندل السلطان',
    tagline: 'Creamy Mysore wood, milky and serene',
    category: 'Attar',
    families: ['Woody'],
    image: '/img/p-sandalwood-sultan.jpg',
    gallery: ['/img/p-sandalwood-sultan.jpg', '/img/ctx-atelier.jpg', '/img/ctx-ritual.jpg'],
    shortDescription: 'Pure sandalwood attar — creamy, milky and deeply calming.',
    description:
      'Distilled from sustainably sourced sandalwood heartwood, Sandal Sultan is a smooth, milky, meditative attar. Wear it alone or layer it beneath any rose or oud to give it a velvet base.',
    notes: { top: ['Cardamom'], heart: ['Sandalwood', 'Milk accord'], base: ['Cedar', 'Musk'] },
    intensity: 3,
    longevity: '10 hours',
    variants: attarSizes(42),
    rating: 4.7,
    reviews: 173,
    badge: 'Alcohol-free',
    accent: '#c99a6b',
  },
  {
    id: 10,
    slug: 'black-vanilla',
    name: 'Black Vanilla',
    arabic: 'فانيليا سوداء',
    tagline: 'Dark, boozy vanilla with a smoky edge',
    category: 'Eau de Parfum',
    families: ['Amber', 'Woody'],
    image: '/img/p-black-vanilla.jpg',
    gallery: ['/img/p-black-vanilla.jpg', '/img/ctx-spice.jpg', '/img/ctx-oud.jpg'],
    shortDescription: 'Bourbon vanilla, tonka and rum over smoked guaiac wood.',
    description:
      'Not your sugary vanilla. Black Vanilla pairs bourbon vanilla absolute with dark rum and tonka, then roasts it all over smoky guaiac wood. Gourmand, grown-up and quietly addictive.',
    notes: { top: ['Dark rum', 'Pink pepper'], heart: ['Bourbon vanilla', 'Tonka'], base: ['Guaiac wood', 'Benzoin'] },
    intensity: 4,
    longevity: '11 hours',
    variants: parfumSizes(96),
    rating: 4.8,
    reviews: 305,
    accent: '#b56b5a',
  },
  {
    id: 11,
    slug: 'kashmir-spice',
    name: 'Kashmir Spice',
    arabic: 'توابل كشمير',
    tagline: 'A spice caravan crossing the valley',
    category: 'Attar',
    families: ['Spice', 'Oud'],
    image: '/img/p-kashmir-spice.jpg',
    gallery: ['/img/p-kashmir-spice.jpg', '/img/ctx-spice.jpg', '/img/ctx-oud.jpg'],
    shortDescription: 'Clove, cinnamon and pink pepper over Hindi oud.',
    description:
      'A fiery, festive attar of clove bud, cinnamon bark and pink pepper, resting on a bed of barnyard-rich Hindi oud. Bold on application, it settles into a warm, spicy woodiness.',
    notes: { top: ['Pink pepper', 'Clove'], heart: ['Cinnamon', 'Nutmeg'], base: ['Hindi oud', 'Vetiver'] },
    intensity: 4,
    longevity: '12 hours',
    variants: attarSizes(36),
    rating: 4.6,
    reviews: 88,
    badge: 'New',
    accent: '#d6404f',
  },
  {
    id: 12,
    slug: 'attar-discovery-set',
    name: 'Six Jewels Discovery Set',
    arabic: 'ست جواهر',
    tagline: 'Six attars, one velvet box, endless rituals',
    category: 'Gift Set',
    families: ['Oud', 'Floral', 'Musk', 'Amber', 'Woody', 'Spice'],
    image: '/img/p-discovery-set.jpg',
    gallery: ['/img/p-discovery-set.jpg', '/img/ctx-ritual.jpg', '/img/ctx-atelier.jpg'],
    shortDescription: 'Six 1.5 ml attar vials — the perfect way to find your signature.',
    description:
      'Our six best-loved attars — Taif Rose, Musk Tahara, Desert Amber, Sandal Sultan, Kashmir Spice and a mini Royal Oud oil — nestled in a plum velvet box. Includes a credit toward your first full size.',
    notes: { top: ['Rose', 'Saffron'], heart: ['Amber', 'Musk'], base: ['Oud', 'Sandalwood'] },
    intensity: 3,
    longevity: 'Varies',
    variants: [
      { id: 'classic', label: 'Classic · 6 × 1.5 ml', price: 58 },
      { id: 'grand', label: 'Grand · 6 × 3 ml', price: 98, compareAt: 116 },
    ],
    rating: 4.9,
    reviews: 640,
    badge: 'Bestseller',
    accent: '#a867c9',
  },
]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function formatPrice(n: number) {
  return `$${n.toFixed(0)}`
}

export function minPrice(p: Product) {
  return Math.min(...p.variants.map((v) => v.price))
}

export default products
