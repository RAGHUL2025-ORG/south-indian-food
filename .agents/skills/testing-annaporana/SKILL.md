# Testing: Annaporana South Indian Food Website

## Overview
This is a Next.js 16 + Tailwind CSS 4 static website for a South Indian food brand. No backend, no auth, no database — pure frontend.

## Dev Server Setup
```bash
npm install
npm run dev -- -p 3000
```
Verify with `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000` (expect 200).

## Key UI Sections & Navigation
- **Navbar**: Sticky, transparent at top, transitions to white bg after scrolling past ~50px. Desktop links: Home, Menu, Specials, About, Contact + "Order Now" CTA. Mobile (< 768px): hamburger icon toggles slide-down menu.
- **Hero** (`#home`): Full-screen dark gradient. Headline: "Experience the Authentic Flavors of South India". Gold shimmer animation on "Authentic Flavors". Two CTAs: "Explore Our Menu" / "Book a Table". Stats: 25+ Years, 50+ Dishes, 10K+ Customers.
- **Menu** (`#menu`): Three category tabs — Breakfast, Meals, Beverages (default: Breakfast). Each category has 6 items. Cards show image (Unsplash, with emoji fallback on error), name, price (₹), description, badges (Veg/Spicy/Popular), and "Add to Order" button.
- **Specials** (`#specials`): 5 featured items in alternating left/right layout with "Best Seller" badges and "Order Now" buttons.
- **About** (`#about`): Brand story + 4 value cards (Fresh Ingredients, Traditional Recipes, Cultural Heritage, Made with Love).
- **Order CTA**: Dark section with "Order Online" / "Book a Table" CTAs and trust indicators (30 Min Delivery, 100% Fresh, 4.9 Rating, Free Delivery).
- **Footer** (`#contact`): Contact info (42 Cathedral Road, Mylapore, Chennai 600004 / +91 44 2812 3456 / hello@annaporana.in), hours, social icons, nav links.

## Testing Approach
1. Start dev server and verify HTTP 200
2. Open `http://localhost:3000` in browser
3. Test hero content and animations
4. Scroll to verify navbar transition (transparent → white)
5. Test menu tab switching (Breakfast → Meals → Beverages) — verify 6 items per tab
6. Scroll through Specials, About, Order CTA sections
7. Verify footer contact info
8. Toggle mobile responsive view (375-400px width) and test hamburger menu

## Image Loading
Images are from Unsplash free tier and might occasionally fail to load due to rate limiting. The app has graceful emoji fallbacks per category (breakfast: 🥘, meals: 🍛, beverages: ☕). This is expected behavior, not a bug.

## Build & Lint
```bash
npm run build
npm run lint
```
Both should pass cleanly.

## Devin Secrets Needed
None — this is a static frontend with no auth or API keys.
