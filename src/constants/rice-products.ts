// Shared light warm-beige blur placeholder — used by Next.js Image for skeleton loading
// Encodes a tiny 8×10 SVG: #f5f0e8 (warm off-white)
export const RICE_BLUR_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDEwIj48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2Y1ZjBlOCIvPjwvc3ZnPg==';

export interface RiceProduct {
  id: string;
  /** Display name shown on the card and dialog */
  name: string;
  /** Optional secondary name / variety name */
  subtitle?: string;
  /** WebP thumbnail — used on the product grid card (fast load) */
  thumbnail: string;
  /** Full-resolution JPG — shown inside the detail dialog */
  image: string;
  isFlagship?: boolean;
  isPopular?: boolean;
}

export const RICE_PRODUCTS: RiceProduct[] = [
  {
    id: 'jeerakhasala',
    name: 'Gobindobhog Rice',
    // subtitle: 'Jeerakhasala',
    thumbnail: '/images/thumbnails/jeera.webp',
    image: '/images/jeera.jpg',
    isFlagship: true,
    isPopular: true,
  },
  {
    id: 'miniket',
    name: 'Miniket Rice',
    thumbnail: '/images/thumbnails/miniket.webp',
    image: '/images/miniket.jpg',
  },
  {
    id: 'swarna',
    name: 'Swarna Rice',
    // subtitle: 'Bodhana',
    thumbnail: '/images/thumbnails/swarna.webp',
    image: '/images/swarna.jpg',
    isPopular: true,
  },
  {
    id: 'kuruva',
    name: 'Kuruva Rice',
    thumbnail: '/images/thumbnails/kuruva.webp',
    image: '/images/kuruva.jpg',
  },
  {
    id: 'ir36',
    name: 'IR-36 Rice',
    thumbnail: '/images/thumbnails/ir36.webp',
    image: '/images/ir36.jpg',
  },
  {
    id: 'banshkathi',
    name: 'Banshkathi Rice',
    thumbnail: '/images/thumbnails/banshkathi.webp',
    image: '/images/banshkathi.jpg',
    isPopular: true,
  },
  {
    id: 'jeerakathi',
    name: 'Jeerakathi Rice',
    thumbnail: '/images/thumbnails/jeerakathi.webp',
    image: '/images/jeerakathi.jpg',
  },
];
