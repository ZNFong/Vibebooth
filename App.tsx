import React, { useState, useEffect } from 'react';
import DesignSelector from './CustomizeExport.tsx'; 
import CameraFeed from './StudioSession.tsx';
import PhotoPicker from './PhotoPicker.tsx';
import BoothStrip from './PhotoStrip.tsx';
import { LAYOUTS } from './constants';

export default function App() {
  const [step, setStep] = useState<'welcome' | 'session' | 'picker' | 'customize'>('welcome');
  const [selectedLayoutId, setSelectedLayoutId] = useState<string>('strip');
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [savedStrips, setSavedStrips] = useState<any[]>([]);

  // Load saved booth strips from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('vibebooth_saved');
    if (saved) {
      try {
        setSavedStrips(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved memory strips', e);
      }
    }
  }, []);

  const selectedLayout = LAYOUTS.find(l => l.id === selectedLayoutId) || LAYOUTS[0];

  function handleLayoutSelect(id: string) {
    setSelectedLayoutId(id);
    setStep('session');
  }

  function handleSessionComplete(photos: string[]) {
    setCapturedPhotos(photos);
    setStep('picker');
  }

  function handlePickerComplete(photos: string[]) {
    setCapturedPhotos(photos);
    setStep('customize');
  }

  function handleSaveStrip(stripData: any) {
    const updated = [stripData, ...savedStrips];
    setSavedStrips(updated);
    localStorage.setItem('vibebooth_saved', JSON.stringify(updated));
  }

  function handleStartOver() {
    setCapturedPhotos([]);
    setStep('welcome');
  }

  return (
    <div className="min-h-screen bg-[#f5f2eb] text-[#16151A]">
      {step === 'welcome' && (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-4">
            vibebooth.
          </h1>
          <p className="font-sans text-base text-[#16151A]/60 max-w-md mx-auto mb-12">
            Your personal digital photo booth. Pick a layout configuration structure to start your snapshot session.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-5xl mx-auto mb-16">
            {LAYOUTS.map((layout) => (
              <button
                key={layout.id}
                onClick={() => handleLayoutSelect(layout.id)}
                className="bg-white border border-[#16151A]/10 rounded-2xl p-5 hover:border-[#16151A]/40 transition-all text-left flex flex-col justify-between group h-44"
              >
                <div>
                  <div className="font-sans font-semibold text-sm mb-1 group-hover:text-black">
                    {layout.name}
                  </div>
                  <div className="font-sans text-xs text-[#16151A]/50 leading-relaxed">
                    {layout.desc}
                  </div>
                </div>
                <div className="font-mono text-[10px] tracking-wider uppercase text-[#16151A]/40 group-hover:text-[#16151A]">
                  {layout.slots} snapshots →
                </div>
              </button>
            ))}
          </div>

          {/* History / Album Feed */}
          {savedStrips.length > 0 && (
            <div className="border-t border-[#16151A]/10 pt-12 text-left">
              <h2 className="font-serif text-2xl mb-6">Recent Strips Memory</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {savedStrips.map((strip) => {
                  const layoutConfig = LAYOUTS.find(l => l.id === strip.layoutId);
                  return (
                    <div key={strip.id} className="bg-white border border-[#16151A]/5 rounded-xl p-3 shadow-sm flex flex-col items-center">
                      <div className="scale-75 origin-top my-2">
                        <BoothStrip
                          photos={strip.photos}
                          backdrop={{ id: strip.backdropId, value: '#ffffff', type: 'color', name: '' }} // placeholder config
                          filter={{ id: strip.filterId, class: '' }} // placeholder config
                          caption={strip.caption}
                          layoutShape={layoutConfig?.shape || 'vertical'}
                        />
                      </div>
                      <div className="w-full font-mono text-[10px] text-[#16151A]/40 mt-auto pt-2 text-center border-t border-[#16151A]/5">
                        {new Date(strip.date).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {step === 'session' && (
        <CameraFeed
          slotsCount={selectedLayout.slots}
          onComplete={handleSessionComplete}
          onCancel={handleStartOver}
        />
      )}

      {step === 'picker' && (
        <PhotoPicker
          initialPhotos={capturedPhotos}
          requiredCount={selectedLayout.slots}
          onComplete={handlePickerComplete}
          onCancel={handleStartOver}
        />
      )}

      {step === 'customize' && (
        <DesignSelector
          photos={capturedPhotos}
          layoutId={selectedLayoutId}
          onSave={handleSaveStrip}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
}
