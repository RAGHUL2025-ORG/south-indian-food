"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { featuredProducts, formatPrice } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function LatestProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({
    threshold: 0.05,
  });
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    addItem(product, product.colors?.[0]);
    openCart();
  };

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#f5f5f7] py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
              The latest.{" "}
              <span className="text-[#6e6e73]">
                Take a look at what&apos;s new, right now.
              </span>
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="rounded-full bg-[#e8e8ed] p-2 hover:bg-[#d2d2d7] transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4 text-[#1d1d1f]" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-full bg-[#e8e8ed] p-2 hover:bg-[#d2d2d7] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4 text-[#1d1d1f]" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex-none w-[300px] snap-start"
            >
              <div className="product-card rounded-2xl bg-white overflow-hidden h-full flex flex-col">
                <div className="relative h-[280px] bg-[#fafafa] flex items-center justify-center overflow-hidden">
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 rounded-full bg-[#bf4800] px-2.5 py-0.5 text-xs font-medium text-white">
                      {product.badge}
                    </span>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <p className="text-xs text-[#bf4800] font-medium uppercase tracking-wide">
                    {product.badge || product.category}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-[#1d1d1f] leading-tight">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#6e6e73] line-clamp-2">
                    {product.description}
                  </p>
                  {product.colors && (
                    <div className="mt-3 flex gap-1.5">
                      {product.colors.map((c) => (
                        <span
                          key={c.name}
                          className="h-3 w-3 rounded-full border border-[#d2d2d7]"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  )}
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-base font-semibold text-[#1d1d1f]">
                      From {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="rounded-full bg-[#0071e3] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#0077ed] transition-colors"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
