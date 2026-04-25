import HeroCarousel from "@/components/sections/HeroCarousel";
import ProductShowcase from "@/components/sections/ProductShowcase";
import LatestProducts from "@/components/sections/LatestProducts";
import AppleExperience from "@/components/sections/AppleExperience";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <ProductShowcase />
      <LatestProducts />
      <AppleExperience />
      <CTABanner />
    </>
  );
}
