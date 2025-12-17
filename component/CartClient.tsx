"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCart, removeItem, clearCart, getTotal } from "@/lib/cart";
import CheckoutButton from "@/component/CheckoutButton";

export default function CartClient() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const handleRemove = (variantId: string) => {
    removeItem(variantId);
    setItems(getCart());
  };

  const handleClear = () => {
    clearCart();
    setItems([]);
  };

  if (!items || items.length === 0) {
    return <div className="p-6">Your cart is empty.</div>;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        {items.map((it) => (
          <div key={it.variantId} className="flex items-center gap-4 border p-3 rounded-md">
            {it.image ? (
              <div className="w-20 h-20 relative">
                <Image src={it.image} alt={it.title} width={80} height={80} className="object-cover h-full w-full rounded" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-gray-100 flex items-center justify-center">No image</div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="font-[600] text-[16px]">
                  {it.title}
                    {it.selectedOptions && Object.keys(it.selectedOptions).length > 0 && (
                    <span className="text-sm text-gray-600 ml-4 "> ---{Object.values(it.selectedOptions).join(' / ')}</span>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-600 font-[600]">Qty: {it.quantity}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${it.price}</div>
              <button onClick={() => handleRemove(it.variantId)} className="text-red-500 text-sm mt-2 cursor-pointer">Remove</button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-4">
          <div className="font-bold">Total: ${getTotal().toFixed(2)}</div>
          <div className="flex gap-2">
            <button onClick={handleClear} className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-300 transition-all duration-500 ease-in-out">Clear</button>
            <CheckoutButton items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}
