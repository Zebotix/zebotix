import { Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { getPaginatedTestimonialsAction } from "@/app/actions/testimonials";
import { Reveal } from "@/components/animations";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";

export const metadata: Metadata = {
  title: "Testimonials - What Our Clients Say",
  description: "Read testimonials from startup founders and enterprise leaders who trust Zebotix.",
};

export default async function TestimonialsPage(
  props: Readonly<{
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  }>
) {
  const searchParams = await props.searchParams;
  const pageParam = searchParams?.page;
  const page = pageParam ? Number.parseInt(pageParam as string, 10) : 1;

  if (Number.isNaN(page) || page < 1) {
    notFound();
  }

  const { data: testimonials, meta, success } = await getPaginatedTestimonialsAction(page, 10);

  if (!success || !meta) {
    // Graceful degradation or error page
    return (
      <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-6 text-center text-white">
        <h2>Failed to load testimonials.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 overflow-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 sm:px-8 lg:px-12 relative">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-blue-500 font-black mb-4 block">
              Testimonials
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white tracking-tighter uppercase max-w-4xl mx-auto leading-none">
              Client <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#3b82f6,#60a5fa)]">
                Success Stories
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Hear directly from the founders, visionaries, and technical leaders who have partnered
              with us to build scalable, high-performance software.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12 md:py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {testimonials.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
              No testimonials found on this page.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
              {testimonials.map((t, index) => (
                <Reveal key={t.id} delay={0.1 * (index % 4)} distance={30} className="h-full">
                  <div className="bg-zinc-900/40 p-8 border border-zinc-800 h-full flex flex-col justify-between hover:border-blue-500/35 transition-colors duration-300 rounded-none relative overflow-hidden group select-none">
                    <div>
                      <div
                        className="flex gap-1 mb-6"
                        role="img"
                        aria-label={`Rating: ${t.rating} stars`}
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < t.rating ? "text-blue-500 fill-blue-500" : "text-zinc-800"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-zinc-350 leading-relaxed italic mb-8 text-sm">
                        "{t.content}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-6 border-t border-zinc-850">
                      {t.avatar ? (
                        <div className="relative h-12 w-12 overflow-hidden border border-zinc-850 rounded-none bg-zinc-950">
                          <Image
                            src={t.avatar}
                            alt={t.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-12 bg-zinc-950 border border-zinc-850 flex items-center justify-center font-black text-white text-xs rounded-none">
                          {t.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="text-white font-black text-sm uppercase tracking-tight mb-1">
                          {t.name}
                        </h3>
                        <p className="text-zinc-550 text-[10px] font-black uppercase tracking-wider">
                          {t.role} {t.company ? `at ${t.company}` : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* Pagination */}
          {meta.totalPages > 1 && (
            <Reveal delay={0.2} distance={20}>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={meta.hasPrevPage ? `/testimonials?page=${meta.currentPage - 1}` : "#"}
                      aria-disabled={!meta.hasPrevPage}
                      className={meta.hasPrevPage ? "" : "pointer-events-none opacity-50"}
                    />
                  </PaginationItem>

                  {[...Array(meta.totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    // Show current, first, last, and pages adjacent to current
                    const isVisible =
                      pageNum === 1 ||
                      pageNum === meta.totalPages ||
                      Math.abs(pageNum - meta.currentPage) <= 1;

                    if (!isVisible) {
                      // Show ellipsis if it's right after or before the visible range
                      if (pageNum === 2 || pageNum === meta.totalPages - 1) {
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    }

                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href={`/testimonials?page=${pageNum}`}
                          isActive={pageNum === meta.currentPage}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href={meta.hasNextPage ? `/testimonials?page=${meta.currentPage + 1}` : "#"}
                      aria-disabled={!meta.hasNextPage}
                      className={meta.hasNextPage ? "" : "pointer-events-none opacity-50"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}
