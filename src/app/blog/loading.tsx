import React from 'react';

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-zebotix-blue border-t-transparent rounded-full animate-spin" />
        <p className="text-zinc-500 font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
