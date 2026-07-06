import { type Metadata } from "next";
import React from "react";

import { getLegalPageAction } from "@/app/actions/legal";
import { Reveal } from "@/components/animations";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${COMPANY_NAME}`,
  description:
    "Zebotix Terms and Conditions governing services, pricing, IP, and project cancellations.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: `Terms & Conditions | ${COMPANY_NAME}`,
    description:
      "Zebotix Terms and Conditions governing services, pricing, IP, and project cancellations.",
    url: `${SITE_URL}/terms`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Terms & Conditions | ${COMPANY_NAME}`,
    description:
      "Zebotix Terms and Conditions governing services, pricing, IP, and project cancellations.",
  },
};

export default async function Terms() {
  const res = await getLegalPageAction("terms");
  const dbPage = res.success ? res.data : null;

  return (
    <main className="bg-zinc-950 text-zinc-350 min-h-screen pt-32 pb-24">
      <article className="max-w-4xl mx-auto px-6 lg:px-8">
        <header className="mb-12">
          <Reveal>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
              {dbPage?.title || "Terms & Conditions"}
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
                <section id="introduction">
                  <h3 className="text-xl font-bold text-white mb-3">1. Introduction</h3>
                  <p>
                    These Terms and Conditions (“<strong>Terms</strong>”) govern the use of all
                    services, products, and digital assets provided by <strong>Zebotix</strong>{" "}
                    (“Supplier”, “we”, “our”, “us”) to its clients (“Client”, “you”). By engaging
                    our services or accessing our website, you agree to these Terms.
                  </p>
                </section>

                <section id="services">
                  <h3 className="text-xl font-bold text-white mb-3">
                    2. Services &amp; Deliverables
                  </h3>
                  <p>
                    All project scopes, deliverables, and timelines will be outlined in the proposal
                    or Statement of Work (SOW). Any change in scope after approval will require a
                    formal Change Request and may affect pricing and timelines.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Deliverables will be accepted in the form agreed in the SOW (staging URL,
                      repository access, or build artifacts).
                    </li>
                    <li>
                      Delivery dates are estimated and depend on timely client feedback and
                      provision of assets.
                    </li>
                  </ul>
                </section>

                <section id="payment">
                  <h3 className="text-xl font-bold text-white mb-3">3. Payment &amp; Pricing</h3>
                  <p>
                    <strong>Payment Schedule:</strong> 50% upfront, 40% upon staging/design
                    approval, 10% upon final acceptance.
                  </p>
                  <p>
                    <strong>Currency:</strong> All payments in PKR (Pakistani Rupees) unless
                    otherwise stated.
                  </p>
                  <p>
                    <strong>Late Fees:</strong> 2% monthly interest applies on overdue invoices
                    after 15 days.
                  </p>
                </section>

                <section id="ip">
                  <h3 className="text-xl font-bold text-white mb-3">
                    4. Intellectual Property (IP)
                  </h3>
                  <p>
                    Upon full payment, all rights and ownership of deliverables created specifically
                    for the Client transfer to the Client. Zebotix retains ownership of any
                    pre-existing tools, frameworks, or libraries used.
                  </p>
                </section>

                <section id="revisions">
                  <h3 className="text-xl font-bold text-white mb-3">5. Revisions</h3>
                  <p>
                    Projects include limited revisions as agreed. Additional requests altering scope
                    or functionality are billed at standard hourly or fixed rates.
                  </p>
                </section>

                <section id="liability">
                  <h3 className="text-xl font-bold text-white mb-3">6. Liability</h3>
                  <p>
                    Zebotix provides a 30-day bug-fix warranty after launch. Our total liability is
                    capped at the total fees paid for the specific project.
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
