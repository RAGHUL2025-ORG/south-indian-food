"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Grid3X3, LayoutList } from "lucide-react";
import {
  featuredProducts,
  formatPrice,
  type Product,
  type ProductCategory,
} from "@/data/products";
import { useCartStore } from "@/store/cart";
import { cn } from "@/utils/cn";

const categories: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All Products", value: "all" },
  { label: "iPhone", value: "iphone" },
  { label: "Mac", value: "mac" },
  { label: "iPad", value: "ipad" },
  { label: "Watch", value: "watch" },
  { label: "AirPods", value: "airpods" },
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
];

export default function StoreClient() {
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const filtered = useMemo(() => {
    let products = [...featuredProducts];

    if (category !== "all") {
      products = products.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return products;
  }, [category, sort, search]);

  const handleBuy = (product: Product) => {
    addItem(product, product.colors?.[0]);
    openCart();
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Store Header */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-semibold text-[#1d1d1f] tracking-tight">
              Store.{" "}
              <span className="text-[#6e6e73]">
                The best way to buy the products you love.
              </span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-11 z-30 bg-white/80 backdrop-blur-xl border-b border-[#d2d2d7]">
        <div className="mx-auto max-w-[1200px] px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 flex-1">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                    category === cat.value
                      ? "bg-[#1d1d1f] text-white"
                      : "bg-[#e8e8ed] text-[#1d1d1f] hover:bg-[#d2d2d7]"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#86868b]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="rounded-lg bg-[#f5f5f7] pl-9 pr-4 py-2 text-sm text-[#1d1d1f] placeholder-[#86868b] outline-none focus:ring-2 focus:ring-[#0071e3] w-48"
                />
              </div>

              <div className="flex items-center gap-1 rounded-lg bg-[#f5f5f7] p-1">
                <SlidersHorizontal className="h-4 w-4 text-[#86868b] mx-1" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent text-sm text-[#1d1d1f] outline-none pr-1"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="hidden md:flex items-center gap-1 rounded-lg bg-[#f5f5f7] p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "rounded p-1.5 transition-colors",
                    viewMode === "grid"
                      ? "bg-white shadow-sm"
                      : "hover:bg-[#e8e8ed]"
                  )}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="h-4 w-4 text-[#1d1d1f]" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "rounded p-1.5 transition-colors",
                    viewMode === "list"
                      ? "bg-white shadow-sm"
                      : "hover:bg-[#e8e8ed]"
                  )}
                  aria-label="List view"
                >
                  <LayoutList className="h-4 w-4 text-[#1d1d1f]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="mx-auto max-w-[1200px] px-4 py-8">
        <p className="text-sm text-[#6e6e73] mb-6">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${category}-${sort}-${viewMode}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={cn(
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                : "space-y-4"
            )}
          >
            {filtered.map((product, i) =>
              viewMode === "grid" ? (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="product-card rounded-2xl bg-white overflow-hidden"
                >
                  <div className="relative h-[260px] bg-[#fafafa] overflow-hidden">
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
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-[#1d1d1f]">
                      {product.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-[#6e6e73]">
                      {product.tagline}
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
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-base font-semibold text-[#1d1d1f]">
                        From {formatPrice(product.price)}
                      </span>
                      <button
                        onClick={() => handleBuy(product)}
                        className="rounded-full bg-[#0071e3] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#0077ed] transition-colors"
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-5 rounded-2xl bg-white p-5 product-card"
                >
                  <div className="relative h-32 w-32 flex-shrink-0 rounded-xl overflow-hidden bg-[#fafafa]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        {product.badge && (
                          <span className="inline-block rounded-full bg-[#bf4800] px-2 py-0.5 text-xs font-medium text-white mb-1">
                            {product.badge}
                          </span>
                        )}
                        <h3 className="text-lg font-semibold text-[#1d1d1f]">
                          {product.name}
                        </h3>
                        <p className="text-sm text-[#6e6e73]">
                          {product.tagline}
                        </p>
                      </div>
                      <span className="text-lg font-semibold text-[#1d1d1f] whitespace-nowrap ml-4">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[#6e6e73] line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      {product.colors && (
                        <div className="flex gap-1.5">
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
                      <button
                        onClick={() => handleBuy(product)}
                        className="rounded-full bg-[#0071e3] px-5 py-1.5 text-sm font-medium text-white hover:bg-[#0077ed] transition-colors"
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl font-medium text-[#1d1d1f]">
              No products found.
            </p>
            <p className="mt-2 text-sm text-[#6e6e73]">
              Try adjusting your filters or search term.
            </p>
          </div>
        )}
      </div>

      {/* Store Benefits */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📦",
                title: "Free delivery",
                description: "Get free delivery on orders over $50.",
              },
              {
                icon: "↩️",
                title: "Free returns",
                description: "Free and easy returns. See conditions.",
              },
              {
                icon: "💳",
                title: "Pay monthly",
                description:
                  "Pay with monthly installments at 0% APR with Apple Card.",
              },
              {
                icon: "👤",
                title: "Personalize it",
                description: "Engrave your device with your name or emoji.",
              },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <span className="text-4xl">{benefit.icon}</span>
                <h3 className="mt-3 text-base font-semibold text-[#1d1d1f]">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-sm text-[#6e6e73]">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
