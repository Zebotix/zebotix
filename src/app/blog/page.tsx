import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/animations";
import { type BlogPost } from "@/generated/prisma/client";
import { getAllPosts } from "@/lib/blog";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Blog | ${COMPANY_NAME}`,
  description:
    "Insights, tutorials, and updates from the Zebotix team on AI, web development, and digital strategy.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
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

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post: BlogPost, index: number) => (
              <Reveal key={post.slug} delay={0.1 * index} distance={40}>
                <article className="group bg-zebotix-darkGray rounded-3xl overflow-hidden border border-white/5 hover:border-zebotix-blue/40 transition-all duration-500 shadow-2xl h-full flex flex-col">
                  <Link href={`/blog/${post.slug}`} className="block relative h-64 overflow-hidden">
                    <Image
                      src={
                        post.image ||
                        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </Link>
                  <div className="p-8 grow flex flex-col">
                    <div className="flex gap-4 mb-4">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-widest text-zebotix-blue font-bold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-zebotix-blue transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                      <span className="text-sm text-gray-500">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString()
                          : "Draft"}
                      </span>
                      <span className="text-sm font-bold text-white group-hover:text-zebotix-blue transition-colors">
                        Read More →
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={0.4}>
            <div className="text-center py-24 bg-zebotix-darkGray rounded-3xl border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-4">No posts yet</h2>
              <p className="text-gray-400">We're working on some great content. Check back soon!</p>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
