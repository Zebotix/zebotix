import { type Metadata } from "next";
import React from "react";

import { getLegalPageAction } from "@/app/actions/legal";
import { Reveal } from "@/components/animations";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy Policy | ${COMPANY_NAME}`,
  description:
    "Zebotix values your privacy. Learn how we collect, use, and protect your information.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: `Privacy Policy | ${COMPANY_NAME}`,
    description:
      "Zebotix values your privacy. Learn how we collect, use, and protect your information.",
    url: `${SITE_URL}/privacy`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Privacy Policy | ${COMPANY_NAME}`,
    description:
      "Zebotix values your privacy. Learn how we collect, use, and protect your information.",
  },
};

export default async function PrivacyPolicy() {
  const res = await getLegalPageAction("privacy");
  const dbPage = res.success ? res.data : null;

  return (
    <main className="bg-zinc-950 text-zinc-350 min-h-screen pt-32 pb-24">
      <article className="max-w-4xl mx-auto px-6 lg:px-8">
        <header className="mb-12">
          <Reveal>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
              {dbPage?.title || "Privacy Policy"}
            </h1>
          </Reveal>
          {dbPage?.updatedAt && (
            <Reveal delay={0.1}>
              <p className="text-sm text-zinc-550">
                Last updated:{" "}
                <strong>
                  {new Date(dbPage.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </strong>
              </p>
            </Reveal>
          )}
        </header>

        <Reveal delay={0.2}>
          <div className="prose prose-invert max-w-none text-zinc-400 text-base leading-relaxed space-y-6">
            {dbPage ? (
              <div dangerouslySetInnerHTML={{ __html: dbPage.content }} />
            ) : (
              <>
                <section id="overview">
                  <h2 className="text-2xl font-black text-white mb-3">1. Overview</h2>
                  <p>
                    Zebotix values your privacy. This policy explains how we collect, use, and
                    protect your information when you visit our website or use our services.
                  </p>
                </section>

                <section id="information-we-collect">
                  <h2 className="text-2xl font-black text-white mb-3">2. Information We Collect</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Contact details (name, email, phone)</li>
                    <li>Business information (company name, project details)</li>
                    <li>Technical data (cookies, IP address, browser type)</li>
                    <li>
                      Payment details (processed securely via Stripe, PayPal, or other PCI-compliant
                      providers — we do not store card numbers)
                    </li>
                  </ul>
                </section>

                <section id="how-we-use-information">
                  <h2 className="text-2xl font-black text-white mb-3">3. How We Use Information</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To communicate and deliver requested services</li>
                    <li>To process payments and issue invoices</li>
                    <li>To improve user experience and site performance</li>
                    <li>To comply with legal or tax obligations</li>
                  </ul>
                </section>

                <section id="data-protection">
                  <h2 className="text-2xl font-black text-white mb-3">4. Data Protection</h2>
                  <p>
                    We apply secure hosting, HTTPS encryption, and limited access control. Personal
                    data is stored only as long as necessary and deleted upon written request.
                  </p>
                </section>

                <section id="sharing-information">
                  <h2 className="text-2xl font-black text-white mb-3">5. Sharing Information</h2>
                  <p>
                    We do not sell or trade personal data. Data may be shared only with trusted
                    vendors or sub-processors (hosting, email, analytics) under strict
                    confidentiality, or with legal authorities when required by law.
                  </p>
                </section>

                <section id="your-rights">
                  <h2 className="text-2xl font-black text-white mb-3">
                    6. Your Rights (GDPR/EU Clients)
                  </h2>
                  <p>
                    You may request access, correction, or deletion of your personal data by
                    contacting us at{" "}
                    <a href="mailto:zebotix@gmail.com" className="underline text-blue-500">
                      zebotix@gmail.com
                    </a>
                    . We respond within 30 days.
                  </p>
                </section>
              </>
            )}
          </div>
        </Reveal>
      </article>
    </main>
  );
}
