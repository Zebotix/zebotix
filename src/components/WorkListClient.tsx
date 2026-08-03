"use client";

import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

import { Reveal } from "@/components/animations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { WorkCard } from "@/components/WorkCard";
import { type Portfolio } from "@/generated/prisma/client";

export function WorkListClient({ initialWorks }: Readonly<{ initialWorks: Portfolio[] }>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Extract unique industries for filter
  const industries = useMemo(() => {
    const ind = new Set<string>();
    initialWorks.forEach((work) => {
      if (work.industry) ind.add(work.industry);
    });
    return ["All", ...Array.from(ind)];
  }, [initialWorks]);

  // Filter works
  const filteredWorks = useMemo(() => {
    return initialWorks.filter((work) => {
      const matchesSearch =
        work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        work.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
        work.client?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = selectedIndustry === "All" || work.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [initialWorks, searchTerm, selectedIndustry]);

  const isFiltering = searchTerm !== "" || selectedIndustry !== "All";

  // Featured Work (for hero section)
  // We'll take the first isFeatured work, or just the first one if none are marked featured
  const featuredWork = useMemo(() => {
    return initialWorks.find((w) => w.isFeatured) || initialWorks[0];
  }, [initialWorks]);

  const worksToPaginate = filteredWorks;

  // Pagination logic
  const totalPages = Math.ceil(worksToPaginate.length / ITEMS_PER_PAGE);
  const paginatedWorks = worksToPaginate.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full">
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-16 bg-zinc-900/50 p-4 border border-zinc-800 rounded-2xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search case studies..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <SlidersHorizontal className="h-5 w-5 text-zinc-500 hidden md:block" />
          <Select
            value={selectedIndustry}
            onValueChange={(val) => {
              setSelectedIndustry(val);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full md:w-50 bg-zinc-950 border-zinc-800 text-zinc-300">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-950 border-zinc-800">
              {industries.map((ind) => (
                <SelectItem
                  key={ind}
                  value={ind}
                  className="text-zinc-300 hover:bg-zinc-900 hover:text-white"
                >
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Featured Hero Case Study (only if not filtering and page 1) */}
      {!isFiltering && featuredWork && (
        <div className="mb-24">
          <Reveal>
            <h2 className="text-xl font-bold text-white mb-8 flex items-center">
              <div className="w-8 h-[2px] bg-zebotix-blue mr-4" />
              Featured Case Study
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="group relative bg-zinc-900/40 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-500 flex flex-col lg:flex-row min-h-[450px]">
              {/* Image side */}
              <div className="relative w-full lg:w-3/5 min-h-[300px] lg:min-h-full overflow-hidden">
                <Image
                  src={featuredWork.gallery?.[0] || "/images/hero-section-image.webp"}
                  alt={featuredWork.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-r from-zinc-950/80 via-transparent to-transparent lg:hidden" />
              </div>

              {/* Content side */}
              <div className="relative w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center bg-zinc-950/90 lg:bg-zinc-950/40 backdrop-blur-sm lg:-ml-12 z-10 my-auto lg:my-8 lg:rounded-2xl lg:border border-zinc-800 lg:mr-8 shadow-2xl">
                {featuredWork.industry && (
                  <span className="text-[10px] uppercase tracking-widest text-zebotix-blue font-bold mb-4 block">
                    {featuredWork.industry}
                  </span>
                )}
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
                  <Link
                    href={`/work/${featuredWork.slug}`}
                    className="before:absolute before:inset-0"
                  >
                    {featuredWork.title}
                  </Link>
                </h3>
                <div 
                  className="text-zinc-400 mb-8 line-clamp-4 leading-relaxed font-light [&>p]:m-0"
                  dangerouslySetInnerHTML={{ __html: featuredWork.problem || "" }}
                />
                <div className="mt-auto flex items-center text-white font-bold group-hover:text-zebotix-blue transition-colors w-fit">
                  Explore Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      )}

      {/* Grid Posts */}
      <div>
        {!isFiltering && worksToPaginate.length > 0 && (
          <Reveal>
            <h2 className="text-3xl font-bold text-white mb-10 flex items-center">
              <div className="w-8 h-[2px] bg-zinc-700 mr-4" />
              More Work
            </h2>
          </Reveal>
        )}

        {isFiltering && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white flex items-baseline">
              Search Results{" "}
              <span className="text-zinc-500 font-normal text-lg ml-2">
                ({filteredWorks.length})
              </span>
            </h2>
          </div>
        )}

        {paginatedWorks.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/20 border border-zinc-800 rounded-2xl">
            <p className="text-zinc-400 text-lg">No case studies found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedIndustry("All");
              }}
              className="mt-4 text-zebotix-blue hover:text-blue-400 transition-colors font-semibold"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedWorks.map((work, index) => (
              <Reveal key={work.id} delay={0.1 * (index % 3)}>
                <WorkCard work={work} />
              </Reveal>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16 pt-8 border-t border-zinc-800/50">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-full border border-zinc-800 bg-zinc-900/50 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-zinc-400 font-medium">
              Page <span className="text-white">{currentPage}</span> of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full border border-zinc-800 bg-zinc-900/50 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
