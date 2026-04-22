"use client";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 pattern-overlay opacity-30" />

      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-[15%] w-3 h-3 rounded-full bg-accent/40 animate-pulse hidden lg:block" />
      <div className="absolute top-1/3 right-[25%] w-2 h-2 rounded-full bg-primary-light/30 animate-pulse hidden lg:block" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 left-[20%] w-4 h-4 rounded-full bg-accent/20 animate-pulse hidden lg:block" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="animate-slide-down inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-white/80 text-sm font-medium tracking-wide">
              Authentic South Indian Cuisine
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Experience the{" "}
            <span className="gold-shimmer">Authentic Flavors</span>{" "}
            of South India
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-in-up mt-6 sm:mt-8 text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl"
            style={{ animationDelay: "0.2s" }}
          >
            From the crispy perfection of our dosas to the aromatic warmth of
            filter coffee — every dish tells a story of tradition, crafted with
            love and served with pride.
          </p>

          {/* CTA buttons */}
          <div
            className="animate-fade-in-up flex flex-col sm:flex-row gap-4 mt-10 sm:mt-12"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="#menu"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold text-lg transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1"
            >
              Explore Our Menu
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="#order"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/20 text-white font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:-translate-y-1"
            >
              Book a Table
            </a>
          </div>

          {/* Stats */}
          <div
            className="animate-fade-in-up flex flex-wrap gap-8 sm:gap-12 mt-16 sm:mt-20 pt-8 border-t border-white/10"
            style={{ animationDelay: "0.6s" }}
          >
            {[
              { value: "25+", label: "Years of Legacy" },
              { value: "50+", label: "Authentic Dishes" },
              { value: "10K+", label: "Happy Customers" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  );
}
