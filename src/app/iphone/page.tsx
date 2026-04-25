import ProductHero from "@/components/products/ProductHero";
import ProductGrid from "@/components/products/ProductGrid";
import SpecsSection from "@/components/products/SpecsSection";
import { getProductsByCategory } from "@/data/products";

export const metadata = {
  title: "iPhone — Apple",
  description: "Explore the world of iPhone. Check out iPhone 16 Pro, iPhone 16, and more.",
};

const iphoneSpecs = [
  { label: "Chip", value: "A18 Pro", icon: "⚡" },
  { label: "Battery Life", value: "33 hrs", icon: "🔋" },
  { label: "Camera", value: "48MP", icon: "📷" },
  { label: "Display", value: '6.9"', icon: "📱" },
  { label: "5x Telephoto", value: "120mm", icon: "🔭" },
  { label: "ProRes Video", value: "4K 120fps", icon: "🎬" },
  { label: "Titanium", value: "Grade 5", icon: "🛡️" },
  { label: "USB-C", value: "USB 3", icon: "🔌" },
];

export default function IPhonePage() {
  const iphones = getProductsByCategory("iphone");

  return (
    <>
      <ProductHero
        title="iPhone 16 Pro"
        subtitle="The ultimate iPhone."
        description="A18 Pro chip. Camera Control. 4K 120 fps Dolby Vision. A massive leap in battery life. Titanium design."
        image="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1400&h=800&fit=crop"
        dark
        price="$999"
      />
      <SpecsSection title="Why iPhone." specs={iphoneSpecs} />
      <ProductGrid
        products={iphones}
        title="Explore the lineup."
        subtitle="Find the iPhone that's right for you."
      />
    </>
  );
}
