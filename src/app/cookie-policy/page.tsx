import { type Metadata } from "next";
import React from "react";

import { getLegalPageAction } from "@/app/actions/legal";
import { Reveal } from "@/components/animations";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Cookie Policy | ${COMPANY_NAME}`,
  description:
    "Learn how Zebotix uses cookies and tracking technologies to optimize your experience.",
  alternates: {
    canonical: `${SITE_URL}/cookie-policy`,
  },
  openGraph: {
    title: `Cookie Policy | ${COMPANY_NAME}`,
    description:
      "Learn how Zebotix uses cookies and tracking technologies to optimize your experience.",
    url: `${SITE_URL}/cookie-policy`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Cookie Policy | ${COMPANY_NAME}`,
    description:
      "Learn how Zebotix uses cookies and tracking technologies to optimize your experience.",
  },
};

export default async function CookiePolicy() {
  const res = await getLegalPageAction("cookie-policy");
  const dbPage = res.success ? res.data : null;

  return (
    <main className="bg-zinc-950 text-zinc-355 min-h-screen pt-32 pb-24">
      <article className="max-w-4xl mx-auto px-6 lg:px-8">
        <header className="mb-12">
          <Reveal>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
              {dbPage?.title || "Cookie Policy"}
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
                <section id="what-are-cookies">
                  <h3 className="text-xl font-bold text-white mb-3">1. What Are Cookies?</h3>
                  <p>
                    Cookies are small text files placed on your device by websites you visit. They
                    help the site remember your preferences, support essential functionality, and
                    provide analytics about how the site is used.
                  </p>
                </section>

                <section id="how-we-use">
                  <h3 className="text-xl font-bold text-white mb-3">2. How We Use Cookies</h3>
                  <p>We use cookies for several purposes, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Essential cookies:</strong> Required for core site functionality
                      (sessions, security, load balancing).
                    </li>
                    <li>
                      <strong>Analytics cookies:</strong> Used to understand visitor behaviour and
                      improve performance.
                    </li>
                    <li>
                      <strong>Preference cookies:</strong> Remember your choices such as language
                      and theme selection.
                    </li>
                  </ul>
                </section>

                <section id="managing">
                  <h3 className="text-xl font-bold text-white mb-3">3. Managing Cookies</h3>
                  <p>
                    When you first visit our site, you'll see a cookie banner that allows you to
                    accept or reject non-essential cookies. You can change your preferences at any
                    time.
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
