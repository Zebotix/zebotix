import { type Metadata } from "next";

import ContactClient from "./_components/ContactClient";

import { COMPANY_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact — ${COMPANY_NAME}`,
  description:
    "Contact Zebotix — Karachi-based digital studio. Reach us by phone, email, social or send a message using the form.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: `Contact — ${COMPANY_NAME}`,
    description:
      "Contact Zebotix — Karachi-based digital studio. Reach us by phone, email, social or send a message using the form.",
    url: `${SITE_URL}/contact`,
    type: "website",
    images: [
      {
        url: "/Zebotix.webp",
        width: 1200,
        height: 630,
        alt: `${COMPANY_NAME} — Contact Us`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact — ${COMPANY_NAME}`,
    description:
      "Contact Zebotix — Karachi-based digital studio. Reach us by phone, email, social or send a message using the form.",
    images: ["/Zebotix.webp"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}

