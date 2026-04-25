export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: ProductCategory;
  colors?: ProductColor[];
  specs?: Record<string, string>;
  badge?: string;
  href: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export type ProductCategory =
  | "iphone"
  | "mac"
  | "ipad"
  | "watch"
  | "airpods"
  | "accessories";

export interface ProductHero {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaPrimary: string;
  ctaSecondary: string;
  href: string;
  dark?: boolean;
}

export const heroProducts: ProductHero[] = [
  {
    title: "iPhone 16 Pro",
    subtitle: "The ultimate iPhone.",
    description:
      "A18 Pro chip. Camera Control. 4K 120 fps Dolby Vision. A massive leap in battery life.",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&h=800&fit=crop",
    ctaPrimary: "Learn more",
    ctaSecondary: "Buy",
    href: "/iphone",
    dark: true,
  },
  {
    title: "MacBook Pro",
    subtitle: "Mind-blowing. Head-turning.",
    description:
      "The most advanced Mac chips. Up to 24 hours of battery life. A stunning Liquid Retina XDR display.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=800&fit=crop",
    ctaPrimary: "Learn more",
    ctaSecondary: "Buy",
    href: "/mac",
  },
  {
    title: "iPad Pro",
    subtitle: "Thin. Light. Outright powerful.",
    description:
      "The M4 chip makes iPad Pro the fastest device of its kind. Plus an Ultra Retina XDR display.",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&h=800&fit=crop",
    ctaPrimary: "Learn more",
    ctaSecondary: "Buy",
    href: "/ipad",
  },
];

export const featuredProducts: Product[] = [
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    tagline: "The ultimate iPhone.",
    description:
      "6.9-inch Super Retina XDR display. A18 Pro chip. 48MP camera system with 5x Telephoto.",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop",
    category: "iphone",
    colors: [
      { name: "Natural Titanium", hex: "#B0A99F" },
      { name: "Blue Titanium", hex: "#3B4F6B" },
      { name: "White Titanium", hex: "#F2F1ED" },
      { name: "Black Titanium", hex: "#3C3B37" },
    ],
    badge: "New",
    href: "/iphone",
  },
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    tagline: "So much power. So pro.",
    description:
      "6.3-inch Super Retina XDR display. A18 Pro chip. 48MP Fusion camera.",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
    category: "iphone",
    colors: [
      { name: "Natural Titanium", hex: "#B0A99F" },
      { name: "Blue Titanium", hex: "#3B4F6B" },
      { name: "White Titanium", hex: "#F2F1ED" },
      { name: "Black Titanium", hex: "#3C3B37" },
    ],
    href: "/iphone",
  },
  {
    id: "iphone-16",
    name: "iPhone 16",
    tagline: "A total powerhouse.",
    description:
      "6.1-inch Super Retina XDR display. A18 chip. Advanced dual-camera system.",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop",
    category: "iphone",
    colors: [
      { name: "Black", hex: "#1D1D1F" },
      { name: "White", hex: "#F5F5F7" },
      { name: "Pink", hex: "#F9C6D9" },
      { name: "Teal", hex: "#B0D4D1" },
      { name: "Ultramarine", hex: "#7B83EB" },
    ],
    href: "/iphone",
  },
  {
    id: "macbook-pro-16",
    name: 'MacBook Pro 16"',
    tagline: "Mind-blowing. Head-turning.",
    description:
      "M4 Pro or M4 Max chip. Up to 48GB unified memory. Up to 24-hour battery life.",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
    category: "mac",
    colors: [
      { name: "Space Black", hex: "#1D1D1F" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    badge: "New",
    href: "/mac",
  },
  {
    id: "macbook-pro-14",
    name: 'MacBook Pro 14"',
    tagline: "A staggering leap.",
    description:
      "M4, M4 Pro or M4 Max chip. Up to 48GB unified memory. Liquid Retina XDR display.",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop",
    category: "mac",
    colors: [
      { name: "Space Black", hex: "#1D1D1F" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    href: "/mac",
  },
  {
    id: "macbook-air-15",
    name: 'MacBook Air 15"',
    tagline: "Impressively big. Impossibly thin.",
    description:
      "M3 chip. 15.3-inch Liquid Retina display. Up to 18 hours of battery life.",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&h=600&fit=crop",
    category: "mac",
    href: "/mac",
  },
  {
    id: "ipad-pro-13",
    name: 'iPad Pro 13"',
    tagline: "Thin. Light. Outright powerful.",
    description:
      "M4 chip. Ultra Retina XDR display. Apple Pencil Pro compatible.",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
    category: "ipad",
    colors: [
      { name: "Space Black", hex: "#1D1D1F" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    badge: "New",
    href: "/ipad",
  },
  {
    id: "ipad-air",
    name: "iPad Air",
    tagline: "Fresh Air.",
    description:
      "M2 chip. 10.9-inch or 13-inch Liquid Retina display. Apple Pencil Pro.",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=600&h=600&fit=crop",
    category: "ipad",
    colors: [
      { name: "Space Gray", hex: "#6E6E73" },
      { name: "Starlight", hex: "#F0E4D3" },
      { name: "Purple", hex: "#C7BFFF" },
      { name: "Blue", hex: "#6B8DC9" },
    ],
    href: "/ipad",
  },
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2",
    tagline: "Next level adventure.",
    description:
      "49mm titanium case. The most rugged and capable Apple Watch.",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop",
    category: "watch",
    badge: "New",
    href: "/watch",
  },
  {
    id: "apple-watch-series-10",
    name: "Apple Watch Series 10",
    tagline: "Thinstant classic.",
    description:
      "The thinnest Apple Watch ever. Bigger display. Advanced health features.",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=600&fit=crop",
    category: "watch",
    colors: [
      { name: "Jet Black", hex: "#1D1D1F" },
      { name: "Rose Gold", hex: "#E3C5B5" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    href: "/watch",
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    tagline: "Intelligent noise cancellation.",
    description:
      "Adaptive Audio. Personalized Spatial Audio. Up to 2x more Active Noise Cancellation.",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop",
    category: "airpods",
    badge: "Popular",
    href: "/airpods",
  },
  {
    id: "airpods-max",
    name: "AirPods Max",
    tagline: "A radically original headphone.",
    description:
      "High-fidelity audio. Active Noise Cancellation. Spatial Audio with dynamic head tracking.",
    price: 549,
    image:
      "https://images.unsplash.com/photo-1625245488600-f03fef636a3c?w=600&h=600&fit=crop",
    category: "airpods",
    colors: [
      { name: "Midnight", hex: "#1D1D1F" },
      { name: "Starlight", hex: "#F0E4D3" },
      { name: "Blue", hex: "#7EB4E2" },
      { name: "Orange", hex: "#E8825E" },
      { name: "Purple", hex: "#B6A5D4" },
    ],
    href: "/airpods",
  },
];

export const navLinks = [
  { label: "Store", href: "/store" },
  { label: "Mac", href: "/mac" },
  { label: "iPad", href: "/ipad" },
  { label: "iPhone", href: "/iphone" },
  { label: "Watch", href: "/watch" },
  { label: "AirPods", href: "/airpods" },
];

export function getProductsByCategory(
  category: ProductCategory
): Product[] {
  return featuredProducts.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return featuredProducts.find((p) => p.id === id);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
