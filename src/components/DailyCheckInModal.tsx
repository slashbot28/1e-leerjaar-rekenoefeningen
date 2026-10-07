import React from 'react';
import { X, Sparkles, Star, Flame, Gift, CheckCircle2, Calendar } from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

interface DailyCheckInModalProps {
  streak: number;
  todayClaimed: boolean;
  rewardStars: number;
  studentName: string;
  onClaim: () => void;
  onClose: () => void;
}

const DAYS = [
  { day: 1, stars: 3, label: 'Dag 1', icon: '⭐' },
  { day: 2, stars: 3, label: 'Dag 2', icon: '⭐' },
  { day: 3, stars: 4, label: 'Dag 3', icon: '⭐' },
  { day: 4, stars: 4, label: 'Dag 4', icon: '⭐' },
  { day: 5, stars: 5, label: 'Dag 5', icon: '🌟' },
  { day: 6, stars: 5, label: 'Dag 6', icon: '🌟' },
  { day: 7, stars: 10, label: 'Dag 7', icon: '🎁' },
];

export const DailyCheckInModal: React.FC<DailyCheckInModalProps> = ({
  streak,
  todayClaimed,
  rewardStars,
  studentName,
  onClaim,
  onClose,
}) => {
  const currentDayInCycle = ((streak - 1) % 7) + 1;

  const handleClaimReward = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
    onClaim();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative text-center">
        {/* Close button */}
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

        {/* Top Icon Badge */}
        <div className="w-20 h-20 mx-auto mb-3 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-300 flex items-center justify-center text-4xl shadow-lg border-2 border-white animate-bounce">
          🎁
        </div>

        <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 px-3 py-1 rounded-full text-xs font-display font-black mb-2 border border-orange-300">
          <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
          <span>{streak} {streak === 1 ? 'dag' : 'dagen'} op rij gerekend!</span>
        </div>

        <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-800 mb-1">
          Dagelijkse Rekenbeloning!
        </h2>
        <p className="font-reading text-sm text-slate-600 mb-5">
          Fijn dat je er weer bent, <strong>{studentName || 'rekenaar'}</strong>! Open elke dag de app en verzamel gratis extra sterren.
        </p>

        {/* 7-Day Streak Ladder */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-6 bg-amber-50/70 p-3 rounded-2xl border-2 border-amber-200">
          {DAYS.map((d) => {
            const isCompleted = d.day < currentDayInCycle || (d.day === currentDayInCycle && todayClaimed);
            const isCurrent = d.day === currentDayInCycle && !todayClaimed;

            return (
              <div
                key={d.day}
                className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all ${
                  isCurrent
                    ? 'bg-amber-400 border-amber-500 shadow-md scale-105 text-amber-950 font-bold ring-2 ring-amber-300 animate-pulse'
                    : isCompleted
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                    : 'bg-white border-slate-200 text-slate-500 opacity-60'
                }`}
              >
                <span className="text-[10px] font-display font-bold mb-0.5">{d.label}</span>
                <span className="text-xl my-0.5">{isCompleted ? '✅' : d.icon}</span>
                <span className="text-[11px] font-display font-black">+{d.stars}⭐</span>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        {!todayClaimed ? (
          <button
            onClick={handleClaimReward}
            className="chromebook-btn w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-display font-black text-xl shadow-xl flex items-center justify-center gap-3 border-2 border-amber-200 hover:scale-102 transition-transform"
          >
            <Sparkles className="w-6 h-6 animate-spin-slow" />
            <span>Pak je +{rewardStars} Sterren van Vandaag! ⭐</span>
          </button>
        ) : (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-emerald-900 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div className="text-left">
              <span className="font-display font-bold text-sm block">
                Je hebt je beloning voor vandaag al binnen! 🎉
              </span>
              <span className="text-xs font-reading text-emerald-700 block">
                Kom morgen terug voor je volgende sterren en om je reeks te behouden!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
