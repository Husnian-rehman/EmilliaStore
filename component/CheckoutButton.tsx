"use client";

import React from "react";
import { getCart, getCheckoutUrl } from "@/lib/cart";

export default function CheckoutButton({
  items,
  variantId,
  quantity = 1,
}: {
  items?: any[];
  variantId?: string;
  quantity?: number;
}) {
  const handleCheckout = async () => {
    // Determine cart items (use passed items or local cart)
    const cartItems = items && items.length > 0 ? items : getCart();

    // If single-variant checkout requested
    if (variantId && (!cartItems || cartItems.length === 0)) {
      let domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
      if (!domain) {
        try {
          const res = await fetch('/api/checkout-url');
          const json = await res.json();
          domain = json.domain;
        } catch (e) {
          console.error('Failed to fetch checkout domain', e);
        }
      }
      if (!domain) {
        alert('Checkout URL is not configured. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN or SHOPIFY_STORE_DOMAIN in env.');
        return;
      }
      const m = String(variantId).match(/(\d+)$/);
      const id = m ? m[1] : variantId;
      const url = `https://${domain}/cart/${id}:${quantity}`;
      window.location.href = url;
      return;
    }

    // Build checkout URL for cartItems
    if (!cartItems || cartItems.length === 0) {
      alert('Cart is empty');
      return;
    }

    // get domain (public or via server)
    let domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    if (!domain) {
      try {
        const res = await fetch('/api/checkout-url');
        const json = await res.json();
        domain = json.domain;
      } catch (e) {
        console.error('Failed to fetch checkout domain', e);
      }
    }

    if (!domain) {
      alert('Checkout URL is not configured. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN or SHOPIFY_STORE_DOMAIN in env.');
      return;
    }

    const normalizeVariant = (id: string) => {
      if (!id) return id;
      const m = String(id).match(/(\d+)$/);
      return m ? m[1] : id;
    };

    const parts = cartItems.map((it: any) => `${normalizeVariant(it.variantId)}:${it.quantity}`).join(',');
    const url = `https://${domain}/cart/${parts}`;
    window.location.href = url;
  };

  return (
    <button onClick={handleCheckout} className="bg-black text-white cursor-pointer px-4 py-2 rounded-md">
      Checkout
    </button>
  );
}
