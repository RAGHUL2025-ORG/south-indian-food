"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Cpu,
  Shield,
  Leaf,
  Accessibility,
  Globe,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Apple Silicon",
    description:
      "Industry-leading chips designed by Apple deliver incredible performance and power efficiency.",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description:
      "Privacy is a fundamental human right. Every Apple product is designed to protect your data.",
  },
  {
    icon: Leaf,
    title: "Environment",
    description:
      "Apple is carbon neutral and by 2030, every product will be too. Our planet can't wait.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    description:
      "Technology is most powerful when it empowers everyone. Built-in features for all abilities.",
  },
  {
    icon: Globe,
    title: "Ecosystem",
    description:
      "All your Apple devices work together seamlessly. Continuity, Handoff, and Universal Control.",
  },
  {
    icon: Sparkles,
    title: "Apple Intelligence",
    description:
      "Personal intelligence that helps you write, express yourself, and get things done effortlessly.",
  },
];

export default function AppleExperience() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-[980px] px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
            The Apple experience.
          </h2>
          <p className="mt-3 text-lg md:text-xl text-[#6e6e73] max-w-2xl mx-auto">
            Designed to work together. Built to protect you. Created to make a
            difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl bg-[#f5f5f7] p-8 hover:bg-[#e8e8ed] transition-colors"
            >
              <div className="mb-4 inline-flex rounded-2xl bg-white p-3 shadow-sm group-hover:shadow-md transition-shadow">
                <feature.icon className="h-6 w-6 text-[#1d1d1f]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-[#6e6e73] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
