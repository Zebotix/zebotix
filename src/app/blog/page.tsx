import { type Metadata } from "next";

import { Reveal } from "@/components/animations";
import { BlogListClient } from "@/components/BlogListClient";
import { getAllPosts } from "@/lib/blog";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Blog | ${COMPANY_NAME}`,
  description:
    "Insights, tutorials, and updates from the Zebotix team on AI, web development, and digital strategy.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog | ${COMPANY_NAME}`,
    description:
      "Insights, tutorials, and updates from the Zebotix team on AI, web development, and digital strategy.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [{ url: "/Zebotix.webp", width: 1200, height: 630, alt: `${COMPANY_NAME} Blog` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${COMPANY_NAME}`,
    description:
      "Insights, tutorials, and updates from the Zebotix team on AI, web development, and digital strategy.",
    images: ["/Zebotix.webp"],
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="pt-32 pb-24">
      <div className="section-container">
        <header className="mb-16">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-white">
              Latest{" "}
              <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Insights
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-gray-400 text-xl max-w-2xl">
              Deep dives into technology, product strategy, and the future of digital business.
            </p>
          </Reveal>
        </header>

        <BlogListClient initialPosts={posts} />
      </div>
    </div>
  );
}
