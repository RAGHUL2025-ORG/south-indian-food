"use client";

import Image from "next/image";
import { useState } from "react";
import { menuItems } from "@/data/menu";
import { useScrollReveal } from "./useScrollReveal";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

const featuredItems = menuItems.filter((item) => item.featured);

export default function Specials() {
  const { ref, isVisible } = useScrollReveal();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="specials" className="py-20 sm:py-28 bg-warm-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-accent text-sm font-semibold tracking-wide uppercase">
            Chef&apos;s Selection
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Today&apos;s{" "}
            <span className="text-primary">Specials</span>
          </h2>
          <p className="mt-4 text-brown-light/80 text-lg leading-relaxed">
            Handpicked favorites that our guests keep coming back for.
            Each dish is a masterpiece of South Indian culinary tradition.
          </p>
        </div>

        {/* Featured cards - alternating layout */}
        <div className="mt-12 sm:mt-16 space-y-8 sm:space-y-12">
          {featuredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brown/10 transition-all duration-700`}
            >
              {/* Image side */}
              <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto lg:min-h-[360px] overflow-hidden">
                {!imageErrors[item.id] ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={() => handleImageError(item.id)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cream-dark to-cream flex items-center justify-center">
                    <span className="text-7xl">
                      {item.category === "breakfast"
                        ? "🥘"
                        : item.category === "meals"
                        ? "🍛"
                        : "☕"}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full bg-accent text-brown text-xs font-bold shadow-lg">
                    Best Seller
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  {item.vegetarian && (
                    <span className="px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                      Vegetarian
                    </span>
                  )}
                  {item.spicy && (
                    <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-500 text-xs font-semibold">
                      Spicy
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded-full bg-cream-dark text-brown-light text-xs font-semibold capitalize">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {item.name}
                </h3>
                <p className="mt-3 text-brown-light/80 leading-relaxed text-base sm:text-lg">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-6 sm:mt-8">
                  <span className="text-3xl font-bold text-primary">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() => {
                      addItem(item);
                      showToast(`${item.name} added to your order!`);
                    }}
                    className="px-6 sm:px-8 py-3 rounded-full bg-primary text-white font-semibold transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
