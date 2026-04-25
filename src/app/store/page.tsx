import type { Metadata } from "next";
import StoreClient from "./StoreClient";

export const metadata: Metadata = {
  title: "Apple Store — Buy iPhone, Mac, iPad & more",
  description:
    "Shop the latest Apple products including iPhone, Mac, iPad, Apple Watch, and AirPods.",
};

export default function StorePage() {
  return <StoreClient />;
}
