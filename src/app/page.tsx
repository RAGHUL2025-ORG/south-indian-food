import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import Specials from "@/components/Specials";
import About from "@/components/About";
import OrderCTA from "@/components/OrderCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MenuSection />
        <Specials />
        <About />
        <OrderCTA />
      </main>
      <Footer />
    </>
  );
}
