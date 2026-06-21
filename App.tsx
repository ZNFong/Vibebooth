import React, { useState, useEffect } from "react";
import StudioSession from "./components/StudioSession";
import PhotoPicker from "./components/PhotoPicker";
import CustomizeExport from "./components/CustomizeExport";
import MemoryAlbum from "./components/MemoryAlbum";
import { LAYOUTS } from "./constants";

const STAGES = { INTRO: "intro", SESSION: "session", PICK: "pick", CUSTOMIZE: "customize" };

function loadAlbums() {
  try {
    const raw = localStorage.getItem("vibebooth_albums");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [stage, setStage] = useState(STAGES.INTRO);
  const [shots, setShots] = useState([]);
  const [layoutId, setLayoutId] = useState(LAYOUTS[0].id);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [albums, setAlbums] = useState(loadAlbums);

  useEffect(() => {
    localStorage.setItem("vibebooth_albums", JSON.stringify(albums));
  }, [albums]);

  function handleSessionComplete(capturedShots) {
    setShots(capturedShots);
    setSelectedIndices([]);
    setStage(STAGES.PICK);
  }

  function toggleSelect(index) {
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }

  function handleLayoutChange(newLayoutId) {
    setLayoutId(newLayoutId);
    setSelectedIndices([]);
  }

  function handleSaveAlbum(entry) {
    setAlbums((prev) => [...prev, entry]);
  }

  function handleDeleteAlbum(id) {
    setAlbums((prev) => prev.filter((a) => a.id !== id));
  }

  function startOver() {
    setShots([]);
    setSelectedIndices([]);
    setStage(STAGES.INTRO);
  }

  if (stage === STAGES.SESSION) {
    return (
      <StudioSession
        onComplete={handleSessionComplete}
        onCancel={() => setStage(STAGES.INTRO)}
      />
    );
  }

  if (stage === STAGES.PICK) {
    return (
      <PhotoPicker
        shots={shots}
        selectedLayoutId={layoutId}
        selectedIndices={selectedIndices}
        onToggle={toggleSelect}
        onLayoutChange={handleLayoutChange}
        onContinue={() => setStage(STAGES.CUSTOMIZE)}
      />
    );
  }

  if (stage === STAGES.CUSTOMIZE) {
    const orderedPhotos = selectedIndices.map((i) => shots[i]);
    return (
      <CustomizeExport
        photos={orderedPhotos}
        layoutId={layoutId}
        onSave={handleSaveAlbum}
        onStartOver={startOver}
      />
    );
  }

  // INTRO
  return (
    <div className="min-h-screen bg-[#f5f2eb]">
      <div className="max-w-2xl mx-auto px-4 pt-20 pb-12 text-center">
        <div className="font-mono text-[#16151A]/40 text-xs tracking-[0.3em] uppercase mb-5">
          A digital photo booth
        </div>
        <h1 className="font-sans text-5xl sm:text-6xl font-extrabold text-[#16151A] tracking-tight leading-[0.95] mb-5">
          VIBE<span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF4FA0] to-[#7B2FFF]">BOOTH</span>
        </h1>
        <p className="text-[#16151A]/60 font-sans text-base max-w-md mx-auto mb-10">
          Seven shots, seven seconds apart. Pick your favorites, dress them up,
          take them home.
        </p>
        <button
          onClick={() => setStage(STAGES.SESSION)}
          className="font-sans font-semibold text-base bg-[#16151A] text-[#f5f2eb] px-9 py-4 rounded-full hover:bg-[#2a2830] transition-colors"
        >
          Start session
        </button>
      </div>

      <MemoryAlbum albums={albums} onDelete={handleDeleteAlbum} />
    </div>
  );
}
