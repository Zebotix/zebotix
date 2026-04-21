import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIOS, COMPANY_NAME } from '@/lib/constants';
import { Reveal } from '@/components/animations';
import { ArrowLeft, CheckCircle2, Target, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PORTFOLIOS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = PORTFOLIOS.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Case Study | ${COMPANY_NAME}`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = PORTFOLIOS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24">
      <div className="section-container">
        <Reveal>
          <Link href="/#portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group">
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
        </Reveal>

        <header className="mb-16">
          <Reveal>
            <div className="flex gap-4 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs uppercase tracking-widest text-zebotix-blue font-black bg-zebotix-blue/10 px-3 py-1 rounded-full border border-zebotix-blue/20">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-7xl font-black mb-8 text-white leading-tight">
              {project.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed">
              {project.summary}
            </p>
          </Reveal>
        </header>

        <Reveal delay={0.3} distance={50} className="mb-24">
          <div className="relative h-[400px] md:h-[700px] rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          <div className="lg:col-span-2 space-y-16">
            <Reveal>
              <section>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Rocket className="text-zebotix-blue h-8 w-8" />
                  Project Overview
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {project.description}
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.1}>
              <section>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Target className="text-zebotix-blue h-8 w-8" />
                  The Challenge
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {project.challenges}
                </p>
              </section>
            </Reveal>
          </div>

          <aside className="lg:col-span-1">
            <Reveal delay={0.2}>
              <div className="bg-zebotix-darkGray p-10 rounded-[32px] border border-white/5 shadow-2xl sticky top-32">
                <h3 className="text-2xl font-bold text-white mb-8">Results & Impact</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-zebotix-blue shrink-0 mt-1" />
                    <p className="text-gray-300">{project.results}</p>
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t border-white/5">
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6">Tech Stack</h4>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 bg-white/5 rounded-xl text-xs font-bold text-white border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Button asChild size="lg" className="w-full mt-10 bg-zebotix-blue hover:bg-blue-600 h-14 text-lg font-bold rounded-2xl">
                  <Link href="/contact">Start a Similar Project</Link>
                </Button>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </article>
  );
}
