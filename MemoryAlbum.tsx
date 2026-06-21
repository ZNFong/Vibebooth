import React from "react";
import PhotoStrip from "./PhotoStrip";
import { BACKDROPS, FILTERS, LAYOUTS } from "../constants";

export default function MemoryAlbum({ albums, onDelete }) {
  if (!albums || albums.length === 0) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 pb-16">
      <div className="font-mono text-[#16151A]/50 text-xs tracking-widest uppercase mb-4">
        Memory album
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {albums
          .slice()
          .reverse()
          .map((a) => {
            const layout = LAYOUTS.find((l) => l.id === a.layoutId) || LAYOUTS[0];
            const backdrop = BACKDROPS.find((b) => b.id === a.backdropId) || BACKDROPS[0];
            const filter = FILTERS.find((f) => f.id === a.filterId) || FILTERS[0];
            return (
              <div key={a.id} className="relative group">
                <div className="scale-100 origin-top">
                  <PhotoStrip
                    photos={a.photos}
                    backdrop={backdrop}
                    filter={filter}
                    caption={a.caption}
                    layoutShape={layout.shape}
                  />
                </div>
                <div className="font-mono text-[10px] text-[#16151A]/35 text-center mt-1.5">
                  {new Date(a.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </div>
                <button
                  onClick={() => onDelete(a.id)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  aria-label="Delete from album"
                >
                  ✕
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
