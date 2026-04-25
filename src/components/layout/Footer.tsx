"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

const footerSections = [
  {
    title: "Shop and Learn",
    links: [
      { label: "Store", href: "/store" },
      { label: "Mac", href: "/mac" },
      { label: "iPad", href: "/ipad" },
      { label: "iPhone", href: "/iphone" },
      { label: "Watch", href: "/watch" },
      { label: "AirPods", href: "/airpods" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Apple Music", href: "#" },
      { label: "Apple TV+", href: "#" },
      { label: "Apple Arcade", href: "#" },
      { label: "iCloud", href: "#" },
      { label: "Apple One", href: "#" },
    ],
  },
  {
    title: "Apple Store",
    links: [
      { label: "Find a Store", href: "#" },
      { label: "Genius Bar", href: "#" },
      { label: "Today at Apple", href: "#" },
      { label: "Apple Camp", href: "#" },
      { label: "Financing", href: "#" },
      { label: "Order Status", href: "#" },
    ],
  },
  {
    title: "For Business",
    links: [
      { label: "Apple and Business", href: "#" },
      { label: "Shop for Business", href: "#" },
    ],
  },
  {
    title: "Apple Values",
    links: [
      { label: "Accessibility", href: "#" },
      { label: "Education", href: "#" },
      { label: "Environment", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Supply Chain", href: "#" },
    ],
  },
  {
    title: "About Apple",
    links: [
      { label: "Newsroom", href: "#" },
      { label: "Apple Leadership", href: "#" },
      { label: "Career Opportunities", href: "#" },
      { label: "Investors", href: "#" },
      { label: "Contact Apple", href: "#" },
    ],
  },
];

function FooterAccordion({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#424245] md:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-2 md:cursor-default md:pointer-events-none"
      >
        <span className="text-xs font-semibold text-[#e8e8ed]">{title}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 text-[#86868b] transition-transform md:hidden",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all md:max-h-none md:opacity-100",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 md:max-h-96"
        )}
      >
        <ul className="space-y-1.5 pb-3 md:pb-0 md:pt-1">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-xs text-[#86868b] hover:text-[#e8e8ed] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] border-t border-[#d2d2d7]">
      <div className="mx-auto max-w-[980px] px-4 sm:px-6 lg:px-8 py-5">
        <p className="text-xs text-[#6e6e73] mb-4 leading-relaxed">
          * Monthly pricing is after the application of a trade-in credit.
          Trade-in values will vary based on the condition, year, and
          configuration of your eligible trade-in device. Not all devices are
          eligible for credit. You must be at least 18 years old to be eligible
          to trade in for credit or for an Apple Gift Card.
        </p>

        <div className="border-t border-[#d2d2d7] pt-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-6">
            {footerSections.map((section) => (
              <FooterAccordion
                key={section.title}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-[#d2d2d7] mt-4 pt-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <p className="text-xs text-[#86868b]">
              Copyright &copy; {new Date().getFullYear()} Apple Inc. All rights
              reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {[
                "Privacy Policy",
                "Terms of Use",
                "Sales and Refunds",
                "Legal",
                "Site Map",
              ].map((item, i) => (
                <span key={item} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-[#d2d2d7] text-xs">|</span>
                  )}
                  <Link
                    href="#"
                    className="text-xs text-[#424245] hover:text-[#1d1d1f] transition-colors"
                  >
                    {item}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
