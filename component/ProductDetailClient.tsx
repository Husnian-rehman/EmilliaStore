"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShopifyProduct, ShopifyVariant } from "@/lib/shopify/types";
import CheckoutButton from "@/component/CheckoutButton";
import AddToCartButton from "@/component/AddToCartButton";
import { useRouter } from "next/navigation";
import { addItem } from "@/lib/cart";

export default function ProductDetailClient({ product }: { product: ShopifyProduct }) {
  const initialImage = product.featuredImage?.url || product.images?.[0]?.url || "";
  const [selectedImage, setSelectedImage] = useState<string>(initialImage);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(product.variantId || product.variants?.[0]?.id);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Build options map: { OptionName: [values...] }
  const optionsMap: Record<string, string[]> = {};
  (product.variants || []).forEach((v) => {
    (v.selectedOptions || []).forEach((opt) => {
      if (!optionsMap[opt.name]) optionsMap[opt.name] = [];
      if (!optionsMap[opt.name].includes(opt.value)) optionsMap[opt.name].push(opt.value);
    });
  });

  // Remove Shopify's default "Title / Default Title" when it's not a real option
  Object.keys(optionsMap).forEach((k) => {
    const values = optionsMap[k] || [];
    const isTitleKey = /^title$/i.test(k);
    const onlyDefaultTitle = values.length === 1 && /^default\s*title$/i.test(String(values[0] || ""));
    if (isTitleKey && onlyDefaultTitle) {
      delete optionsMap[k];
    }
  });

  // Map option value -> image (use first variant image found for that value)
  const valueImageMap: Record<string, Record<string, string>> = {};
  (product.variants || []).forEach((v) => {
    const img = (v.image as any)?.url;
    (v.selectedOptions || []).forEach((opt) => {
      const name = opt.name;
      const rawVal = opt.value;
      const key = rawVal ? String(rawVal).trim() : rawVal;
      const norm = key ? key.toLowerCase() : key;
      if (!valueImageMap[name]) valueImageMap[name] = {};
      if (img) {
        if (!valueImageMap[name][key]) valueImageMap[name][key] = img;
        if (!valueImageMap[name][norm]) valueImageMap[name][norm] = img;
      }
    });
  });

  const getVariantImageForOption = (optionName: string, value: string) => {
    if (!value) return undefined;
    const raw = value;
    const norm = value.trim().toLowerCase();
    // direct lookup
    const direct = valueImageMap[optionName]?.[raw] || valueImageMap[optionName]?.[norm];
    if (direct) return direct;

    // fallback: find any variant that has this option value
    const v = (product.variants || []).find((variant) =>
      (variant.selectedOptions || []).some((o) => o.name === optionName && String(o.value).trim().toLowerCase() === norm)
    );
    return (v && (v.image as any)?.url) || undefined;
  };

  // Find variant by selectedOptions
  const findVariantByOptions = (opts: Record<string, string>) => {
    return (product.variants || []).find((v) => {
      const so = v.selectedOptions || [];
      return Object.entries(opts).every(([name, value]) => so.some((o) => o.name === name && o.value === value));
    });
  };

  useEffect(() => {
    setSelectedImage(product.featuredImage?.url || product.images?.[0]?.url || "");
    setSelectedVariantId(product.variantId || product.variants?.[0]?.id);
    // initialize selectedOptions from first variant
    const first = product.variants?.[0];
    if (first?.selectedOptions) {
      const map: Record<string, string> = {};
      first.selectedOptions.forEach((o) => {
        // skip default Title entries
        if (/^title$/i.test(o.name) && /^default\s*title$/i.test(String(o.value || ""))) return;
        map[o.name] = o.value;
      });
      setSelectedOptions(map);
    } else {
      setSelectedOptions({});
    }
  }, [product]);

  const handleVariantClick = (variant: ShopifyVariant) => {
    // set selected options from this variant
    const map: Record<string, string> = {};
    (variant.selectedOptions || []).forEach((o) => (map[o.name] = o.value));
    setSelectedOptions((prev) => ({ ...prev, ...map }));
    setSelectedVariantId(variant.id);
    if (variant.image && (variant.image as any).url) setSelectedImage((variant.image as any).url);
  };

  const getColorValue = (variant: ShopifyVariant) => {
    const opt = variant.selectedOptions?.find((o) => /color|colour/i.test(o.name)) || variant.selectedOptions?.[0];
    return opt?.value || "";
  };

  const namedColorToHex: Record<string, string> = {
    black: "#000000",
    white: "#FFFFFF",
    gray: "#808080",
    grey: "#808080",
    red: "#FF0000",
    blue: "#0000FF",
    green: "#008000",
    yellow: "#FFFF00",
    brown: "#A52A2A",
    pink: "#FFC0CB",
    purple: "#800080",
    navy: "#000080",
    beige: "#F5F5DC",
    tan: "#D2B48C",
    olive: "#808000",
    orange: "#FFA500",
  };

  const isColorOptionName = (name: string) => /color|colour/i.test(name);

  const looksLikeColor = (val: string) => {
    if (!val) return false;
    const v = String(val).trim();
    if (!v) return false;
    if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(v)) return true;
    if (/^rgba?\(/i.test(v)) return true;
    if (/^hsla?\(/i.test(v)) return true;
    if (v.length > 1 && namedColorToHex[v.toLowerCase()]) return true;
    return false;
  };

  return (
    <div className="max-w-6xl pt-[150px] mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-4">
        <div className="w-full h-[500px] relative">
          {selectedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <Image src={selectedImage} alt={product.title} fill className="object-cover rounded-md" />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">No image</div>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {product.images && product.images.length > 0 ? (
            product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img.url)}
                className={`w-20 h-20 border border-gray-200 rounded-md overflow-hidden ${selectedImage === img.url ? "border border-gray-600" : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image src={img.url} alt={img.altText || product.title} width={80} height={80} className="object-cover" />
              </button>
            ))
          ) : (
            <div>No thumbnails</div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>

        <div className="flex items-center gap-2">
          <span>⭐⭐⭐⭐⭐</span>
          <span className="text-gray-500">(4.9)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{product.price ? `$${product.price}` : "Price not available"}</span>
          {product.compareAtPrice && <span className="text-gray-400 line-through">${product.compareAtPrice}</span>}
        </div>
        
        {/* options data — show only when product has option groups */}
        {Object.keys(optionsMap).length > 0 && (
          <div className="flex flex-col gap-5 mt-4">
            <div>
              <div className="flex flex-col gap-4 mt-3">
                {Object.entries(optionsMap).map(([optionName, values]) => (
                  <div key={optionName}>
                    <div className="font-[600] mb-2">{optionName}</div>
                    <div className="flex gap-3 flex-wrap">
                      {values.map((value) => {
                        const isSelected = selectedOptions[optionName] === value;
                        const optionIsColorName = isColorOptionName(optionName);
                        const valueLooksColor = looksLikeColor(value);
                        const isColor = optionIsColorName || valueLooksColor;
                        const valueImage = getVariantImageForOption(optionName, value);

                        const handleClick = () => {
                          const newSelected = { ...selectedOptions, [optionName]: value };
                          setSelectedOptions(newSelected);
                          const matched = findVariantByOptions(newSelected);
                          if (matched) {
                            setSelectedVariantId(matched.id);
                            if ((matched.image as any)?.url) setSelectedImage((matched.image as any).url);
                          }
                        };

                        if (isColor) {
                          const styleColor = valueLooksColor ? value : (namedColorToHex[value.toLowerCase()] || value);
                          return (
                            <button
                              key={value}
                              onClick={handleClick}
                              className={`w-8 h-8 rounded-full cursor-pointer border ${isSelected ? "ring-2 ring-black" : ""}`}
                              style={{ backgroundColor: styleColor }}
                              aria-label={`${optionName}: ${value}`}
                            />
                          );
                        }

                        // If a value image exists (for non-color options), render it as the background
                        if (!isColor && valueImage) {
                          return (
                            <button
                              key={value}
                              onClick={handleClick}
                              className={`w-16 h-8 rounded-md cursor-pointer overflow-hidden bg-center bg-cover relative ${isSelected ? "ring-1 ring-black" : ""}`}
                              aria-label={`${optionName}: ${value}`}
                            >
                              <span className=" px-2 h-full inset-0 flex items-center justify-center  text-xs font-medium text-white bg-gray-400 backdrop-blur-sm">{value}</span>
                            </button>
                          );
                        }

                        return (
                          <button
                            key={value}
                            onClick={handleClick}
                            className={`border px-3 py-1 cursor-pointer rounded-md hover:border-black text-black ${isSelected ? "bg-gray-200" : "bg-white"}`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedVariantId ? (
          <div className="mt-4 flex gap-3">
            <AddToCartButton
              variantId={selectedVariantId}
              title={product.title}
              price={product.price}
              image={selectedImage || product.featuredImage?.url}
              handle={(product as any).handle}
            />
            <CheckoutButton variantId={selectedVariantId} quantity={1} />
          </div>
        ) : (
          <div className="mt-4 text-gray-500">This product is not available for purchase.</div>
        )}

        <div className="mt-6">
          <h3 className="font-[600] mb-3 text-[18px]">Description</h3>
          <div dangerouslySetInnerHTML={{ __html: product.description || "" }} className="text-[14 px] text-gray-600" />
        </div>
      </div>
    </div>
  );
}
