import React, { useState } from 'react';
import { Sticker } from '../data/exercises';
import { sounds } from '../utils/audio';
import { Star, Sparkles, X, RotateCcw, Palette } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PlacedSticker {
  id: string;
  icon: string;
  x: number;
  y: number;
  rotation: number;
}

interface StickerAlbumProps {
  stickers: Sticker[];
  totalStars: number;
  onClose: () => void;
}

export const StickerAlbum: React.FC<StickerAlbumProps> = ({
  stickers,
  totalStars,
  onClose,
}) => {
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([
    { id: 'initial-1', icon: '🧸', x: 25, y: 55, rotation: -5 },
    { id: 'initial-2', icon: '⭐', x: 75, y: 25, rotation: 12 },
  ]);
  const [selectedStickerToPlace, setSelectedStickerToPlace] = useState<Sticker | null>(null);
  const [boardTheme, setBoardTheme] = useState<'classroom' | 'meadow' | 'space'>('classroom');

  const handleBoardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedStickerToPlace) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    sounds.playSparkle();

    setPlacedStickers((prev) => [
      ...prev,
      {
        id: `placed-${Date.now()}`,
        icon: selectedStickerToPlace.icon,
        x: Math.max(5, Math.min(90, x)),
        y: Math.max(5, Math.min(85, y)),
        rotation: (Math.random() - 0.5) * 25,
      },
    ]);
  };

  const handleClearBoard = () => {
    sounds.playClick();
    setPlacedStickers([]);
  };

  const handleSelectSticker = (sticker: Sticker) => {
    if (totalStars < sticker.requiredStars) {
      sounds.playWrong();
      return;
    }
    sounds.playClick();
    setSelectedStickerToPlace(sticker);
  };

  const handleCelebrate = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-amber-300 p-5 sm:p-7 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-200">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📒</span>
            <div>
              <h2 className="font-display font-black text-2xl text-slate-800">
                Mijn Stickerboek & Rekenbord
              </h2>
              <p className="font-reading text-sm text-slate-600">
                Verzamel sterren en plak je stickers op het bord! (Je hebt nu{' '}
                <strong className="text-amber-600">{totalStars} sterren ⭐</strong>)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="chromebook-btn w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sticker Collection Grid */}
        <div className="my-4">
          <h3 className="font-display font-bold text-base text-slate-700 mb-2">
            Stap 1: Kies een sticker uit je collectie:
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
            {stickers.map((sticker) => {
              const isUnlocked = totalStars >= sticker.requiredStars;
              const isSelected = selectedStickerToPlace?.id === sticker.id;

              return (
                <button
                  key={sticker.id}
                  onClick={() => handleSelectSticker(sticker)}
                  className={`chromebook-btn flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all relative ${
                    isUnlocked
                      ? isSelected
                        ? 'border-amber-500 bg-amber-100 ring-4 ring-amber-300 scale-105'
                        : `${sticker.color} hover:scale-105`
                      : 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
                  }`}
                  title={isUnlocked ? sticker.name : `Nog ${sticker.requiredStars - totalStars} sterren nodig`}
                >
                  <span className={`text-3xl sm:text-4xl ${!isUnlocked ? 'filter grayscale' : ''}`}>
                    {sticker.icon}
                  </span>
                  <span className="text-[10px] font-display font-bold text-slate-700 truncate w-full text-center mt-1">
                    {sticker.name}
                  </span>
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] rounded-2xl flex items-center justify-center">
                      <span className="text-[11px] font-display font-black text-amber-300 bg-slate-800/90 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-current" /> {sticker.requiredStars}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Sticker Board Canvas */}
        <div className="flex flex-col mt-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-bold text-base text-slate-700 flex items-center gap-1.5">
              <span>Stap 2: Klik op het bord om je sticker te plakken!</span>
              {selectedStickerToPlace && (
                <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full animate-pulse">
                  Gekozen: {selectedStickerToPlace.icon} {selectedStickerToPlace.name}
                </span>
              )}
            </h3>

            {/* Board Background selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-display font-semibold text-slate-500">Achtergrond:</span>
              <button
                onClick={() => setBoardTheme('classroom')}
                className={`text-xs px-2.5 py-1 rounded-full font-display font-bold ${
                  boardTheme === 'classroom' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                🏫 Klas
              </button>
              <button
                onClick={() => setBoardTheme('meadow')}
                className={`text-xs px-2.5 py-1 rounded-full font-display font-bold ${
                  boardTheme === 'meadow' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                🌳 Speelplaats
              </button>
              <button
                onClick={() => setBoardTheme('space')}
                className={`text-xs px-2.5 py-1 rounded-full font-display font-bold ${
                  boardTheme === 'space' ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                🚀 Ruimte
              </button>
            </div>
          </div>

          <div
            onClick={handleBoardClick}
            className={`relative w-full h-72 sm:h-80 rounded-3xl border-4 border-amber-300 overflow-hidden cursor-pointer select-none shadow-inner transition-colors ${
              boardTheme === 'classroom'
                ? 'bg-amber-100/70 border-amber-300'
                : boardTheme === 'meadow'
                ? 'bg-gradient-to-b from-sky-200 to-emerald-200 border-emerald-300'
                : 'bg-gradient-to-b from-slate-900 to-indigo-950 border-indigo-400'
            }`}
          >
            {/* Background elements */}
            {boardTheme === 'classroom' && (
              <div className="absolute inset-0 pointer-events-none opacity-40 flex flex-col justify-between p-4">
                <div className="flex justify-between text-4xl">
                  <span>📐</span>
                  <span>📚</span>
                  <span>🖍️</span>
                </div>
                <div className="text-center font-display font-bold text-amber-900/30 text-2xl">
                  ONZE REKENKLAS - 1E LEERJAAR
                </div>
                <div className="flex justify-between text-4xl">
                  <span>🧸</span>
                  <span>🪑</span>
                  <span>🎒</span>
                </div>
              </div>
            )}

            {boardTheme === 'meadow' && (
              <div className="absolute inset-0 pointer-events-none opacity-50 flex flex-col justify-between p-4">
                <div className="flex justify-between text-4xl">
                  <span>☀️</span>
                  <span>☁️</span>
                  <span>🌈</span>
                </div>
                <div className="flex justify-around text-4xl">
                  <span>🌻</span>
                  <span>🌳</span>
                  <span>🦋</span>
                </div>
              </div>
            )}

            {boardTheme === 'space' && (
              <div className="absolute inset-0 pointer-events-none opacity-60 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-between text-3xl">
                  <span>✨</span>
                  <span>🪐</span>
                  <span>⭐</span>
                </div>
                <div className="flex justify-around text-4xl">
                  <span>🛸</span>
                  <span>🌙</span>
                  <span>🌟</span>
                </div>
              </div>
            )}

            {/* Placed Stickers */}
            {placedStickers.map((s) => (
              <div
                key={s.id}
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
                }}
                className="absolute text-5xl sm:text-6xl filter drop-shadow-md cursor-grab hover:scale-125 transition-transform"
              >
                {s.icon}
              </div>
            ))}

            {placedStickers.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-display font-bold text-slate-500 bg-white/80 px-4 py-2 rounded-2xl shadow">
                  Kies een sticker hierboven en klik hier om te plakken!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-amber-200">
          <button
            onClick={handleClearBoard}
            className="chromebook-btn flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-semibold text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Bord leegmaken
          </button>

          <button
            onClick={handleCelebrate}
            className="chromebook-btn flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-display font-bold text-sm shadow-md hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            Confetti feestje! 🎉
          </button>
        </div>
      </div>
    </div>
  );
};
