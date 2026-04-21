import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug } from '@/lib/blog';
import { Reveal } from '@/components/animations';
import { COMPANY_NAME } from '@/lib/constants';

export const dynamic = 'force-dynamic';

interface PostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Blog | ${COMPANY_NAME}`,
    description: post.summary,
    openGraph: {
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24">
      <div className="section-container max-w-4xl">
        <header className="mb-12">
          <Reveal>
            <div className="flex gap-4 mb-6">
              {post.tags.map((tag: string) => (
                <span key={tag} className="text-xs uppercase tracking-widest text-zebotix-blue font-black bg-zebotix-blue/10 px-3 py-1 rounded-full border border-zebotix-blue/20">
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
              <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
            </div>
          </Reveal>
        </header>

        <Reveal delay={0.3} distance={50} className="mb-16">
          <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
            <Image
              src={post.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </Reveal>

        <Reveal delay={0.4} className="prose prose-invert prose-blue max-w-none">
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
                  We are a team of technology architects and creative designers building the future of digital products.
                </p>
              </div>
            </div>
          </Reveal>
        </footer>
      </div>
    </article>
  );
}
