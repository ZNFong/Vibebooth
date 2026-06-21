import React, { forwardRef } from "react";
import { DEFAULT_CAPTION } from "../constants";

const PhotoStrip = forwardRef(function PhotoStrip(
  { photos, backdrop, filter, caption, layoutShape },
  ref
) {
  const bgStyle =
    backdrop.type === "gradient" ? { backgroundImage: backdrop.value } : { backgroundColor: backdrop.value };
  const filterStyle = { filter: filter.css };
  const text = caption?.trim() ? caption.trim() : DEFAULT_CAPTION;
  const textColor = backdrop.textOn;

  const Img = ({ src, className = "", style = {} }) => (
    <img src={src} alt="" className={`object-cover w-full h-full ${className}`} style={{ ...filterStyle, ...style }} draggable={false} />
  );

  function renderBody() {
    switch (layoutShape) {
      case "strip":
        return (
          <div className="flex flex-col gap-3 p-4">
            {photos.map((p, i) => (
              <div key={i} className="rounded-lg overflow-hidden aspect-[4/3]">
                <Img src={p} />
              </div>
            ))}
          </div>
        );

      case "grid2x2":
        return (
          <div className="grid grid-cols-2 gap-3 p-4">
            {photos.map((p, i) => (
              <div key={i} className="rounded-lg overflow-hidden aspect-square">
                <Img src={p} />
              </div>
            ))}
          </div>
        );

      case "polaroid":
        return (
          <div className="p-5">
            <div className="bg-white p-3 pb-10 rounded-sm shadow-sm">
              <div className="aspect-square overflow-hidden rounded-[2px]">
                <Img src={photos[0]} />
              </div>
            </div>
          </div>
        );

      case "filmSlide":
        return (
          <div className="flex flex-col gap-3 p-4">
            <div className="rounded-lg overflow-hidden aspect-[16/10]">
              <Img src={photos[0]} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg overflow-hidden aspect-square">
                <Img src={photos[1]} />
              </div>
              <div className="rounded-lg overflow-hidden aspect-square">
                <Img src={photos[2]} />
              </div>
            </div>
          </div>
        );

      case "cinema":
        return (
          <div className="flex flex-col gap-2.5 p-4">
            {photos.map((p, i) => (
              <div key={i} className="rounded-md overflow-hidden aspect-[16/7] ring-1 ring-black/10">
                <Img src={p} />
              </div>
            ))}
          </div>
        );

      case "heartGrid":
        return (
          <div className="grid grid-cols-2 gap-4 p-5">
            {photos.map((p, i) => (
              <div
                key={i}
                className="overflow-hidden aspect-square"
                style={{ clipPath: "ellipse(50% 50% at 50% 50%)" }}
              >
                <Img src={p} />
              </div>
            ))}
          </div>
        );

      case "fashionTrio":
        return (
          <div className="flex gap-2 p-4">
            {photos.map((p, i) => (
              <div key={i} className="flex-1 rounded-lg overflow-hidden aspect-[3/5]">
                <Img src={p} />
              </div>
            ))}
          </div>
        );

      case "scrapbook": {
        const rotations = [-4, 3, -5, 4];
        return (
          <div className="grid grid-cols-2 gap-6 p-6">
            {photos.map((p, i) => (
              <div
                key={i}
                className="rounded-sm overflow-hidden aspect-square bg-white p-1.5 shadow-md"
                style={{ transform: `rotate(${rotations[i % rotations.length]}deg)` }}
              >
                <div className="w-full h-full overflow-hidden">
                  <Img src={p} />
                </div>
              </div>
            ))}
          </div>
        );
      }

      default:
        return null;
    }
  }

  return (
    <div
      ref={ref}
      id="print-strip"
      className="w-full max-w-xs mx-auto rounded-2xl overflow-hidden"
      style={bgStyle}
    >
      {renderBody()}
      <div className="pb-5 pt-1 text-center">
        <span
          className="font-mono text-xs tracking-[0.25em] uppercase"
          style={{ color: textColor, opacity: 0.85 }}
        >
          {text}
        </span>
      </div>
    </div>
  );
});

export default PhotoStrip;
