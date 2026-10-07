import React from 'react';
import { Star, Volume2, VolumeX, Maximize2, Award } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HeaderProps {
  studentName: string;
  studentAvatar: string;
  onOpenNameModal: () => void;
  streak: number;
  todayClaimed: boolean;
  onOpenDailyCheckIn: () => void;
  totalStars: number;
  autoSpeak: boolean;
  onToggleAutoSpeak: () => void;
  fontFamily: string;
  onChangeFont: (font: string) => void;
  onOpenStickers: () => void;
  onOpenDiploma: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  studentName,
  studentAvatar,
  onOpenNameModal,
  streak,
  todayClaimed,
  onOpenDailyCheckIn,
  totalStars,
  autoSpeak,
  onToggleAutoSpeak,
  fontFamily,
  onChangeFont,
  onOpenStickers,
  onOpenDiploma,
  onGoHome,
}) => {
  const toggleFullscreen = () => {
    sounds.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const fonts = [
    { id: 'Lexend', label: 'Helder (Lexend)' },
    { id: 'Fredoka', label: 'Rond (Fredoka)' },
    { id: 'Comic Neue', label: 'School (Comic Neue)' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-4 border-amber-300 shadow-sm py-2 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
        {/* Brand / Logo */}
        <button
          onClick={() => {
            sounds.playClick();
            onGoHome();
          }}
          className="flex items-center gap-2.5 group text-left transition-transform active:scale-95"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-xl sm:text-2xl shadow-md border-2 border-amber-200 group-hover:scale-105 transition-transform">
            🎒
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-lg sm:text-xl text-slate-900 group-hover:text-amber-600 transition-colors">
                Rekenpret
              </span>
              <span className="bg-amber-100 text-amber-900 text-[11px] px-2 py-0.5 rounded-full font-display font-bold border border-amber-300">
                1e Leerjaar
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 font-reading hidden sm:block">
              Blok 1 & Blok 2 Rekenroute • Chromebook Editie
            </p>
          </div>
        </button>

        {/* Right side controls: Pupil name badge, Stars, Diploma, Audio, Font */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
          {/* Student Name / Profile Badge */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenNameModal();
            }}
            className="chromebook-btn flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100/80 border-2 border-amber-300 px-3 py-1.5 rounded-2xl shadow-sm text-slate-800 font-display font-bold text-xs sm:text-sm hover:scale-102 transition-transform"
            title="Klik om je naam of poppetje te veranderen"
          >
            <span className="text-base sm:text-lg">{studentAvatar}</span>
            <span className="max-w-[90px] sm:max-w-[120px] truncate text-slate-900 font-black">
              {studentName || 'Mijn naam'}
            </span>
            <span className="text-[11px] text-amber-600 bg-white px-1.5 py-0.2 rounded-md border border-amber-200">
              ✏️
            </span>
          </button>

          {/* Daily Streak & Check-In Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenDailyCheckIn();
            }}
            className={`chromebook-btn flex items-center gap-1.5 border-2 px-2.5 sm:px-3 py-1.5 rounded-2xl shadow-sm font-display font-bold text-xs sm:text-sm transition-all ${
              !todayClaimed
                ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-white border-orange-300 ring-2 ring-orange-200 animate-pulse'
                : 'bg-orange-50 hover:bg-orange-100 text-orange-900 border-orange-300'
            }`}
            title="Klik om je dagelijkse beloning en reeks te bekijken"
          >
            <span className="text-base">🔥</span>
            <span>{streak} {streak === 1 ? 'dag' : 'dg'}</span>
            {!todayClaimed && (
              <span className="px-1.5 py-0.2 bg-white text-orange-700 text-[10px] font-black rounded-full shadow-sm">
                🎁 Nu!
              </span>
            )}
          </button>

          {/* Star & Sticker button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenStickers();
            }}
            className="chromebook-btn flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 hover:from-amber-200 hover:to-yellow-200 border-2 border-amber-300 px-3 py-1.5 rounded-2xl shadow-sm text-amber-900 font-display font-bold text-xs sm:text-sm"
            title="Klik om je stickers te bekijken"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{totalStars}</span>
            <span className="hidden md:inline text-[11px] text-amber-800">stickers</span>
          </button>

          {/* Diploma button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenDiploma();
            }}
            className="chromebook-btn flex items-center gap-1 bg-purple-50 hover:bg-purple-100 border-2 border-purple-300 text-purple-800 px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-display font-bold shadow-sm"
            title="Bekijk je Rekendiploma"
          >
            <Award className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline">Diploma</span>
          </button>

          {/* Auto speak toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleAutoSpeak();
            }}
            className={`chromebook-btn flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border-2 text-xs font-display font-bold shadow-sm transition-colors ${
              autoSpeak
                ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                : 'bg-slate-50 border-slate-300 text-slate-600'
            }`}
            title={autoSpeak ? 'Automatisch voorlezen staat AAN' : 'Automatisch voorlezen staat UIT'}
          >
            {autoSpeak ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span className="hidden lg:inline">Voorlezen</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden lg:inline">Stil</span>
              </>
            )}
          </button>

          {/* Font Selector dropdown */}
          <div className="relative group">
            <select
              value={fontFamily}
              onChange={(e) => {
                sounds.playClick();
                onChangeFont(e.target.value);
              }}
              className="bg-white border-2 border-amber-300 hover:border-amber-400 text-slate-800 text-xs font-display font-semibold rounded-2xl px-2 py-1.5 shadow-sm outline-none cursor-pointer"
              title="Kies een lettertype"
              aria-label="Kies lettertype"
            >
              {fonts.map((f) => (
                <option key={f.id} value={f.id}>
                  Aa {f.label}
                </option>
              ))}
            </select>
          </div>

          {/* Fullscreen for Chromebooks */}
          <button
            onClick={toggleFullscreen}
            className="chromebook-btn p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-700 hidden sm:flex items-center justify-center shadow-sm"
            title="Volledig scherm (Chromebook)"
            aria-label="Volledig scherm"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
