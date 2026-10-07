import React, { useState } from 'react';
import {
  CATEGORIES,
  ExerciseCategory,
  CategoryMeta,
  BlokId,
  ExerciseDomain,
} from '../data/exercises';
import { sounds } from '../utils/audio';
import {
  Hash,
  Scale,
  Calculator,
  ListOrdered,
  Compass,
  Sparkles,
  Ruler,
  PenTool,
  Play,
  Star,
  CheckCircle2,
  BookOpen,
  Search,
  Circle,
  Equal,
  ArrowRight,
  LayoutGrid,
  Filter,
} from 'lucide-react';

interface BlokOverviewProps {
  studentName: string;
  studentAvatar: string;
  onOpenNameModal: () => void;
  currentBlok: BlokId;
  onChangeBlok: (blok: BlokId) => void;
  onSelectCategory: (cat: ExerciseCategory) => void;
  onStartMix: (blok: BlokId) => void;
  categoryStats: Record<string, { total: number; completed: number }>;
  totalStars: number;
  streak?: number;
  todayClaimed?: boolean;
  onOpenDailyCheckIn?: () => void;
}

export const BlokOverview: React.FC<BlokOverviewProps> = ({
  studentName,
  studentAvatar,
  onOpenNameModal,
  currentBlok,
  onChangeBlok,
  onSelectCategory,
  onStartMix,
  categoryStats,
  totalStars,
  streak = 1,
  todayClaimed = false,
  onOpenDailyCheckIn,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<ExerciseDomain>('alles');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hash':
        return <Hash className="w-7 h-7 text-amber-600" />;
      case 'Scale':
        return <Scale className="w-7 h-7 text-blue-600" />;
      case 'PlusMinus':
        return <Calculator className="w-7 h-7 text-rose-600" />;
      case 'ListOrdered':
        return <ListOrdered className="w-7 h-7 text-purple-600" />;
      case 'Compass':
        return <Compass className="w-7 h-7 text-rose-600" />;
      case 'Sparkles':
        return <Sparkles className="w-7 h-7 text-indigo-600" />;
      case 'Ruler':
        return <Ruler className="w-7 h-7 text-yellow-600" />;
      case 'PenTool':
        return <PenTool className="w-7 h-7 text-emerald-600" />;
      case 'Search':
        return <Search className="w-7 h-7 text-teal-600" />;
      case 'Circle':
        return <Circle className="w-7 h-7 text-blue-600" />;
      case 'Calculator':
        return <Calculator className="w-7 h-7 text-violet-600" />;
      case 'Equal':
        return <Equal className="w-7 h-7 text-cyan-600" />;
      case 'Crocodile':
        return <span className="text-2xl">🐊</span>;
      case 'ArrowRight':
        return <ArrowRight className="w-7 h-7 text-sky-600" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-7 h-7 text-amber-600" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-7 h-7 text-pink-600" />;
      default:
        return <BookOpen className="w-7 h-7 text-amber-600" />;
    }
  };

  // Filter categories by current blok and domain
  const filteredCategories = CATEGORIES.filter((cat) => {
    if (cat.blok !== currentBlok) return false;
    if (selectedDomain === 'alles') return true;
    return cat.domain === selectedDomain;
  });

  // Calculate totals for active blok
  const blokCategories = CATEGORIES.filter((c) => c.blok === currentBlok);
  const totalBlokQuestions = blokCategories.reduce((acc, c) => acc + (categoryStats[c.id]?.total || 0), 0);
  const completedBlokQuestions = blokCategories.reduce((acc, c) => acc + (categoryStats[c.id]?.completed || 0), 0);
  const blokPercent = totalBlokQuestions > 0 ? Math.round((completedBlokQuestions / totalBlokQuestions) * 100) : 0;

  // Domain filters list
  const domains: { id: ExerciseDomain; label: string; icon: string }[] = [
    { id: 'alles', label: 'Alles tonen', icon: '🌈' },
    { id: 'getallen', label: 'Getallen & Tellen', icon: '🔢' },
    { id: 'bewerkingen', label: 'Plus & Min (+/-)', icon: '➕' },
    { id: 'vergelijken', label: 'Vergelijken (=, ≠, <, >)', icon: '⚖️' },
    { id: 'meten', label: 'Meten (Inhoud & Massa)', icon: '📏' },
    { id: 'logica', label: 'Logica & Patronen', icon: '🎨' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-3 px-2 sm:px-6 animate-fade-in">
      {/* 1. BLOK SELECTOR TABS (Blok 1 vs Blok 2) */}
      <div className="bg-white/90 backdrop-blur-sm p-2 rounded-3xl border-3 border-amber-300 shadow-sm mb-6 max-w-2xl mx-auto flex gap-2">
        <button
          onClick={() => {
            sounds.playClick();
            onChangeBlok(1);
            setSelectedDomain('alles');
          }}
          className={`chromebook-btn flex-1 py-3 px-4 rounded-2xl font-display font-black text-base sm:text-lg transition-all flex items-center justify-center gap-2.5 ${
            currentBlok === 1
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md ring-2 ring-amber-300 scale-102'
              : 'bg-amber-50/60 hover:bg-amber-100 text-slate-700'
          }`}
        >
          <span className="text-xl">🎒</span>
          <div className="text-left">
            <span className="block leading-tight">Blok 1</span>
            <span className={`text-[10px] sm:text-xs font-reading block ${currentBlok === 1 ? 'text-amber-100' : 'text-slate-500'}`}>
              8 lessen • 100% op scherm
            </span>
          </div>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            onChangeBlok(2);
            setSelectedDomain('alles');
          }}
          className={`chromebook-btn flex-1 py-3 px-4 rounded-2xl font-display font-black text-base sm:text-lg transition-all flex items-center justify-center gap-2.5 relative ${
            currentBlok === 2
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md ring-2 ring-emerald-300 scale-102'
              : 'bg-emerald-50/60 hover:bg-emerald-100 text-slate-700'
          }`}
        >
          <span className="text-xl">🌟</span>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="leading-tight">Blok 2</span>
              <span className="px-1.5 py-0.2 bg-amber-400 text-amber-950 text-[10px] font-bold rounded-full">
                NIEUW
              </span>
            </div>
            <span className={`text-[10px] sm:text-xs font-reading block ${currentBlok === 2 ? 'text-emerald-100' : 'text-slate-500'}`}>
              10 lessen • 100% op scherm
            </span>
          </div>
        </button>
      </div>

      {/* 2. DYNAMIC HERO BANNER */}
      <div
        className={`rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-6 relative overflow-hidden border-4 transition-all ${
          currentBlok === 2
            ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 border-emerald-300'
            : 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 border-amber-300'
        }`}
      >
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-display font-bold mb-3 border border-white/30">
            <span>✨ 100% Digitaal</span>
            <span>•</span>
            <span>Geen werkboek nodig, alles staat op je scherm!</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl leading-tight mb-2 text-white drop-shadow-sm flex items-center gap-2 flex-wrap">
            <span>{studentAvatar}</span>
            <span>
              {currentBlok === 2
                ? `Welkom bij Blok 2, ${studentName || 'rekenkampioen'}! 🌟`
                : `Klaar om te oefenen, ${studentName || 'rekenkampioen'}? 🚀`}
            </span>
            <button
              onClick={() => {
                sounds.playClick();
                onOpenNameModal();
              }}
              className="text-xs font-reading font-normal bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-full border border-white/40 transition-colors inline-flex items-center gap-1 align-middle"
              title="Verander je naam of figuurtje"
            >
              ✏️ Naam aanpassen
            </button>
          </h1>

          <p className="font-reading text-base sm:text-lg text-white/95 mb-5 drop-shadow-sm">
            {currentBlok === 2
              ? 'Leer het getal 0, 5 en 6 kennen, rekenverhalen met plus (+) en min (-), optellen tot 6, vergelijken met de hongerige krokodil (< en >), inhoud en massa!'
              : 'Oefen met tellen tot 6, meer en minder, de rangtelwoorden in de rij, vormenpatronen en het netjes schrijven van cijfers.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                onStartMix(currentBlok);
              }}
              className="chromebook-btn flex items-center gap-2.5 bg-white text-slate-900 font-display font-black text-lg px-7 py-3.5 rounded-2xl shadow-lg border-2 border-white/60 hover:scale-105"
            >
              <Play className={`w-6 h-6 fill-current ${currentBlok === 2 ? 'text-teal-600' : 'text-amber-500'}`} />
              <span>Grote Blok {currentBlok} Oefenmix! 🚀</span>
            </button>

            {onOpenDailyCheckIn && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenDailyCheckIn();
                }}
                className={`chromebook-btn flex items-center gap-2 px-5 py-3.5 rounded-2xl font-display font-black text-sm sm:text-base shadow-lg transition-transform hover:scale-105 ${
                  !todayClaimed
                    ? 'bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 text-slate-900 border-2 border-yellow-100 animate-pulse'
                    : 'bg-black/20 hover:bg-black/30 border border-white/30 text-white'
                }`}
              >
                <span className="text-xl">{!todayClaimed ? '🎁' : '🔥'}</span>
                <span>{!todayClaimed ? 'Dagelijkse Beloning!' : `${streak} ${streak === 1 ? 'dag' : 'dagen'} reeks`}</span>
                {!todayClaimed ? (
                  <span className="bg-white/80 text-orange-800 text-[11px] px-2 py-0.5 rounded-full font-bold">
                    Pak sterren!
                  </span>
                ) : (
                  <span className="text-emerald-300 font-bold">✓</span>
                )}
              </button>
            )}

            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/30">
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-spin-slow" />
              <span className="font-display font-bold text-sm sm:text-base">
                {completedBlokQuestions} / {totalBlokQuestions} vragen klaar ({blokPercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* Decorative badge mascot */}
        <div className="absolute -right-3 -bottom-3 opacity-25 sm:opacity-85 pointer-events-none select-none text-8xl sm:text-9xl transform -rotate-6">
          {currentBlok === 2 ? '🐊' : '🧸'}
        </div>
      </div>

      {/* 3. DOMAIN FILTER PILLS */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2 px-1">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="font-display font-bold text-xs sm:text-sm text-slate-600">
            Kies een vakdomein of bekijk alles:
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {domains.map((dom) => {
            const isActive = selectedDomain === dom.id;
            return (
              <button
                key={dom.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedDomain(dom.id);
                }}
                className={`chromebook-btn px-4 py-2 rounded-2xl text-xs sm:text-sm font-display font-bold whitespace-nowrap transition-all border-2 flex items-center gap-1.5 ${
                  isActive
                    ? currentBlok === 2
                      ? 'bg-teal-600 text-white border-teal-700 shadow-sm'
                      : 'bg-amber-500 text-white border-amber-600 shadow-sm'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <span>{dom.icon}</span>
                <span>{dom.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. CURRICULUM LESSON CARDS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h2 className="font-display font-black text-2xl text-slate-800">
              Lessen in Blok {currentBlok}:
            </h2>
            <p className="font-reading text-sm text-slate-500">
              100% zelfstandig op te lossen op het scherm (zonder werkboek)
            </p>
          </div>

          <span className="text-xs font-display font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
            {filteredCategories.length} lesonderwerpen
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredCategories.map((cat) => {
            const stats = categoryStats[cat.id] || { total: 0, completed: 0 };
            const isFinished = stats.completed > 0 && stats.completed >= stats.total;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  onSelectCategory(cat.id);
                }}
                className={`chromebook-btn text-left p-5 rounded-3xl border-3 transition-all flex flex-col justify-between shadow-sm hover:shadow-md bg-white ${cat.borderColor} ${cat.bgLight} group relative overflow-hidden`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-13 h-13 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <span className="text-[11px] font-display font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-lg text-slate-800 mb-1 leading-snug group-hover:text-amber-700 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="font-reading text-xs text-slate-600 line-clamp-2 mb-3">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-display font-bold">
                  <span className="text-slate-500 font-reading text-[11px]">
                    {cat.pageRef}
                  </span>

                  {isFinished ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Klaar!
                    </span>
                  ) : stats.completed > 0 ? (
                    <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                      {stats.completed}/{stats.total}
                    </span>
                  ) : (
                    <span className="text-slate-400 group-hover:text-amber-700">
                      Start ➔
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
