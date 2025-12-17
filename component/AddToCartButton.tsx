"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { addItem } from "@/lib/cart";

export default function AddToCartButton({
  variantId,
  title,
  price,
  image,
  handle,
  selectedOptions,
}: {
  variantId: string;
  title: string;
  price?: string | number;
  image?: string;
  handle?: string;
  selectedOptions?: Record<string, string>;
}) {
  const router = useRouter();

  const onAdd = () => {
    try {
      addItem({ variantId, title, price, image, quantity: 1, handle, selectedOptions });
    } catch (e) {
      console.error("Failed to add to cart", e);
    }
    router.push("/cart");
  };

  return (
    <button onClick={onAdd} className="bg-black cursor-pointer text-white px-6 py-2 rounded-md w-full">
      Add to Cart
    </button>
  );
}
