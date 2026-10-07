import React, { useState } from 'react';
import { X, Check, Sparkles, User, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';

interface NameModalProps {
  currentName: string;
  currentAvatar: string;
  onSave: (name: string, avatar: string) => void;
  onClose: () => void;
}

const AVATARS = [
  { icon: '🦁', label: 'Leeuw' },
  { icon: '🧸', label: 'Beer' },
  { icon: '🚀', label: 'Raket' },
  { icon: '🦄', label: 'Eenhoorn' },
  { icon: '🐸', label: 'Kikker' },
  { icon: '🐱', label: 'Katje' },
  { icon: '🐶', label: 'Hondje' },
  { icon: '🦖', label: 'Dino' },
  { icon: '🦊', label: 'Vos' },
  { icon: '🐬', label: 'Dolfijn' },
  { icon: '⭐', label: 'Ster' },
  { icon: '⚽', label: 'Voetbal' },
];

export const NameModal: React.FC<NameModalProps> = ({
  currentName,
  currentAvatar,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(currentName === 'Super Speurder' ? '' : currentName);
  const [avatar, setAvatar] = useState(currentAvatar || '🦁');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playCorrect();
    const finalName = name.trim() || 'Super Speurder';
    onSave(finalName, avatar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative">
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 chromebook-btn w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
          aria-label="Sluiten"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-5">
          <div className="w-16 h-16 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-3xl shadow-md border-2 border-amber-200">
            {avatar}
          </div>
          <h2 className="font-display font-black text-2xl text-slate-800">
            Wat is jouw naam? 🎒
          </h2>
          <p className="font-reading text-sm text-slate-500">
            Typ hier je voornaam voor op je rekendiploma en bord!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name input field */}
          <div>
            <label className="block text-xs font-display font-bold text-slate-700 mb-1">
              Jouw voornaam:
            </label>
            <input
              type="text"
              autoFocus
              maxLength={24}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bijv. Lucas, Emma, Noah..."
              className="w-full px-4 py-3 rounded-2xl border-3 border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-200 outline-none font-display font-bold text-xl text-center text-slate-800 shadow-inner bg-amber-50/40"
            />
          </div>

          {/* Avatar selector */}
          <div>
            <label className="block text-xs font-display font-bold text-slate-700 mb-2">
              Kies jouw rekenfiguurtje:
            </label>
            <div className="grid grid-cols-6 gap-2 bg-amber-50/60 p-3 rounded-2xl border-2 border-amber-200">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av.icon}
                  onClick={() => {
                    sounds.playClick();
                    setAvatar(av.icon);
                  }}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl transition-all ${
                    avatar === av.icon
                      ? 'bg-amber-400 ring-4 ring-amber-300 scale-110 shadow-md'
                      : 'bg-white hover:bg-amber-100/70 border border-amber-200'
                  }`}
                  title={av.label}
                >
                  {av.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="chromebook-btn w-full py-3.5 mt-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-display font-black text-lg shadow-lg flex items-center justify-center gap-2 hover:scale-102 transition-transform"
          >
            <Check className="w-6 h-6 stroke-[3]" />
            <span>Klaar, opslaan! ⭐</span>
          </button>
        </form>
      </div>
    </div>
  );
};
