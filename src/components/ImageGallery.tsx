"use client";

import { useState } from "react";

export default function ImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const validImages = images.filter(Boolean);

  if (validImages.length === 0) {
    return (
      <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
        <svg className="w-20 h-20 text-white/30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-gray-100 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={validImages[active]}
          alt={`${title} — image ${active + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {validImages.length > 1 && (
          <>
            <button
              onClick={() => setActive((a) => Math.max(0, a - 1))}
              disabled={active === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition disabled:opacity-30"
            >
              <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActive((a) => Math.min(validImages.length - 1, a + 1))}
              disabled={active === validImages.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition disabled:opacity-30"
            >
              <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {active + 1} / {validImages.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {validImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition ${
                i === active ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
