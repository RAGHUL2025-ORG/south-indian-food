"use client";

import { useScrollReveal } from "./useScrollReveal";

const values = [
  {
    icon: "🌿",
    title: "Fresh Ingredients",
    description:
      "We source the finest spices, lentils, and rice from trusted farms across South India. Every ingredient is handpicked for quality.",
  },
  {
    icon: "👨‍🍳",
    title: "Traditional Recipes",
    description:
      "Our recipes have been passed down through generations. We honor the authentic methods — from stone-ground batters to slow-cooked curries.",
  },
  {
    icon: "🪔",
    title: "Cultural Heritage",
    description:
      "More than food, we celebrate the rich culinary heritage of South India — its festivals, rituals, and the warmth of sharing a meal.",
  },
  {
    icon: "❤️",
    title: "Made with Love",
    description:
      "Every dish is prepared with care and passion. We believe food made with love nourishes not just the body, but the soul.",
  },
];

export default function About() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-20 sm:py-28 bg-cream-dark relative overflow-hidden">
      <div className="absolute inset-0 pattern-overlay opacity-50" />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Story */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold tracking-wide uppercase">
              Our Story
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
              A Legacy of{" "}
              <span className="text-primary">Flavor</span> &{" "}
              <span className="text-secondary">Tradition</span>
            </h2>
            <div className="mt-6 space-y-4 text-brown-light/80 text-base sm:text-lg leading-relaxed">
              <p>
                Founded in 1998 in the heart of Chennai, Annaporana was born
                from a simple belief — that authentic South Indian food deserves
                to be celebrated, not simplified.
              </p>
              <p>
                Our founder, inspired by the bustling tiffin centers of Mylapore
                and the grand Chettinad kitchens, set out to create a space
                where tradition meets contemporary dining. Every dosa is spread
                on a seasoned iron tawa, every sambar is slow-simmered to
                perfection.
              </p>
              <p>
                Today, Annaporana stands as a testament to the flavors that have
                united families across generations. We don&apos;t just serve food —
                we serve memories.
              </p>
            </div>

            {/* Signature line */}
            <div className="mt-8 flex items-center gap-4">
              <div className="w-16 h-0.5 bg-accent" />
              <p className="text-accent font-semibold italic text-lg">
                &quot;Where every meal is a celebration&quot;
              </p>
            </div>
          </div>

          {/* Right: Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg hover:shadow-brown/5 transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-brown-light/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
