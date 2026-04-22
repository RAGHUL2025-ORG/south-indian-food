"use client";

import { useState } from "react";
import Image from "next/image";
import { menuItems, categories, type MenuItem } from "@/data/menu";
import { useScrollReveal } from "./useScrollReveal";

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brown/10 transition-all duration-500 hover:-translate-y-2"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        {!imageError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cream-dark to-cream flex items-center justify-center">
            <span className="text-5xl">
              {item.category === "breakfast"
                ? "🥘"
                : item.category === "meals"
                ? "🍛"
                : "☕"}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.vegetarian && (
            <span className="px-2.5 py-1 rounded-full bg-secondary/90 text-white text-xs font-medium backdrop-blur-sm">
              Veg
            </span>
          )}
          {item.spicy && (
            <span className="px-2.5 py-1 rounded-full bg-red-500/90 text-white text-xs font-medium backdrop-blur-sm">
              Spicy
            </span>
          )}
        </div>

        {item.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full bg-accent/90 text-brown text-xs font-bold backdrop-blur-sm">
              Popular
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {item.name}
          </h3>
          <span className="shrink-0 text-lg font-bold text-primary">
            ₹{item.price}
          </span>
        </div>
        <p className="mt-2 text-sm text-brown-light/80 leading-relaxed line-clamp-2">
          {item.description}
        </p>
        <button className="mt-4 w-full py-2.5 rounded-xl bg-cream-dark text-foreground text-sm font-semibold transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary/20">
          Add to Order
        </button>
      </div>
    </div>
  );
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>("breakfast");
  const { ref, isVisible } = useScrollReveal();

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section id="menu" className="py-20 sm:py-28 bg-cream pattern-overlay">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
            Our Menu
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            A Feast for Every{" "}
            <span className="text-primary">Occasion</span>
          </h2>
          <p className="mt-4 text-brown-light/80 text-lg leading-relaxed">
            Explore our carefully curated selection of authentic South Indian
            dishes, prepared fresh daily with traditional recipes.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 sm:px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "text-brown-light hover:text-foreground hover:bg-cream-dark"
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
