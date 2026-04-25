"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/utils/cn";

interface ShowcaseItem {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  dark?: boolean;
  size: "large" | "medium";
}

const showcaseItems: ShowcaseItem[] = [
  {
    title: "iPhone 16 Pro",
    subtitle: "Oh so satisfying.",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&h=700&fit=crop",
    href: "/iphone",
    dark: true,
    size: "large",
  },
  {
    title: "MacBook Air",
    subtitle: "Lean. Mean. M3 machine.",
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1200&h=700&fit=crop",
    href: "/mac",
    size: "large",
  },
  {
    title: "iPad Pro",
    subtitle: "Unbelievably thin. Incredibly powerful.",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
    href: "/ipad",
    dark: true,
    size: "medium",
  },
  {
    title: "Apple Watch Series 10",
    subtitle: "Thinstant classic.",
    image:
      "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=600&fit=crop",
    href: "/watch",
    size: "medium",
  },
  {
    title: "AirPods Pro 2",
    subtitle: "Adaptive Audio. Now playing.",
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop",
    href: "/airpods",
    size: "medium",
  },
  {
    title: "MacBook Pro",
    subtitle: "The most advanced Mac chips.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
    href: "/mac",
    dark: true,
    size: "medium",
  },
];

function ShowcaseCard({ item, index }: { item: ShowcaseItem; index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.15,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={cn(
        "relative overflow-hidden rounded-2xl group",
        item.size === "large" ? "col-span-1 md:col-span-2 h-[500px]" : "h-[500px]"
      )}
    >
      <Link href={item.href} className="block h-full">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center pt-12 text-center",
            item.dark
              ? "bg-gradient-to-b from-black/30 to-transparent"
              : "bg-gradient-to-b from-white/60 to-transparent"
          )}
        >
          <h3
            className={cn(
              "text-3xl md:text-4xl font-semibold tracking-tight",
              item.dark ? "text-white" : "text-[#1d1d1f]"
            )}
          >
            {item.title}
          </h3>
          <p
            className={cn(
              "mt-1 text-lg",
              item.dark ? "text-[#f5f5f7]" : "text-[#6e6e73]"
            )}
          >
            {item.subtitle}
          </p>
          <div className="mt-3 flex items-center gap-4">
            <span
              className={cn(
                "text-sm font-medium",
                item.dark
                  ? "text-[#2997ff] hover:text-[#6cb6ff]"
                  : "text-[#0071e3] hover:underline"
              )}
            >
              Learn more &gt;
            </span>
            <span
              className={cn(
                "text-sm font-medium",
                item.dark
                  ? "text-[#2997ff] hover:text-[#6cb6ff]"
                  : "text-[#0071e3] hover:underline"
              )}
            >
              Buy &gt;
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductShowcase() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-3 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {showcaseItems.map((item, i) => (
          <ShowcaseCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
