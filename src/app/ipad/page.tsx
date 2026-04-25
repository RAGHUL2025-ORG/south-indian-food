import ProductHero from "@/components/products/ProductHero";
import ProductGrid from "@/components/products/ProductGrid";
import SpecsSection from "@/components/products/SpecsSection";
import { getProductsByCategory } from "@/data/products";

export const metadata = {
  title: "iPad — Apple",
  description: "Explore the world of iPad. Check out iPad Pro, iPad Air, and more.",
};

const ipadSpecs = [
  { label: "Chip", value: "M4", icon: "⚡" },
  { label: "Display", value: "Ultra Retina XDR", icon: "✨" },
  { label: "Thin", value: "5.1mm", icon: "📐" },
  { label: "Apple Pencil", value: "Pro", icon: "✏️" },
  { label: "Keyboard", value: "Magic", icon: "⌨️" },
  { label: "Camera", value: "12MP", icon: "📷" },
  { label: "Wi-Fi", value: "6E", icon: "📶" },
  { label: "Battery", value: "10 hrs", icon: "🔋" },
];

export default function IPadPage() {
  const ipads = getProductsByCategory("ipad");

  return (
    <>
      <ProductHero
        title="iPad Pro"
        subtitle="Thin. Light. Outright powerful."
        description="The M4 chip makes iPad Pro the fastest device of its kind. Plus an Ultra Retina XDR display."
        image="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1400&h=800&fit=crop"
        dark
        price="$999"
      />
      <SpecsSection title="Why iPad." specs={ipadSpecs} />
      <ProductGrid
        products={ipads}
        title="Explore the lineup."
        subtitle="Find the iPad that's right for you."
      />
    </>
  );
}
