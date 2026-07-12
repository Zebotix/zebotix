"use client";

import { useState } from "react";
import { toast } from "sonner";

import { generateAutoBlogAction } from "@/app/actions/blogs";

export default function GenerateAutoBlogButton() {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (
      confirm("Are you sure you want to generate a new AI blog post? This may take up to a minute.")
    ) {
      setLoading(true);
      try {
        const result = await generateAutoBlogAction();
        if (result.success) {
          toast(`Successfully generated blog: ${result.data?.title}`);
        } else {
          toast(`Failed to generate blog: ${result.error}`);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        toast(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className={`bg-zinc-800 text-white font-semibold py-3 px-6 hover:bg-zinc-700 transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {loading ? "Generating..." : "Auto-Generate AI Blog"}
    </button>
  );
}
