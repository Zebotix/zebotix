"use client";

import Script from "next/script";

import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";

export default function GoogleAnalytics() {
  useGoogleAnalytics();

  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-JD55RSPP55";

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
