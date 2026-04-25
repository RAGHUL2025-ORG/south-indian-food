import ProductHero from "@/components/products/ProductHero";
import ProductGrid from "@/components/products/ProductGrid";
import SpecsSection from "@/components/products/SpecsSection";
import { getProductsByCategory } from "@/data/products";

export const metadata = {
  title: "Apple Watch — Apple",
  description: "Explore Apple Watch Ultra 2, Apple Watch Series 10, and Apple Watch SE.",
};

const watchSpecs = [
  { label: "Design", value: "Thinnest ever", icon: "⌚" },
  { label: "Display", value: "Always-On", icon: "✨" },
  { label: "Health", value: "Advanced", icon: "❤️" },
  { label: "Battery", value: "36 hrs", icon: "🔋" },
  { label: "Water", value: "100m", icon: "🌊" },
  { label: "Chip", value: "S10", icon: "⚡" },
  { label: "Oxygen", value: "Blood O₂", icon: "🫁" },
  { label: "ECG", value: "Built-in", icon: "💓" },
];

export default function WatchPage() {
  const watches = getProductsByCategory("watch");

  return (
    <>
      <ProductHero
        title="Apple Watch"
        subtitle="Thinstant classic."
        description="The thinnest Apple Watch ever. Bigger display. Advanced health features. Faster charging."
        image="https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=1400&h=800&fit=crop"
        price="$399"
      />
      <SpecsSection title="Why Apple Watch." specs={watchSpecs} />
      <ProductGrid
        products={watches}
        title="Explore the lineup."
        subtitle="Find the Apple Watch that's right for you."
      />
    </>
  );
}
