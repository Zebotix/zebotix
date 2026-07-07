"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";

import { BlogCard } from "./BlogCard";

import { Reveal } from "@/components/animations";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { type BlogPost } from "@/generated/prisma/client";

export function BlogListClient({ initialPosts }: Readonly<{ initialPosts: BlogPost[] }>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const categories = useMemo(() => {
    const cats = new Set(initialPosts.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(cats)] as string[];
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialPosts, searchTerm, selectedCategory]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Max 3 for recent
  const recentPosts = filteredPosts.slice(0, 3);

  // Grid shows all blogs
  const postsToPaginate = filteredPosts;

  const isFiltering = searchTerm !== "" || selectedCategory !== "All";

  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil(postsToPaginate.length / ITEMS_PER_PAGE);
  const paginatedPosts = postsToPaginate.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 relative z-20">
        <div className="relative grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search insights..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-zebotix-darkGray border-white/10 text-white placeholder:text-gray-500 rounded-2xl h-14 focus-visible:ring-zebotix-blue shadow-lg"
          />
        </div>
        <div className="w-full md:w-72">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-zebotix-darkGray border-white/10 text-white h-14 rounded-2xl focus:ring-zebotix-blue shadow-lg px-4">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-zebotix-darkGray border-white/10 text-white rounded-xl shadow-2xl">
              {categories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                  className="hover:bg-white/5 focus:bg-white/5 focus:text-white cursor-pointer py-3"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Recent Posts Carousel */}
      {!isFiltering && recentPosts.length > 0 && (
        <div className="mb-16">
          <Reveal>
            <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/5 pb-4">
              Recent Insights
            </h2>
          </Reveal>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative rounded-3xl overflow-hidden shadow-2xl group"
          >
            <CarouselContent>
              {recentPosts.map((post) => (
                <CarouselItem
                  key={post.slug}
                  className="relative w-full h-[500px] md:h-[600px] shrink-0"
                >
                  <Image
                    src={post.image || "/images/hero-section-image.webp"}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0B0F19] via-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10 flex flex-col items-start">
                    {post.category && (
                      <span className="mb-4 text-xs md:text-sm uppercase tracking-widest text-white bg-zebotix-blue/80 px-4 py-1.5 rounded-full font-bold shadow-lg">
                        {post.category}
                      </span>
                    )}
                    <Link href={`/blog/${post.slug}`} className="block w-full">
                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 hover:text-zebotix-blue transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-300 md:text-xl max-w-4xl line-clamp-3 md:line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {recentPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-10 bg-zebotix-blue shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    : "w-3 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Grid Posts */}
      <div>
        {!isFiltering && postsToPaginate.length > 0 && (
          <Reveal>
            <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/5 pb-4">
              All Articles
            </h2>
          </Reveal>
        )}

        {isFiltering && (
          <div className="mb-8 border-b border-white/5 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center">
              Search Results{" "}
              <span className="text-gray-400 font-normal text-lg ml-2">
                ({filteredPosts.length})
              </span>
            </h2>
          </div>
        )}

        {paginatedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {paginatedPosts.map((post, index) => (
                <Reveal key={post.slug} delay={0.1 * index} distance={40}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-16">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 rounded-xl bg-zebotix-darkGray border border-white/10 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
                >
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all ${
                          currentPage === page
                            ? "bg-zebotix-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                            : "text-gray-400 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 rounded-xl bg-zebotix-darkGray border border-white/10 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <Reveal delay={0.2}>
            <div className="text-center py-24 bg-zebotix-darkGray rounded-3xl border border-white/5 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">No results found</h2>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
