export const MAX_CAPTION_LENGTH = 35;
export const DEFAULT_CAPTION = "VIBEBOOTH MEMORY";

export const LAYOUTS = [
  { id: 'strip', name: '4-Panel Strip', slots: 4, shape: 'vertical', desc: 'Classic vertical stacked strip' },
  { id: 'grid', name: '2x2 Pop Grid', slots: 4, shape: 'grid', desc: 'Square block layout' },
  { id: 'polaroid', name: 'Retro Polaroid', slots: 1, shape: 'polaroid', desc: 'Vintage single-frame cutout' },
  { id: 'slide', name: 'Film Slide', slots: 3, shape: 'slide', desc: '1 large top, 2 small bottom' },
  { id: 'cinema', name: 'Cinema Panorama', slots: 3, shape: 'cinema', desc: '3 wide landscape shots side-by-side' },
  { id: 'heart', name: 'Heart-Throb Grid', slots: 4, shape: 'heart', desc: 'Photos shaped into retro hearts' },
  { id: 'trio', name: 'High-Fashion Trio', slots: 3, shape: 'trio', desc: '3 tall, elegant vertical splits' },
  { id: 'scrapbook', name: 'Chaotic Scrapbook', slots: 4, shape: 'scrapbook', desc: 'Fun dynamically tilted collages' }
];

export const BACKDROPS = [
  { id: 'solid-cream', name: 'Studio Cream', type: 'color', value: '#f5f2eb' },
  { id: 'solid-black', name: 'Midnight Black', type: 'color', value: '#09090b' },
  { id: 'solid-white', name: 'Minimal White', type: 'color', value: '#ffffff' },
  { id: 'solid-pink', name: 'Barbie Pink', type: 'color', value: '#ff79c6' },
  { id: 'solid-matcha', name: 'Matcha Green', type: 'color', value: '#a3b18a' },
  { id: 'solid-cherry', name: 'Cherry Red', type: 'color', value: '#e63946' },
  { id: 'solid-cobalt', name: 'Cobalt Blue', type: 'color', value: '#0047ab' },
  { id: 'sunset-glow', name: 'Sunset Glow', type: 'gradient', value: 'linear-gradient(to top right, #f97316, #ec4899, #8b5cf6)' },
  { id: 'cotton-candy', name: 'Cotton Candy', type: 'gradient', value: 'linear-gradient(to bottom right, #fbcfe8, #e9d5ff, #22d3ee)' },
  { id: 'cyber-neon', name: 'Cyber Neon', type: 'gradient', value: 'linear-gradient(to right, #d946ef, #06b6d4)' },
  { id: 'aurora', name: 'Aurora Calm', type: 'gradient', value: 'linear-gradient(to bottom left, #86efac, #3b82f6, #8b5cf6)' },
  { id: 'holo-glitch', name: 'Holo Prism', type: 'gradient', value: 'linear-gradient(to right, #22d3ee, #f472b6, #fef08a)' }
];

export const FILTERS = [
  { id: 'filter-none', name: 'Natural', class: '' },
  { id: 'filter-vintage', name: 'Vintage', class: 'contrast-125 brightness-95 sepia-[0.25]' },
  { id: 'filter-noir', name: 'Noir (B&W)', class: 'grayscale-100 contrast-135 brightness-105' },
  { id: 'filter-cyber', name: 'Cyber Glow', class: 'saturate-150 hue-rotate-[15deg] contrast-110' },
  { id: 'filter-pastel', name: 'Muted Pastel', class: 'opacity-90 contrast-105 brightness-110 saturate-[0.70]' }
];
