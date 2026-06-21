import React, { useState, useEffect, useRef } from 'react';

interface StudioSessionProps {
  slotsCount: number;
  onComplete: (photos: string[]) => void;
  onCancel: () => void;
}

export default function StudioSession({ slotsCount, onComplete, onCancel }: StudioSessionProps) {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentSlot, setCurrentSlot] = useState<number>(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [flash, setFlash] = useState<boolean>(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 1280, height: 720, facingMode: 'user' }, 
          audio: false 
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Could not access your camera. Please check your permissions.");
      }
    }
    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  function triggerCapture() {
    if (countdown !== null) return;
    setCountdown(3);
  }

  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }

    setFlash(true);
    setTimeout(() => setFlash(false), 150);
    captureSnapshot();
    setCountdown(null);
  }, [countdown]);

  function captureSnapshot() {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      const updatedPhotos = [...photos, dataUrl];
      setPhotos(updatedPhotos);

      if (currentSlot + 1 >= slotsCount) {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        onComplete(updatedPhotos);
      } else {
        setCurrentSlot(currentSlot + 1);
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#16151A] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {flash && <div className="absolute inset-0 bg-white z-50 transition-opacity duration-150" />}

      <div className="w-full max-w-3xl flex flex-col gap-4">
        <div className="flex justify-between items-center px-2">
          <div className="font-mono text-xs text-white/40 tracking-widest uppercase">
            Frame {currentSlot + 1} of {slotsCount}
          </div>
          <button 
            type="button"
            onClick={onCancel}
            className="font-mono text-xs text-white/40 hover:text-white uppercase tracking-widest"
          >
            Cancel [esc]
          </button>
        </div>

        <div className="relative aspect-[4/3] bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-white/5">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover scale-x-[-1]"
          />
          
          {countdown !== null && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <span className="font-serif text-9xl md:text-[12rem] text-white tracking-tighter">
                {countdown}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-4 mt-2">
          <button
            type="button"
            onClick={triggerCapture}
            disabled={countdown !== null}
            className="w-20 h-20 rounded-full border-4 border-white bg-white/10 hover:bg-white flex items-center justify-center transition-all shadow-lg active:scale-95 disabled:opacity-30 group"
          >
            <div className="w-14 h-14 rounded-full bg-white group-hover:bg-zinc-900 transition-colors" />
          </button>
          <div className="font-sans text-xs text-white/40 tracking-wide">
            Click frame mirror to snap portrait
          </div>
        </div>
      </div>
    </div>
  );
}
