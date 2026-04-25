"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Spec {
  label: string;
  value: string;
  icon?: string;
}

interface SpecsSectionProps {
  title: string;
  specs: Spec[];
}

export default function SpecsSection({ title, specs }: SpecsSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#f5f5f7]">
      <div className="mx-auto max-w-[980px] px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] tracking-tight text-center mb-12"
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center p-6 rounded-2xl bg-white"
            >
              {spec.icon && (
                <span className="text-3xl mb-3 block">{spec.icon}</span>
              )}
              <p className="text-2xl md:text-3xl font-semibold text-[#1d1d1f]">
                {spec.value}
              </p>
              <p className="mt-1 text-sm text-[#6e6e73]">{spec.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
