"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, Apple } from "lucide-react";
import { navLinks } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { cn } from "@/utils/cn";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);
  const toggleCart = useCartStore((s) => s.toggleCart);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(29,29,31,0.72)] backdrop-blur-xl backdrop-saturate-[180%]">
        <div className="mx-auto max-w-[980px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-11 items-center justify-between">
            <Link
              href="/"
              className="text-[#f5f5f7] hover:text-white transition-opacity"
              aria-label="Apple Home"
            >
              <Apple className="h-[18px] w-[18px]" />
            </Link>

            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] font-normal text-[#e8e8ed] hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-[#e8e8ed] hover:text-white transition-colors"
                aria-label="Search"
              >
                <Search className="h-[15px] w-[15px]" />
              </button>

              <button
                onClick={toggleCart}
                className="relative text-[#e8e8ed] hover:text-white transition-colors"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="h-[15px] w-[15px]" />
                {totalItems() > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#0071e3] text-[9px] font-medium text-white">
                    {totalItems()}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-[#e8e8ed] hover:text-white transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? (
                  <X className="h-[17px] w-[17px]" />
                ) : (
                  <Menu className="h-[17px] w-[17px]" />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-[#424245] bg-[rgba(29,29,31,0.95)] backdrop-blur-xl"
            >
              <div className="mx-auto max-w-[680px] px-6 py-4">
                <div className="flex items-center gap-3 rounded-lg bg-[#1d1d1f] px-4 py-2.5">
                  <Search className="h-4 w-4 text-[#86868b]" />
                  <input
                    type="text"
                    placeholder="Search apple.com"
                    className="flex-1 bg-transparent text-sm text-white placeholder-[#86868b] outline-none"
                    autoFocus
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["iPhone", "MacBook", "iPad", "AirPods", "Watch"].map(
                    (q) => (
                      <Link
                        key={q}
                        href={`/${q.toLowerCase().replace("book", "")}`}
                        onClick={() => setSearchOpen(false)}
                        className="rounded-full bg-[#323234] px-3 py-1 text-xs text-[#e8e8ed] hover:bg-[#424245] transition-colors"
                      >
                        {q}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "fixed inset-0 z-40 bg-[#1d1d1f] pt-11 lg:hidden"
            )}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="px-12 pt-10"
            >
              <div className="flex items-center gap-3 rounded-lg bg-[#2d2d2f] px-4 py-2.5 mb-6">
                <Search className="h-4 w-4 text-[#86868b]" />
                <input
                  type="text"
                  placeholder="Search apple.com"
                  className="flex-1 bg-transparent text-sm text-white placeholder-[#86868b] outline-none"
                />
              </div>
              <nav className="space-y-0">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block border-b border-[#424245] py-3 text-[28px] font-semibold text-[#e8e8ed] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
