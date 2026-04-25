"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroProducts } from "@/data/products";
import { cn } from "@/utils/cn";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroProducts.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + heroProducts.length) % heroProducts.length
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const hero = heroProducts[current];

  return (
    <section className="relative h-[580px] md:h-[700px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={hero.image}
            alt={hero.title}
            fill
            className="object-cover"
            priority
          />
          <div
            className={cn(
              "absolute inset-0",
              hero.dark
                ? "bg-gradient-to-t from-black/80 via-black/40 to-black/20"
                : "bg-gradient-to-t from-white/90 via-white/50 to-transparent"
            )}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1
              className={cn(
                "text-5xl md:text-7xl font-semibold tracking-tight",
                hero.dark ? "text-white" : "text-[#1d1d1f]"
              )}
            >
              {hero.title}
            </h1>
            <p
              className={cn(
                "mt-2 text-xl md:text-2xl font-normal",
                hero.dark ? "text-[#f5f5f7]" : "text-[#1d1d1f]"
              )}
            >
              {hero.subtitle}
            </p>
            <p
              className={cn(
                "mt-3 text-base md:text-lg max-w-xl mx-auto",
                hero.dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"
              )}
            >
              {hero.description}
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Link
                href={hero.href}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0071e3] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0077ed] transition-colors"
              >
                {hero.ctaPrimary}
              </Link>
              <Link
                href="/store"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-6 py-2.5 text-sm font-medium transition-colors",
                  hero.dark
                    ? "text-[#2997ff] hover:text-[#6cb6ff]"
                    : "text-[#0071e3] hover:text-[#0077ed]"
                )}
              >
                {hero.ctaSecondary} &gt;
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 p-2 backdrop-blur-sm hover:bg-white/20 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 p-2 backdrop-blur-sm hover:bg-white/20 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroProducts.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === current
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
