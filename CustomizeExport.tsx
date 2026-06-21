import React, { useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import PhotoStrip from "./PhotoStrip";
import { BACKDROPS, FILTERS, LAYOUTS, MAX_CAPTION_LENGTH, DEFAULT_CAPTION } from "./constants.js";

export default function CustomizeExport({ photos, layoutId, onSave, onStartOver }) {
  const layout = LAYOUTS.find((l) => l.id === layoutId) || LAYOUTS[0];
  const [backdropId, setBackdropId] = useState(BACKDROPS[0].id);
  const [filterId, setFilterId] = useState(FILTERS[0].id);
  const [caption, setCaption] = useState("");
  const [downloading, setDownloading] = useState(false);
  const stripRef = useRef(null);

  const backdrop = BACKDROPS.find((b) => b.id === backdropId);
  const filter = FILTERS.find((f) => f.id === filterId);

  async function handleDownload() {
    if (!stripRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toJpeg(stripRef.current, { quality: 0.95, pixelRatio: 3 });
      const link = document.createElement("a");
      link.download = `vibebooth-${Date.now()}.jpg`;
      link.href = dataUrl;
      link.click();

      onSave({
        id: Date.now(),
        date: new Date().toISOString(),
        photos,
        layoutId,
        backdropId,
        filterId,
        caption: caption.trim() || DEFAULT_CAPTION,
      });
    } catch (err) {
      console.error("Export failed:", err);
      alert("Couldn't export the image — try again.");
    } finally {
      setDownloading(false);
    }
  }

  function handlePrint() {
    window.print();
    onSave({
      id: Date.now(),
      date: new Date().toISOString(),
      photos,
      layoutId,
      backdropId,
      filterId,
      caption: caption.trim() || DEFAULT_CAPTION,
    });
  }

  return (
    <div className="min-h-screen bg-[#f5f2eb] px-4 py-8">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_340px] gap-8">
        {/* Preview */}
        <div className="flex flex-col items-center">
          <div className="font-mono text-[#16151A]/50 text-xs tracking-widest uppercase mb-4 self-start">
            Preview
          </div>
          <div className="bg-white/40 rounded-3xl p-6 flex items-center justify-center w-full">
            <PhotoStrip
              ref={stripRef}
              photos={photos}
              backdrop={backdrop}
              filter={filter}
              caption={caption}
              layoutShape={layout.shape}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-7">
          <div>
            <button
              onClick={onStartOver}
              className="font-mono text-xs text-[#16151A]/40 tracking-widest uppercase hover:text-[#16151A] transition-colors"
            >
              ← Start over
            </button>
          </div>

          {/* Backdrop */}
          <div>
            <div className="font-sans text-xs font-semibold text-[#16151A]/70 uppercase tracking-wide mb-2.5">
              Backdrop
            </div>
            <div className="grid grid-cols-6 gap-2">
              {BACKDROPS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBackdropId(b.id)}
                  title={b.name}
                  className={`aspect-square rounded-full ring-2 transition-all ${
                    b.id === backdropId ? "ring-[#16151A] scale-95" : "ring-transparent hover:ring-[#16151A]/30"
                  }`}
                  style={b.type === "gradient" ? { backgroundImage: b.value } : { backgroundColor: b.value }}
                />
              ))}
            </div>
            <div className="font-sans text-xs text-[#16151A]/50 mt-2">{backdrop.name}</div>
          </div>

          {/* Filter */}
          <div>
            <div className="font-sans text-xs font-semibold text-[#16151A]/70 uppercase tracking-wide mb-2.5">
              Filter
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterId(f.id)}
                  className={`font-sans text-xs font-medium px-3.5 py-2 rounded-full border transition-colors ${
                    f.id === filterId
                      ? "bg-[#16151A] text-[#f5f2eb] border-[#16151A]"
                      : "bg-transparent text-[#16151A]/70 border-[#16151A]/15 hover:border-[#16151A]/40"
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Caption */}
          <div>
            <div className="font-sans text-xs font-semibold text-[#16151A]/70 uppercase tracking-wide mb-2.5">
              Footer text
            </div>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value.slice(0, MAX_CAPTION_LENGTH))}
              placeholder={DEFAULT_CAPTION}
              className="w-full font-mono text-sm bg-white border border-[#16151A]/15 rounded-lg px-3.5 py-2.5 text-[#16151A] placeholder:text-[#16151A]/30 focus:outline-none focus:ring-2 focus:ring-[#16151A]/30"
            />
            <div className="font-sans text-xs text-[#16151A]/40 mt-1.5 text-right">
              {caption.length} / {MAX_CAPTION_LENGTH}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5 mt-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="font-sans font-semibold text-sm bg-[#16151A] text-[#f5f2eb] px-6 py-3.5 rounded-full hover:bg-[#2a2830] transition-colors disabled:opacity-50"
            >
              {downloading ? "Exporting…" : "Download JPG"}
            </button>
            <button
              onClick={handlePrint}
              className="font-sans font-semibold text-sm bg-transparent text-[#16151A] border border-[#16151A]/20 px-6 py-3.5 rounded-full hover:border-[#16151A]/50 transition-colors"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
