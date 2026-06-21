// Layouts — 8 distinct configurations, each defines how many shots it needs
// and how the strip container should arrange them.
export const LAYOUTS = [
  { id: "classic-strip", name: "Classic 4-Panel Strip", slots: 4, shape: "strip" },
  { id: "pop-grid", name: "2x2 Pop Grid", slots: 4, shape: "grid2x2" },
  { id: "polaroid", name: "Retro Polaroid", slots: 1, shape: "polaroid" },
  { id: "film-slide", name: "Film Slide", slots: 3, shape: "filmSlide" },
  { id: "cinema-panorama", name: "Cinema Panorama", slots: 3, shape: "cinema" },
  { id: "heart-throb", name: "Heart-Throb Grid", slots: 4, shape: "heartGrid" },
  { id: "fashion-trio", name: "High-Fashion Trio", slots: 3, shape: "fashionTrio" },
  { id: "scrapbook", name: "Chaotic Scrapbook", slots: 4, shape: "scrapbook" },
];

// Backdrops — solid/minimal studio tones + aesthetic gradients
export const BACKDROPS = [
  { id: "studio-cream", name: "Studio Cream", type: "solid", value: "#f5f2eb", textOn: "#16151A" },
  { id: "midnight-black", name: "Midnight Black", type: "solid", value: "#0c0c0e", textOn: "#f5f2eb" },
  { id: "minimal-white", name: "Minimal White", type: "solid", value: "#ffffff", textOn: "#16151A" },
  { id: "barbie-pink", name: "Barbie Pink", type: "solid", value: "#ff5fa2", textOn: "#16151A" },
  { id: "matcha-green", name: "Matcha Green", type: "solid", value: "#8aa66f", textOn: "#16151A" },
  { id: "cherry-red", name: "Cherry Red", type: "solid", value: "#c8262a", textOn: "#f5f2eb" },
  { id: "cobalt-blue", name: "Cobalt Blue", type: "solid", value: "#1e3a8a", textOn: "#f5f2eb" },
  { id: "sunset-glow", name: "Sunset Glow", type: "gradient", value: "linear-gradient(135deg, #ff7e3e 0%, #8b2fc9 100%)", textOn: "#f5f2eb" },
  { id: "cotton-candy", name: "Cotton Candy", type: "gradient", value: "linear-gradient(135deg, #ff9ad5 0%, #7ee8e8 100%)", textOn: "#16151A" },
  { id: "cyber-neon", name: "Cyber Neon", type: "gradient", value: "linear-gradient(135deg, #ff2fd0 0%, #2fe0ff 100%)", textOn: "#0c0c0e" },
  { id: "aurora-calm", name: "Aurora Calm", type: "gradient", value: "linear-gradient(135deg, #67e8b8 0%, #6f8bff 50%, #b06fff 100%)", textOn: "#16151A" },
  { id: "holo-prism", name: "Holo Prism", type: "gradient", value: "linear-gradient(135deg, #d9d9d9 0%, #b6c9e0 25%, #e0b6d9 50%, #c9e0b6 75%, #d9d9d9 100%)", textOn: "#16151A" },
];

// Filters — global CSS filter strings applied uniformly across chosen photos
export const FILTERS = [
  { id: "natural", name: "Natural", css: "none" },
  { id: "vintage", name: "Vintage", css: "sepia(0.45) contrast(1.15) saturate(1.1) brightness(1.02)" },
  { id: "noir", name: "Noir", css: "grayscale(1) contrast(1.35) brightness(0.95)" },
  { id: "cyber-glow", name: "Cyber Glow", css: "saturate(1.8) hue-rotate(-8deg) contrast(1.1)" },
  { id: "muted-pastel", name: "Muted Pastel", css: "saturate(0.55) brightness(1.08) contrast(0.92)" },
];

export const CAPTURE_COUNT = 7;
export const CAPTURE_INTERVAL_SECONDS = 7;
export const MAX_CAPTION_LENGTH = 35;
export const DEFAULT_CAPTION = "★ VIBEBOOTH ★";
