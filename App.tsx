import React, { useState, useEffect } from 'react';
import DesignSelector from './CustomizeExport.tsx'; 
import CameraFeed from './StudioSession.tsx';       
import PhotoPicker from './PhotoPicker.tsx';
import BoothStrip from './PhotoStrip.tsx';         

const FRAME_THEMES = [
  // Solid Colors
  { id: 'solid-cream', name: 'Studio Cream', class: 'bg-[#f5f2eb] text-stone-900 border border-stone-300' },
  { id: 'solid-black', name: 'Midnight Black', class: 'bg-zinc-950 text-zinc-100 border border-zinc-800' },
  { id: 'solid-white', name: 'Minimal White', class: 'bg-white text-zinc-950 border border-zinc-200' },
  { id: 'solid-pink', name: 'Barbie Pink', class: 'bg-[#ff79c6] text-white' },
  { id: 'solid-matcha', name: 'Matcha Green', class: 'bg-[#a3b18a] text-zinc-900' },
  { id: 'solid-cherry', name: 'Cherry Red', class: 'bg-[#e63946] text-white' },
  { id: 'solid-cobalt', name: 'Cobalt Blue', class: 'bg-[#0047ab] text-white' },
  // Gradients
  { id: 'sunset-glow', name: 'Sunset Glow', class: 'bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-600 text-white' },
  { id: 'cotton-candy', name: 'Cotton Candy', class: 'bg-gradient-to-br from-pink-300 via-purple-300 to-cyan-400 text-zinc-900' },
  { id: 'cyber-neon', name: 'Cyber Neon', class: 'bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white' },
  { id: 'aurora', name: 'Aurora Calm', class: 'bg-gradient-to-bl from-green-300 via-blue-500 to-purple-600 text-white' },
  { id: 'holo-glitch', name: 'Holo Prism', class: 'bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-200 text-zinc-900' }
];

const LAYOUT_PRESETS = [
  { id: 'strip', name: '4-Panel Strip', slots: 4, desc: 'Classic vertical stacked strip' },
  { id: 'grid', name: '2x2 Pop Grid', slots: 4, desc: 'Square block layout' },
  { id: 'polaroid', name: 'Retro Polaroid', slots: 1, desc: 'Vintage single-frame cutout' },
  { id: 'slide', name: 'Film Slide', slots: 3, desc: '1 large top, 2 small bottom' },
  { id: 'cinema', name: 'Cinema Panorama', slots: 3, desc: '3 wide landscape shots side-by-side' },
  { id: 'heart', name: 'Heart-Throb Grid', slots: 4, desc: 'Photos shaped into retro hearts' },
  { id: 'trio', name: 'High-Fashion Trio', slots: 3, desc: '3 tall, elegant vertical splits' },
  { id: 'scrapbook', name: 'Chaotic Scrapbook', slots: 4, desc: 'Fun dynamically tilted collages' }
];

const PHOTO_FILTERS = [
  { id: 'filter-none', name: 'Natural', class: '' },
  { id: 'filter-vintage', name: 'Vintage', class: 'contrast-125 brightness-95 sepia-[0.25]' },
  { id: 'filter-noir', name: 'Noir (B&W)', class: 'grayscale-100 contrast-135 brightness-105' },
  { id: 'filter-cyber', name: 'Cyber Glow', class: 'saturate-150 hue-rotate-[15deg] contrast-110' },
  { id: 'filter-pastel', name: 'Muted Pastel', class: 'opacity-90 contrast-105 brightness-110 saturate-[0.70]' }
];

export default function App() {
  const [selectedTheme, setSelectedTheme] = useState(FRAME_THEMES[0]);
  const [selectedLayout, setSelectedLayout] = useState(LAYOUT_PRESETS[0]);
  const [selectedFilter, setSelectedFilter] = useState(PHOTO_FILTERS[0]);
  const [customText, setCustomText] = useState('');
  
  const [allCaptured, setAllCaptured] = useState([]);
  const [chosenPhotos, setChosenPhotos] = useState([]);
  const [savedStrips, setSavedStrips] = useState([]);

  useEffect(() => {
    const memory = localStorage.getItem('vibebooth_gallery');
    if (memory) setSavedStrips(JSON.parse(memory));
  }, []);

  useEffect(() => {
    if (allCaptured.length > 0) {
      setChosenPhotos(allCaptured.slice(0, selectedLayout.slots));
    } else {
      setChosenPhotos([]);
    }
  }, [selectedLayout, allCaptured]);

  const handleTogglePhoto = (photoUrl) => {
    const max = selectedLayout.slots;
    setChosenPhotos((prev) => {
      if (prev.includes(photoUrl)) {
        return prev.filter(p => p !== photoUrl);
      }
      if (prev.length >= max) {
        return [...prev.slice(1), photoUrl];
      }
      return [...prev, photoUrl];
    });
  };

  const saveToAlbum = () => {
    if (chosenPhotos.length < selectedLayout.slots) return;
    const newStrip = {
      id: Date.now(),
      photos: chosenPhotos,
      themeClass: selectedTheme.class,
      layoutId: selectedLayout.id,
      filterClass: selectedFilter.class,
      text: customText,
      date: new Date().toLocaleDateString()
    };
    const updated = [newStrip, ...savedStrips];
    setSavedStrips(updated);
    localStorage.setItem('vibebooth_gallery', JSON.stringify(updated));
  };

  const clearAlbum = () => {
    localStorage.removeItem('vibebooth_gallery');
    setSavedStrips([]);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center py-10 px-4">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          VIBEBOOTH
        </h1>
        <p className="text-zinc-400 text-xs tracking-widest uppercase mt-2">7 Snaps • 8 Layouts • Custom Studio Memory Suite</p>
      </header>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Controls Column */}
        <div className="lg:col-span-4 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-6 backdrop-blur-md">
          <div>
            <h2 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase mb-3">1. Frame Layout</h2>
            <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1">
              {LAYOUT_PRESETS.map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => setSelectedLayout(layout)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selectedLayout.id === layout.id ? 'bg-zinc-800 border-purple-500 shadow-lg' : 'bg-zinc-950/40 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="font-bold text-sm text-zinc-200">{layout.name}</div>
                  <div className="text-[11px] text-zinc-500">{layout.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase mb-3">2. Frame Backdrop / Colors</h2>
            <DesignSelector presets={FRAME_THEMES} selected={selectedTheme} onSelect={setSelectedTheme} />
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase mb-3">3. Photo Aesthetics</h2>
            <div className="flex flex-wrap gap-2">
              {PHOTO_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    selectedFilter.id === f.id ? 'bg-zinc-100 text-zinc-950 border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase mb-3">4. Custom Caption</h2>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Add date, place, or memory text..."
              maxLength={35}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-600 placeholder-zinc-600"
            />
          </div>
        </div>

        {/* Viewfinder Column */}
        <div className="lg:col-span-4 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center backdrop-blur-md">
          <h2 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase self-start mb-4">Live Studio</h2>
          <CameraFeed onPhotosCaptured={setAllCaptured} />
          
          <PhotoPicker 
            allCapturedPhotos={allCaptured} 
            selectedPhotos={chosenPhotos} 
            onTogglePhoto={handleTogglePhoto} 
            requiredSlots={selectedLayout.slots} 
          />
        </div>

        {/* Preview Column */}
        <div className="lg:col-span-4 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center backdrop-blur-md">
          <h2 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase self-start mb-4">Your Custom Strip</h2>
          <BoothStrip 
            photos={chosenPhotos} 
            theme={selectedTheme} 
            layout={selectedLayout.id} 
            filterClass={selectedFilter.class}
            text={customText}
            requiredSlots={selectedLayout.slots}
          />

          {chosenPhotos.length === selectedLayout.slots && (
            <button
              onClick={saveToAlbum}
              className="w-full mt-4 py-3.5 bg-pink-600 hover:bg-pink-500 active:scale-[0.99] rounded-xl font-bold text-sm tracking-wide transition-all shadow-xl shadow-pink-600/10"
            >
              💾 Save to Device Album Memory
            </button>
          )}
        </div>
      </div>

      {/* Album Grid */}
      <section className="max-w-7xl w-full border-t border-zinc-900 pt-10 print:hidden">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Your Memory Album</h2>
            <p className="text-xs text-zinc-500 mt-1">Strips and collages compiled on this local device browser</p>
          </div>
          {savedStrips.length > 0 && (
            <button onClick={clearAlbum} className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider">
              Clear Entire Album
            </button>
          )}
        </div>

        {savedStrips.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-zinc-900 rounded-3xl text-zinc-600 font-medium text-sm">
            Your studio album is currently empty. Run a capture session above!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {savedStrips.map((strip) => (
              <div 
                key={strip.id} 
                className={`p-3 rounded-xl shadow-xl flex flex-col justify-between transition-transform duration-300 hover:scale-[1.03] ${strip.themeClass}`}
              >
                <div className={`grid gap-1.5 ${
                  strip.layoutId === 'grid' || strip.layoutId === 'heart' || strip.layoutId === 'scrapbook' ? 'grid-cols-2' : 
                  strip.layoutId === 'cinema' ? 'grid-cols-3' : 'grid-cols-1'
                }`}>
                  {strip.photos.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt="" 
                      className={`w-full object-cover rounded-sm border border-black/5 ${strip.filterClass} ${
                        strip.layoutId === 'heart' ? 'aspect-square rounded-full' : 'h-16'
                      }`} 
                    />
                  ))}
                </div>
                {strip.text && (
                  <p className="text-[10px] text-center font-mono tracking-tight mt-2 truncate max-w-full opacity-80">{strip.text}</p>
                )}
                <div className="text-[8px] font-mono text-center tracking-widest opacity-40 mt-1">{strip.date}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
