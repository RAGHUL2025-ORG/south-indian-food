import ProductHero from "@/components/products/ProductHero";
import ProductGrid from "@/components/products/ProductGrid";
import SpecsSection from "@/components/products/SpecsSection";
import { getProductsByCategory } from "@/data/products";

export const metadata = {
  title: "AirPods — Apple",
  description: "Explore AirPods Pro 2, AirPods Max, and AirPods.",
};

const airpodsSpecs = [
  { label: "Audio", value: "Spatial", icon: "🎵" },
  { label: "ANC", value: "2x better", icon: "🔇" },
  { label: "Battery", value: "30 hrs", icon: "🔋" },
  { label: "Chip", value: "H2", icon: "⚡" },
  { label: "Adaptive", value: "Audio", icon: "🎧" },
  { label: "Conversation", value: "Awareness", icon: "💬" },
  { label: "Dust/Water", value: "IP54", icon: "💧" },
  { label: "USB-C", value: "Charging", icon: "🔌" },
];

export default function AirPodsPage() {
  const airpods = getProductsByCategory("airpods");

  return (
    <>
      <ProductHero
        title="AirPods Pro 2"
        subtitle="Intelligent noise cancellation."
        description="Adaptive Audio. Personalized Spatial Audio. Up to 2x more Active Noise Cancellation than the previous generation."
        image="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=1400&h=800&fit=crop"
        dark
        price="$249"
      />
      <SpecsSection title="Why AirPods." specs={airpodsSpecs} />
      <ProductGrid
        products={airpods}
        title="Explore the lineup."
        subtitle="Find the AirPods that are right for you."
      />
    </>
  );
}
