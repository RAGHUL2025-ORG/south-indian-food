"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function CTABanner() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });

  return (
    <section ref={ref} className="bg-[#1d1d1f] py-20 md:py-28">
      <div className="mx-auto max-w-[980px] px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-base md:text-lg text-[#86868b] mb-2">
            Apple Trade In
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#f5f5f7] tracking-tight">
            Get $200–$650 in credit toward
            <br className="hidden md:block" /> iPhone 16 Pro.
          </h2>
          <p className="mt-4 text-lg text-[#86868b] max-w-xl mx-auto">
            With Apple Trade In, you can get a great value for your current
            device and apply it toward a new one.
          </p>
          <div className="mt-8 flex items-center justify-center gap-5">
            <Link
              href="/store"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0071e3] px-7 py-3 text-sm font-medium text-white hover:bg-[#0077ed] transition-colors"
            >
              Shop iPhone
            </Link>
            <Link
              href="/iphone"
              className="inline-flex items-center text-sm font-medium text-[#2997ff] hover:text-[#6cb6ff] transition-colors"
            >
              Learn more &gt;
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
