"use client";

import { useState, useRef } from "react";
import { FAQSection } from "@/types";

interface FAQAccordionProps {
  data: FAQSection;
}

export default function FAQAccordion({ data }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggle = (index: number) => {
    const current = contentRefs.current[index];
    if (!current) return;

    if (openIndex === index) {
      // Close
      const height = current.scrollHeight;
      current.style.height = height + "px"; // set current height
      requestAnimationFrame(() => {
        current.style.height = "0px"; // then animate to 0
      });
      setOpenIndex(null);
    } else {
      // Open
      if (openIndex !== null) {
        // Close previously open item
        const prev = contentRefs.current[openIndex];
        if (prev) {
          prev.style.height = prev.scrollHeight + "px";
          requestAnimationFrame(() => {
            prev.style.height = "0px";
          });
        }
      }

      current.style.height = "0px";
      requestAnimationFrame(() => {
        current.style.height = current.scrollHeight + "px";
      });
      setOpenIndex(index);
    }
  };

  const handleTransitionEnd = (index: number) => {
    const current = contentRefs.current[index];
    if (!current) return;
    if (openIndex === index) {
      current.style.height = "auto"; // allow content to grow naturally
    }
  };

  return (
    <section className="py-30">
      <div className="max-w-[1300px] mx-auto px-5">
        <div className="mb-15">
          <h2 className="text-4xl text-center font-bold mb-3">{data.title}</h2>
          {data.subtitle && <p className="text-gray-600 text-center max-w-[1100px] mx-auto">{data.subtitle}</p>}
        </div>

        <div className="space-y-7">
          {data.faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-gray-300 pb-7">
              <button
                onClick={() => toggle(idx)}
                className="flex justify-between w-full text-left text-[15px] cursor-pointer font-semibold uppercase"
              >
                <span>{faq.question}</span>
                <span className="text-xl">{openIndex === idx ? "−" : "+"}</span>
              </button>

              <div
                ref={(el) => {
                  contentRefs.current[idx] = el;
                }}
                style={{ height: "0px", overflow: "hidden", transition: "height 0.5s ease-in-out" }}
                onTransitionEnd={() => handleTransitionEnd(idx)}
              >
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
