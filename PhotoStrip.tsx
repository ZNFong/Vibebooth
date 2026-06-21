import React, { forwardRef } from 'react';

interface PhotoStripProps {
  photos: string[];
  backdrop: { id: string; value: string; type: string; name: string };
  filter: { id: string; class: string };
  caption: string;
  layoutShape: string;
}

const PhotoStrip = forwardRef<HTMLDivElement, PhotoStripProps>(
  ({ photos, backdrop, filter, caption, layoutShape }, ref) => {
    
    const containerStyle = backdrop.type === 'gradient' 
      ? { backgroundImage: backdrop.value } 
      : { backgroundColor: backdrop.value };

    const getLayoutClasses = () => {
      switch (layoutShape) {
        case 'grid': return 'grid grid-cols-2 gap-3 p-4';
        case 'polaroid': return 'flex flex-col gap-2 p-5 pb-8';
        case 'slide': return 'grid grid-cols-2 gap-3 p-4 pt-6';
        case 'cinema': return 'flex flex-row gap-3 p-4 overflow-x-hidden';
        case 'trio': return 'grid grid-cols-3 gap-2 p-4';
        default: return 'flex flex-col gap-4 p-4'; // vertical strip
      }
    };

    return (
      <div 
        ref={ref}
        style={containerStyle}
        className={`w-[320px] shadow-2xl transition-all duration-300 rounded-lg flex flex-col justify-between select-none ${
          layoutShape === 'cinema' ? 'w-[680px]' : 'w-[320px]'
        }`}
      >
        <div className={getLayoutClasses()}>
          {photos.map((src, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden bg-zinc-100 shadow-sm border border-black/5 ${
                layoutShape === 'polaroid' ? 'aspect-square rounded-sm' : 'aspect-[4/3] rounded-md'
              } ${layoutShape === 'slide' && index === 0 ? 'col-span-2 aspect-[16/9]' : ''}`}
            >
              <img 
                src={src} 
                alt="" 
                className={`w-full h-full object-cover select-none pointer-events-none ${filter.class}`}
              />
            </div>
          ))}
        </div>

        <div className="w-full text-center py-5 font-mono text-xs tracking-wider border-t border-black/5 mix-blend-difference text-white uppercase">
          {caption || "VIBEBOOTH MEMORY"}
        </div>
      </div>
    );
  }
);

PhotoStrip.displayName = 'PhotoStrip';
export default PhotoStrip;
