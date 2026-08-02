"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "true") {
      setConsentGiven(true);
    } else if (consent === "false") {
      setConsentGiven(false);
    }
  }, []);

  useGoogleAnalytics(consentGiven);

  if (!mounted) {
    return null;
  }

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setConsentGiven(true);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    setConsentGiven(false);
  };

  const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-JD55RSPP55";

  return (
    <>
      {consentGiven === true && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="lazyOnload"
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {consentGiven === null && (
        <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-9999 animate-in slide-in-from-bottom-full duration-500">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="bg-zinc-900 border border-zinc-800 p-5 md:p-6 rounded-xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">We respect your privacy</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  We use cookies to analyze website traffic and optimize your website experience. By
                  accepting our use of cookies, your data will be aggregated with all other user
                  data.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <Button
                  variant="outline"
                  onClick={handleDecline}
                  className="text-zinc-300 border-zinc-700 hover:bg-zinc-800 hover:text-white"
                >
                  Decline
                </Button>
                <Button
                  onClick={handleAccept}
                  className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                >
                  Accept Cookies
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
