import { type Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getBlogsAction } from "@/app/actions/blogs";
import { Reveal } from "@/components/animations";
import { getPostBySlug } from "@/lib/blog";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  getSanitizedSchema,
} from "@/lib/schemas";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return {
    title: `${post.title} | Blog | ${COMPANY_NAME}`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Blog | ${COMPANY_NAME}`,
      description: post.excerpt,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: COMPANY_NAME,
      images: post.image
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Blog | ${COMPANY_NAME}`,
      description: post.excerpt,
      images: post.image ? [post.image] : [`${SITE_URL}/og-image.png`],
    },
  };
}

export default async function BlogPostPage({ params }: Readonly<PostPageProps>) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blogPostingSchema = generateBlogPostingSchema(
    post.title,
    post.excerpt,
    post.image || `${SITE_URL}/og-image.png`,
    new Date(post.publishedAt || post.createdAt),
    post.updatedAt ? new Date(post.updatedAt) : undefined,
    slug
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ]);

  return (
    <article className="pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getSanitizedSchema(blogPostingSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getSanitizedSchema(breadcrumbSchema),
        }}
      />
      <div className="section-container max-w-4xl">
        <header className="mb-12">
          <Reveal>
            <div className="flex gap-4 mb-6">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs uppercase tracking-widest text-zebotix-blue font-black bg-zebotix-blue/10 px-3 py-1 rounded-full border border-zebotix-blue/20"
                  aria-label={`Blog tag: ${tag}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-black mb-8 text-white leading-tight">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex items-center gap-4 text-gray-400">
              <span className="font-bold text-white">{post.author}</span>
              <span>•</span>
              <time dateTime={new Date(post.publishedAt || post.createdAt).toISOString()}>
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString(undefined, {
                  dateStyle: "long",
                })}
              </time>
            </div>
          </Reveal>
        </header>

        <Reveal delay={0.3} distance={50} className="mb-16">
          <div className="relative h-100 md:h-150 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
            <Image
              src={post.image || "/images/hero-section-image.webp"}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        </Reveal>

        <Reveal delay={0.4} className="prose prose-invert prose-blue max-w-none">
          <p className="text-xl text-zinc-300 max-w-3xl mb-8 leading-relaxed font-light">
            {post.excerpt}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="text-gray-300 text-lg leading-relaxed space-y-6"
          />
        </Reveal>

        <footer className="mt-24 pt-12 border-t border-white/5">
          <Reveal>
            <div className="bg-zebotix-darkGray p-10 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 bg-zebotix-blue rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-white font-black text-3xl">Z</span>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-2">About Zebotix</h3>
                <p className="text-gray-400 mb-0">
                  We are a team of technology architects and creative designers building the future
                  of digital products.
                </p>
              </div>
            </div>
          </Reveal>
        </footer>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  try {
    const { data: blogs, success } = await getBlogsAction();
    if (!success || !blogs) {
      return [];
    }
    return blogs.map((s) => ({ slug: s.slug || "" }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
