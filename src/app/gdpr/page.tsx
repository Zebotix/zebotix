import { type Metadata } from "next";
import React from "react";

import { getLegalPageAction } from "@/app/actions/legal";
import { Reveal } from "@/components/animations";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `GDPR & DPA Compliance | ${COMPANY_NAME}`,
  description: "Zebotix GDPR compliance policy and Data Processing Agreement (DPA) guidelines.",
  alternates: {
    canonical: `${SITE_URL}/gdpr`,
  },
  openGraph: {
    title: `GDPR & DPA Compliance | ${COMPANY_NAME}`,
    description: "Zebotix GDPR compliance policy and Data Processing Agreement (DPA) guidelines.",
    url: `${SITE_URL}/gdpr`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `GDPR & DPA Compliance | ${COMPANY_NAME}`,
    description: "Zebotix GDPR compliance policy and Data Processing Agreement (DPA) guidelines.",
  },
};

export default async function GDPR() {
  const res = await getLegalPageAction("gdpr");
  const dbPage = res.success ? res.data : null;

  return (
    <main className="bg-zinc-950 text-zinc-355 min-h-screen pt-32 pb-24">
      <article className="max-w-4xl mx-auto px-6 lg:px-8">
        <header className="mb-12">
          <Reveal>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
              {dbPage?.title || "GDPR / Data Processing Agreement (DPA)"}
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
                <section id="purpose">
                  <h3 className="text-xl font-bold text-white mb-3">1. Purpose</h3>
                  <p>
                    This Data Processing Agreement (“<strong>DPA</strong>”) outlines how{" "}
                    <strong>Zebotix</strong>, acting as a data processor, handles personal data on
                    behalf of the Client (data controller) in compliance with the EU General Data
                    Protection Regulation (<strong>GDIR</strong>).
                  </p>
                </section>

                <section id="scope">
                  <h3 className="text-xl font-bold text-white mb-3">2. Data Processing Scope</h3>
                  <p>
                    <strong>Data types:</strong> Client names, email addresses, usage data, website
                    content.
                  </p>
                  <p>
                    <strong>Purpose:</strong> Services as described in the contract or SOW.
                  </p>
                </section>

                <section id="processor-resp">
                  <h3 className="text-xl font-bold text-white mb-3">
                    3. Processor Responsibilities
                  </h3>
                  <p>
                    Zebotix will process personal data only under documented instructions, maintain
                    security measures, and notify data breaches within 72 hours.
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
