"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";

interface ProductGridProps {
  products: Product[];
  title: string;
  subtitle?: string;
}

export default function ProductGrid({
  products,
  title,
  subtitle,
}: ProductGridProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.05 });
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleBuy = (product: Product) => {
    addItem(product, product.colors?.[0]);
    openCart();
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-[1200px] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-lg text-[#6e6e73]">{subtitle}</p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="product-card rounded-2xl bg-[#f5f5f7] overflow-hidden"
            >
              <div className="relative h-[300px] bg-[#fafafa] overflow-hidden flex items-center justify-center">
                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-[#bf4800] px-3 py-1 text-xs font-medium text-white">
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
              <div className="p-6">
                <p className="text-xs text-[#bf4800] font-medium uppercase tracking-wide">
                  {product.badge || "Explore"}
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-[#1d1d1f]">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-[#6e6e73]">
                  {product.tagline}
                </p>
                <p className="mt-3 text-sm text-[#6e6e73] leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                {product.colors && (
                  <div className="mt-4 flex gap-2">
                    {product.colors.map((c) => (
                      <span
                        key={c.name}
                        className="h-4 w-4 rounded-full border border-[#d2d2d7] cursor-pointer hover:ring-2 hover:ring-[#0071e3] hover:ring-offset-1 transition-all"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-lg font-semibold text-[#1d1d1f]">
                    From {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={() => handleBuy(product)}
                    className="rounded-full bg-[#0071e3] px-5 py-2 text-sm font-medium text-white hover:bg-[#0077ed] transition-colors"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
