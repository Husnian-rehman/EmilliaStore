"use client";

import Image from "next/image";
import { PopupType } from "@/types";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Props = {
  data: PopupType;
};

export default function Popup({ data }: Props) {
  const pathname = usePathname();

  if (typeof pathname === "string" && pathname.startsWith("/studio")) {
    return null;
  }
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    setIsMounted(true);
    const t = setTimeout(() => setIsVisible(true), 1000); // show after 1s
    return () => {
      clearTimeout(t);
      setIsVisible(false);
    };
  }, [pathname]);
  const closePopup = () => {
    setIsVisible(false);
    setTimeout(() => setIsMounted(false), 300);
  };
  useEffect(() => {
    if (!isMounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div
      
      onClick={closePopup}
      className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ${
        isVisible ? "bg-black/60 opacity-100" : "bg-black/0 opacity-0 pointer-events-none"
      }`}
    >
      <div
        
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl flex md:flex-row flex-col max-w-3xl w-full transform transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        
        <div className="max-w-[43%] w-full relative hidden md:block">
          {data?.image?.url && (
            <Image
              src={data.image.url}
              alt={data.image.alt || ""}
              fill
              className="object-cover rounded-l-2xl"
            />
          )}
        </div>
        <div className="w-full px-6   pb-15 pt-25 flex flex-col justify-center relative">
      
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 font-[700] text-[12px] cursor-pointer rounded-full bg-black w-[36px] h-[36px] text-white hover:bg-gray-800 focus:outline-none"
          >
            ✕
          </button>

          <h3 className="text-lg font-bold mb-3">{data.title}</h3>

          <p className="text-sm mb-6 text-gray-600">{data.description}</p>

          <input
            type="email"
            placeholder={data.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-full px-4 py-2 w-full mb-2 text-sm"
          />

          <button
            className="bg-black text-white cursor-pointer !text-[14px] font-[600]  rounded-full py-2 w-full  mb-4"
            onClick={() => console.log("submit", email)}
          >
            {data.buttonText}
          </button>

          <label className="flex items-center gap-2 mt-4 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              className="cursor-pointer"
            />
            {data.checkboxText}
          </label>
        </div>
      </div>
    </div>
  );
}
