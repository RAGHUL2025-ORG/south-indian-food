"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface ProductHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  dark?: boolean;
  price?: string;
}

export default function ProductHero({
  title,
  subtitle,
  description,
  image,
  dark = false,
  price,
}: ProductHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[600px] md:min-h-[700px] flex flex-col items-center justify-center overflow-hidden",
        dark ? "bg-black" : "bg-[#f5f5f7]"
      )}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-3xl"
      >
        <h1
          className={cn(
            "text-5xl md:text-7xl font-semibold tracking-tight",
            dark ? "text-white" : "text-[#1d1d1f]"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "mt-3 text-xl md:text-2xl font-normal",
            dark ? "text-[#f5f5f7]" : "text-[#1d1d1f]"
          )}
        >
          {subtitle}
        </p>
        <p
          className={cn(
            "mt-3 text-base md:text-lg max-w-xl mx-auto",
            dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"
          )}
        >
          {description}
        </p>
        {price && (
          <p
            className={cn(
              "mt-2 text-sm",
              dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"
            )}
          >
            Starting from {price}
          </p>
        )}
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            href="/store"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0071e3] px-7 py-3 text-sm font-medium text-white hover:bg-[#0077ed] transition-colors"
          >
            Buy
          </Link>
          <span
            className={cn(
              "text-sm font-medium",
              dark ? "text-[#2997ff]" : "text-[#0071e3]"
            )}
          >
            Learn more &gt;
          </span>
        </div>
      </motion.div>
    </section>
  );
}
