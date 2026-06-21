import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { CAPTURE_COUNT, CAPTURE_INTERVAL_SECONDS } from "../constants";

export default function StudioSession({ onComplete, onCancel }) {
  const webcamRef = useRef(null);
  const [shots, setShots] = useState([]);
  const [countdown, setCountdown] = useState(CAPTURE_INTERVAL_SECONDS);
  const [flash, setFlash] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setShots((prev) => [...prev, imageSrc]);
      setFlash(true);
      setTimeout(() => setFlash(false), 400);
    }
  }, []);

  useEffect(() => {
    if (shots.length >= CAPTURE_COUNT) {
      const t = setTimeout(() => onComplete(shots), 600);
      return () => clearTimeout(t);
    }
    if (!cameraReady) return;

    if (countdown <= 0) {
      capture();
      setCountdown(CAPTURE_INTERVAL_SECONDS);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, shots.length, cameraReady]);

  return (
    <div className="min-h-screen bg-[#0c0c0e] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Flash overlay */}
      {flash && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none animate-flash" />
      )}

      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="font-mono text-[#f5f2eb]/60 text-xs tracking-widest uppercase">
            Live session
          </div>
          <button
            onClick={onCancel}
            className="font-mono text-[#f5f2eb]/40 text-xs tracking-widest uppercase hover:text-[#f5f2eb] transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Viewfinder */}
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3] ring-1 ring-[#f5f2eb]/10">
          {cameraError ? (
            <div className="absolute inset-0 flex items-center justify-center text-[#f5f2eb]/70 font-sans text-sm text-center px-8">
              Camera access is needed for the studio session. Check your
              browser's permission settings and reload.
            </div>
          ) : (
            <Webcam
              ref={webcamRef}
              audio={false}
              mirrored
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "user", width: 1280, height: 960 }}
              onUserMedia={() => setCameraReady(true)}
              onUserMediaError={() => setCameraError(true)}
              className="w-full h-full object-cover scale-x-[-1]"
            />
          )}

          {/* Countdown overlay */}
          {cameraReady && shots.length < CAPTURE_COUNT && (
            <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none">
              <div
                key={countdown}
                className="font-mono text-white text-7xl font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] animate-countdownPulse"
              >
                {countdown}
              </div>
            </div>
          )}

          {/* Shot counter */}
          <div className="absolute top-4 right-4 font-mono text-xs tracking-widest bg-black/50 text-white px-3 py-1.5 rounded-full backdrop-blur-sm">
            {shots.length} / {CAPTURE_COUNT}
          </div>
        </div>

        <p className="text-center text-[#f5f2eb]/40 font-sans text-sm mt-5">
          A new shot fires every {CAPTURE_INTERVAL_SECONDS} seconds — change
          your pose, outfit, or prop before the flash.
        </p>

        {/* Filmstrip of captured shots so far */}
        {shots.length > 0 && (
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            {shots.map((s, i) => (
              <img
                key={i}
                src={s}
                alt={`Shot ${i + 1}`}
                className="w-16 h-12 object-cover rounded-md ring-1 ring-[#f5f2eb]/15 flex-shrink-0"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
