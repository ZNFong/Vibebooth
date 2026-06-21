import React, { useState } from 'react';

interface PhotoPickerProps {
  initialPhotos: string[];
  requiredCount: number;
  onComplete: (photos: string[]) => void;
  onCancel: () => void;
}

export default function PhotoPicker({ initialPhotos, requiredCount, onComplete, onCancel }: PhotoPickerProps) {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>(initialPhotos.slice(0, requiredCount));

  function handleTogglePhoto(photo: string) {
    if (selectedPhotos.includes(photo)) {
      setSelectedPhotos(selectedPhotos.filter(p => p !== photo));
    } else {
      if (selectedPhotos.length < requiredCount) {
        setSelectedPhotos([...selectedPhotos, photo]);
      } else {
        setSelectedPhotos([...selectedPhotos.slice(1), photo]);
      }
    }
  }

  function handleConfirm() {
    if (selectedPhotos.length === requiredCount) {
      onComplete(selectedPhotos);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f2eb] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <button
              type="button"
              onClick={onCancel}
              className="font-mono text-xs text-[#16151A]/40 tracking-widest uppercase hover:text-[#16151A] transition-colors mb-2 block"
            >
              ← Cancel Session
            </button>
            <h1 className="font-serif text-3xl tracking-tight text-[#16151A]">
              Pick your snapshots
            </h1>
            <p className="font-sans text-xs text-[#16151A]/50 mt-1">
              Select exactly {requiredCount} photos for your structural strip layout.
            </p>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={selectedPhotos.length !== requiredCount}
            className="font-sans font-semibold text-sm bg-[#16151A] text-[#f5f2eb] px-6 py-3 rounded-full hover:bg-[#2a2830] transition-colors disabled:opacity-30 self-stretch md:self-auto text-center"
          >
            Continue ({selectedPhotos.length}/{requiredCount})
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {initialPhotos.map((photo, index) => {
            const isSelected = selectedPhotos.includes(photo);
            const selectIndex = selectedPhotos.indexOf(photo);

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleTogglePhoto(photo)}
                className={`relative aspect-[4/3] bg-zinc-200 rounded-2xl overflow-hidden border-2 transition-all group ${
                  isSelected ? 'border-[#16151A] scale-[0.98]' : 'border-transparent hover:border-[#16151A]/20'
                }`}
              >
                <img 
                  src={photo} 
                  alt={`Capture snapshot ${index + 1}`} 
                  className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                    isSelected ? 'brightness-95' : ''
                  }`}
                />
                
                <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all border ${
                  isSelected 
                    ? 'bg-[#16151A] text-[#f5f2eb] border-[#16151A]' 
                    : 'bg-white/70 text-transparent border-transparent group-hover:border-zinc-400'
                }`}>
                  {isSelected ? selectIndex + 1 : ''}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
