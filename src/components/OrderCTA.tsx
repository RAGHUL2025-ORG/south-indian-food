"use client";

import { useScrollReveal } from "./useScrollReveal";
import { useCart } from "@/context/CartContext";

interface OrderCTAProps {
  onBookTable: () => void;
}

export default function OrderCTA({ onBookTable }: OrderCTAProps) {
  const { ref, isVisible } = useScrollReveal();
  const { setIsCartOpen } = useCart();

  return (
    <section id="order" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 pattern-overlay opacity-20" />

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-accent/10 blur-3xl" />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Decorative icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-8">
          <span className="text-4xl">🍽️</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          Ready to Taste{" "}
          <span className="gold-shimmer">Tradition?</span>
        </h2>
        <p className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
          Whether you dine in with us or order from home, every bite promises
          the authentic warmth of South Indian hospitality.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 sm:mt-12">
          <button
            onClick={() => setIsCartOpen(true)}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold text-lg transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8l-1.68 8H19m-12 0a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2z" />
            </svg>
            Order Online
          </button>
          <button
            onClick={onBookTable}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/20 text-white font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:-translate-y-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book a Table
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-14 sm:mt-16 pt-8 border-t border-white/10">
          {[
            { icon: "⏱️", text: "30 Min Delivery" },
            { icon: "🌱", text: "100% Fresh" },
            { icon: "⭐", text: "4.9 Rating" },
            { icon: "🚚", text: "Free Delivery" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 text-white/60"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
