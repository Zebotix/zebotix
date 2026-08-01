"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export default function HeroVideo() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Only load the video on larger screens to save bandwidth on mobile
    if (window.innerWidth >= 768) {
      setShouldLoad(true);
    }
  }, []);

  if (!shouldLoad) return null;

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
      preload="metadata"
      poster="/images/bg-3-poster.webp"
      className={cn(
        "absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transition-opacity duration-1000 opacity-40"
      )}
      style={{ willChange: "transform", transform: "translate3d(0, 0, 0)" }}
    >
      <source src="/videos/bg-3-opt.webm" type="video/webm" />
      <source src="/videos/bg-3-opt.mp4" type="video/mp4" />
    </video>
  );
}
