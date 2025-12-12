import React from "react";
import { MarqueeBarType } from "@/types";

interface MarqueeBarProps {
  data: MarqueeBarType;
}

const MarqueeBar: React.FC<MarqueeBarProps> = ({ data }) => {
  const items = data.items || [];
  const speed = data.speed && data.speed > 0 ? data.speed : 10; // seconds per loop

  // Duplicate items for seamless scroll
  const displayItems = [...items, ...items];

  const trackStyle: React.CSSProperties = {
    display: "flex",
    gap: "3rem",
    alignItems: "center",
    whiteSpace: "nowrap",
  };

  return (
    <div className="marquee-bar py-5 bg-black text-white" aria-hidden={items.length === 0}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="marquee-inner" style={trackStyle}>
          {displayItems.map((it, idx) => (
            <div
              className="marquee-item"
              key={idx}
              style={{
                display: "inline-flex",
                alignItems: "start",
                gap: "0.5rem",
              }}
            >
               <span
                className="marquee-icon !text-white pt-[2px]" 
                dangerouslySetInnerHTML={{ __html: it.iconSvg }} />
              <span className="marquee-heading text-2xl">{it.heading}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-bar {
          overflow: hidden;
          width: 100%;
        }
        .marquee-track {
          display: block;
          will-change: transform;
          /* animation moves the inner container left by 50% (since we duplicated) */
          animation-name: marquee-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .marquee-inner {
          display: inline-flex;
          align-items: center;
        }
        .marquee-item {
          font-weight: 500;
          color: inherit;
        }
        .marquee-icon svg {
          width: 1.25rem;
          height: 1.25rem;
          display: inline-block; 
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Accessibility: pause on hover/focus */
        .marquee-track:hover,
        .marquee-track:focus-within {
          animation-play-state: paused;
        }
      `} </style>
    </div>
  );
};

export default MarqueeBar;
