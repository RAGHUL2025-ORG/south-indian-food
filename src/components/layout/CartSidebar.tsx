"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/data/products";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-[#d2d2d7] px-6 py-4">
                <h2 className="text-lg font-semibold text-[#1d1d1f]">
                  Your Bag
                </h2>
                <button
                  onClick={closeCart}
                  className="rounded-full p-1 hover:bg-[#f5f5f7] transition-colors"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5 text-[#1d1d1f]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="h-16 w-16 text-[#d2d2d7] mb-4" />
                    <p className="text-lg font-medium text-[#1d1d1f]">
                      Your Bag is empty.
                    </p>
                    <p className="mt-1 text-sm text-[#6e6e73]">
                      Find something you love to fill it up.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 rounded-xl bg-[#f5f5f7] p-4"
                      >
                        <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-[#1d1d1f] truncate">
                            {item.product.name}
                          </h3>
                          {item.selectedColor && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span
                                className="h-3 w-3 rounded-full border border-[#d2d2d7]"
                                style={{
                                  backgroundColor: item.selectedColor.hex,
                                }}
                              />
                              <span className="text-xs text-[#6e6e73]">
                                {item.selectedColor.name}
                              </span>
                            </div>
                          )}
                          <p className="mt-1 text-sm font-medium text-[#1d1d1f]">
                            {formatPrice(item.product.price)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="rounded-full p-0.5 bg-white hover:bg-[#e8e8ed] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5 text-[#1d1d1f]" />
                            </button>
                            <span className="text-sm font-medium text-[#1d1d1f] min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="rounded-full p-0.5 bg-white hover:bg-[#e8e8ed] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5 text-[#1d1d1f]" />
                            </button>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="ml-auto text-xs text-[#0071e3] hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-[#d2d2d7] px-6 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-[#1d1d1f]">
                      Subtotal
                    </span>
                    <span className="text-base font-semibold text-[#1d1d1f]">
                      {formatPrice(totalPrice())}
                    </span>
                  </div>
                  <button className="w-full rounded-xl bg-[#0071e3] py-3 text-sm font-medium text-white hover:bg-[#0077ed] transition-colors">
                    Check Out
                  </button>
                  <p className="text-center text-xs text-[#6e6e73]">
                    Free delivery and free returns.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
