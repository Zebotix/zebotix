import { type Metadata } from "next";

import QuickQuoteClient from "./_components/QuickQuoteClient";

import { COMPANY_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Project Estimator — ${COMPANY_NAME}`,
  description:
    "Get a quick project estimate from Zebotix. Share your requirements and get a roadmap within 24 hours.",
  alternates: {
    canonical: `${SITE_URL}/quick-quote`,
  },
  openGraph: {
    title: `Project Estimator — ${COMPANY_NAME}`,
    description:
      "Get a quick project estimate from Zebotix. Share your requirements and get a roadmap within 24 hours.",
    url: `${SITE_URL}/quick-quote`,
    type: "website",
    images: [
      {
        url: "/Zebotix.webp",
        width: 1200,
        height: 630,
        alt: `${COMPANY_NAME} — Quick Quote`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Project Estimator — ${COMPANY_NAME}`,
    description:
      "Get a quick project estimate from Zebotix. Share your requirements and get a roadmap within 24 hours.",
    images: ["/Zebotix.webp"],
  },
};

export default function QuickQuotePage() {
  return <QuickQuoteClient />;
}

