import React from "react";
import { LAYOUTS } from "../constants";

export default function PhotoPicker({ shots, selectedLayoutId, selectedIndices, onToggle, onLayoutChange, onContinue }) {
  const layout = LAYOUTS.find((l) => l.id === selectedLayoutId) || LAYOUTS[0];
  const slotsNeeded = layout.slots;
  const isFull = selectedIndices.length >= slotsNeeded;
  const canContinue = selectedIndices.length === slotsNeeded;

  return (
    <div className="min-h-screen bg-[#f5f2eb] px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-baseline justify-between mb-1">
          <h1 className="font-mono text-[#16151A] text-sm tracking-widest uppercase">
            Pick your favorites
          </h1>
          <span className="font-mono text-xs text-[#16151A]/50">
            {selectedIndices.length} / {slotsNeeded} selected
          </span>
        </div>
        <p className="text-[#16151A]/60 font-sans text-sm mb-6">
          Tap photos in the order you want them to appear. Switch layouts
          below if you want a different shot count.
        </p>

        {/* Layout switcher */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-1 px-1">
          {LAYOUTS.map((l) => (
            <button
              key={l.id}
              onClick={() => onLayoutChange(l.id)}
              className={`flex-shrink-0 font-sans text-xs font-medium px-3.5 py-2 rounded-full border transition-colors whitespace-nowrap ${
                l.id === selectedLayoutId
                  ? "bg-[#16151A] text-[#f5f2eb] border-[#16151A]"
                  : "bg-transparent text-[#16151A]/70 border-[#16151A]/15 hover:border-[#16151A]/40"
              }`}
            >
              {l.name} · {l.slots}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
          {shots.map((shot, i) => {
            const seq = selectedIndices.indexOf(i);
            const isSelected = seq !== -1;
            const disabled = !isSelected && isFull;
            return (
              <button
                key={i}
                onClick={() => !disabled && onToggle(i)}
                disabled={disabled}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden ring-2 transition-all ${
                  isSelected
                    ? "ring-[#16151A] scale-[0.97]"
                    : disabled
                    ? "ring-transparent opacity-40"
                    : "ring-transparent hover:ring-[#16151A]/30"
                }`}
              >
                <img src={shot} alt={`Shot ${i + 1}`} className="w-full h-full object-cover" />
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[#16151A] text-[#f5f2eb] font-mono text-xs font-bold flex items-center justify-center">
                    {seq + 1}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={onContinue}
          disabled={!canContinue}
          className={`w-full sm:w-auto font-sans font-semibold text-sm px-8 py-3.5 rounded-full transition-colors ${
            canContinue
              ? "bg-[#16151A] text-[#f5f2eb] hover:bg-[#2a2830]"
              : "bg-[#16151A]/10 text-[#16151A]/35 cursor-not-allowed"
          }`}
        >
          Continue to styling →
        </button>
      </div>
    </div>
  );
}
