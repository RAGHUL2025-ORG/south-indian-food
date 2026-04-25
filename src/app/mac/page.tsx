import ProductHero from "@/components/products/ProductHero";
import ProductGrid from "@/components/products/ProductGrid";
import SpecsSection from "@/components/products/SpecsSection";
import { getProductsByCategory } from "@/data/products";

export const metadata = {
  title: "Mac — Apple",
  description: "Explore the world of Mac. Check out MacBook Pro, MacBook Air, iMac, and more.",
};

const macSpecs = [
  { label: "Chip", value: "M4 Max", icon: "⚡" },
  { label: "Battery", value: "24 hrs", icon: "🔋" },
  { label: "Memory", value: "Up to 128GB", icon: "💾" },
  { label: "Display", value: "XDR", icon: "🖥️" },
  { label: "Performance", value: "3.4x faster", icon: "🚀" },
  { label: "GPU Cores", value: "Up to 40", icon: "🎮" },
  { label: "Thunderbolt", value: "USB4", icon: "🔌" },
  { label: "Storage", value: "Up to 8TB", icon: "💿" },
];

export default function MacPage() {
  const macs = getProductsByCategory("mac");

  return (
    <>
      <ProductHero
        title="MacBook Pro"
        subtitle="Mind-blowing. Head-turning."
        description="The most advanced Mac chips. Up to 24 hours of battery life. A stunning Liquid Retina XDR display."
        image="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1400&h=800&fit=crop"
        price="$1,599"
      />
      <SpecsSection title="Why Mac." specs={macSpecs} />
      <ProductGrid
        products={macs}
        title="Explore the lineup."
        subtitle="Find the Mac that's right for you."
      />
    </>
  );
}
