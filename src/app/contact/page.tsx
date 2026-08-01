import { type Metadata } from "next";

import ContactClient from "./_components/ContactClient";

import { COMPANY_NAME, SITE_URL } from "@/lib/constants";
import { generateLocalBusinessSchema, getSanitizedSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: `Contact — ${COMPANY_NAME}`,
  description:
    "Contact Zebotix — Karachi-based digital studio. Reach us by email, social or send a message using the form.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact — ${COMPANY_NAME}`,
    description:
      "Contact Zebotix — Karachi-based digital studio. Reach us by email, social or send a message using the form.",
    url: `${SITE_URL}/contact`,
    type: "website",
    images: [
      {
        url: "/Zebotix.png",
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
      "Contact Zebotix — Karachi-based digital studio. Reach us by email, social or send a message using the form.",
    images: ["/Zebotix.png"],
  },
};

export default function ContactPage() {
  const localBusinessSchema = generateLocalBusinessSchema();
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getSanitizedSchema(localBusinessSchema),
        }}
      />
      <ContactClient />
    </main>
  );
}
