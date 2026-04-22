"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import Specials from "@/components/Specials";
import About from "@/components/About";
import OrderCTA from "@/components/OrderCTA";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BookTableModal from "@/components/BookTableModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero onBookTable={() => setIsBookingOpen(true)} />
        <MenuSection />
        <Specials />
        <About />
        <OrderCTA onBookTable={() => setIsBookingOpen(true)} />
      </main>
      <Footer />
      <CartDrawer />
      <BookTableModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}
