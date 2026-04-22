"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { supabase } from "@/lib/supabase";

export default function CartDrawer() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const { showToast } = useToast();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    try {
      const orderItems = items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const { error } = await supabase.from("orders").insert({
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email || null,
        items: orderItems,
        total_price: totalPrice,
        notes: formData.notes || null,
      });

      if (error) throw error;

      showToast("Order placed successfully! We'll confirm shortly.", "success");
      clearCart();
      setIsCheckout(false);
      setIsCartOpen(false);
      setFormData({ name: "", phone: "", email: "", notes: "" });
    } catch {
      showToast("Failed to place order. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-foreground">
            {isCheckout ? "Checkout" : "Your Order"}
          </h2>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsCheckout(false);
            }}
            className="w-10 h-10 rounded-full bg-cream-dark flex items-center justify-center text-brown-light hover:bg-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-6xl mb-4">🍽️</span>
              <p className="text-lg font-semibold text-foreground">Your cart is empty</p>
              <p className="text-sm text-brown-light/70 mt-2">
                Add some delicious dishes from our menu!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-6 py-3 rounded-full bg-primary text-white font-semibold transition-all hover:bg-primary-dark"
              >
                Browse Menu
              </button>
            </div>
          ) : isCheckout ? (
            <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Special Instructions
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-foreground"
                  placeholder="Any allergies or special requests?"
                />
              </div>

              {/* Order summary */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-foreground mb-3">Order Summary</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-1.5 text-brown-light">
                    <span>{item.name} × {item.quantity}</span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-cream/50 border border-cream-dark/30"
                >
                  <div className="w-16 h-16 rounded-lg bg-cream-dark flex items-center justify-center text-2xl shrink-0">
                    {item.category === "breakfast" ? "🥘" : item.category === "meals" ? "🍛" : "☕"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground truncate">{item.name}</h4>
                    <p className="text-sm font-bold text-primary mt-0.5">₹{item.price * item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-foreground hover:bg-cream-dark transition-colors"
                    >
                      −
                    </button>
                    <span className="text-sm font-bold text-foreground w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-foreground hover:bg-cream-dark transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors ml-1"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-foreground font-semibold">Total</span>
              <span className="text-2xl font-bold text-primary">₹{totalPrice}</span>
            </div>
            {isCheckout ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsCheckout(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-foreground font-semibold transition-all hover:bg-cream-dark"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold transition-all hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Placing..." : "Place Order"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsCheckout(true)}
                className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-lg transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
