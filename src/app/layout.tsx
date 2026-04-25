import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/layout/CartSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apple — Products, Design & Innovation",
  description:
    "Discover the innovative world of Apple. Shop iPhone, Mac, iPad, Apple Watch, AirPods, and accessories.",
  keywords: [
    "Apple",
    "iPhone",
    "MacBook",
    "iPad",
    "Apple Watch",
    "AirPods",
    "Mac",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <CartSidebar />
        <main className="flex-1 pt-11">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
