import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { BlokOverview } from './components/BlokOverview';
import { ExerciseCard } from './components/ExerciseCard';
import { StickerAlbum } from './components/StickerAlbum';
import { DiplomaModal } from './components/DiplomaModal';
import { NameModal } from './components/NameModal';
import { DailyCheckInModal } from './components/DailyCheckInModal';
import {
  EXERCISES,
  CATEGORIES,
  INITIAL_STICKERS,
  ExerciseCategory,
  Exercise,
  Sticker,
  BlokId,
} from './data/exercises';
import { sounds } from './utils/audio';
import { ArrowLeft, Star, RotateCcw, Award, CheckCircle, Sparkles, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

// Daily Check-In Date Helpers
const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getYesterdayDateString = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function App() {
  const [view, setView] = useState<'home' | 'exercise' | 'summary'>('home');
  const [currentBlok, setCurrentBlok] = useState<BlokId>(() => {
    const saved = localStorage.getItem('rekenpret_active_blok');
    return saved === '1' ? 1 : 2; // Default to Blok 2 (newly requested)
  });
  const [currentCategory, setCurrentCategory] = useState<ExerciseCategory | 'mix' | null>(null);
  const [activeExercises, setActiveExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Pupil Name & Avatar state (persisted in localStorage)
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('rekenpret_student_name') || 'Super Speurder';
  });

  const [studentAvatar, setStudentAvatar] = useState<string>(() => {
    return localStorage.getItem('rekenpret_student_avatar') || '🦁';
  });

  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  // Daily check-in state
  const [streak, setStreak] = useState<number>(() => {
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();
    const lastDate = localStorage.getItem('rekenpret_last_checkin_date');
    const savedStreak = parseInt(localStorage.getItem('rekenpret_checkin_streak') || '1', 10);
    const validStreak = savedStreak > 0 ? savedStreak : 1;

    if (!lastDate) {
      return 1;
    }
    if (lastDate === today) {
      return validStreak;
    }
    if (lastDate === yesterday) {
      return validStreak + 1;
    }
    return 1;
  });

  const [todayClaimed, setTodayClaimed] = useState<boolean>(() => {
    const today = getTodayDateString();
    const lastDate = localStorage.getItem('rekenpret_last_checkin_date');
    return lastDate === today;
  });

  const [isDailyCheckInOpen, setIsDailyCheckInOpen] = useState(false);

  // Auto-open daily check-in modal on start if reward is not yet claimed
  useEffect(() => {
    if (!todayClaimed) {
      const timer = setTimeout(() => {
        setIsDailyCheckInOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const currentDayInCycle = ((streak - 1) % 7) + 1;
  const rewardStars =
    currentDayInCycle === 7
      ? 10
      : currentDayInCycle >= 5
      ? 5
      : currentDayInCycle >= 3
      ? 4
      : 3;

  const handleClaimDailyReward = () => {
    const today = getTodayDateString();
    setTotalStars((prev) => prev + rewardStars);
    setTodayClaimed(true);
    localStorage.setItem('rekenpret_last_checkin_date', today);
    localStorage.setItem('rekenpret_checkin_streak', streak.toString());
  };

  // Pupil state (persisted in localStorage)
  const [totalStars, setTotalStars] = useState<number>(() => {
    const saved = localStorage.getItem('rekenpret_stars');
    return saved ? parseInt(saved, 10) : 5; // start with 5 stars to encourage!
  });

  const [stickers, setStickers] = useState<Sticker[]>(() => {
    const saved = localStorage.getItem('rekenpret_stickers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_STICKERS;
      }
    }
    return INITIAL_STICKERS;
  });

  const [completedExerciseIds, setCompletedExerciseIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('rekenpret_completed');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Settings
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [fontFamily, setFontFamily] = useState<'Lexend' | 'Fredoka' | 'Comic Neue'>(() => {
    const saved = localStorage.getItem('rekenpret_font');
    if (saved === 'Fredoka' || saved === 'Comic Neue' || saved === 'Lexend') {
      return saved;
    }
    return 'Lexend';
  });
  const [isStickersOpen, setIsStickersOpen] = useState(false);
  const [isDiplomaOpen, setIsDiplomaOpen] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);

  // Sync pupil profile
  useEffect(() => {
    localStorage.setItem('rekenpret_student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('rekenpret_student_avatar', studentAvatar);
  }, [studentAvatar]);

  // Sync active blok in localStorage
  useEffect(() => {
    localStorage.setItem('rekenpret_active_blok', currentBlok.toString());
  }, [currentBlok]);

  // Sync stars and unlock stickers
  useEffect(() => {
    localStorage.setItem('rekenpret_stars', totalStars.toString());

    setStickers((prev) =>
      prev.map((s) => {
        if (!s.unlocked && totalStars >= s.requiredStars) {
          return { ...s, unlocked: true };
        }
        return s;
      })
    );
  }, [totalStars]);

  useEffect(() => {
    localStorage.setItem('rekenpret_stickers', JSON.stringify(stickers));
  }, [stickers]);

  useEffect(() => {
    localStorage.setItem('rekenpret_completed', JSON.stringify(completedExerciseIds));
  }, [completedExerciseIds]);

  // Apply selected font family class to document body
  useEffect(() => {
    document.body.classList.remove('font-theme-lexend', 'font-theme-fredoka', 'font-theme-comic');
    if (fontFamily === 'Fredoka') {
      document.body.classList.add('font-theme-fredoka');
    } else if (fontFamily === 'Comic Neue') {
      document.body.classList.add('font-theme-comic');
    } else {
      document.body.classList.add('font-theme-lexend');
    }
    localStorage.setItem('rekenpret_font', fontFamily);
  }, [fontFamily]);

  // Calculate category stats
  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; completed: number }> = {};
    CATEGORIES.forEach((cat) => {
      const allForCat = EXERCISES.filter((e) => e.category === cat.id);
      const finishedForCat = allForCat.filter((e) => completedExerciseIds.includes(e.id));
      stats[cat.id] = {
        total: allForCat.length,
        completed: finishedForCat.length,
      };
    });
    return stats;
  }, [completedExerciseIds]);

  // Start specific category
  const handleSelectCategory = (cat: ExerciseCategory) => {
    const questions = EXERCISES.filter((e) => e.category === cat);
    if (questions.length === 0) return;

    setCurrentCategory(cat);
    setActiveExercises(questions);
    setCurrentIndex(0);
    setSessionScore(0);
    setView('exercise');
  };

  // Start mixed review for a specific Blok
  const handleStartMix = (blok: BlokId) => {
    const blokCats = CATEGORIES.filter((c) => c.blok === blok);
    const mixedList: Exercise[] = [];
    blokCats.forEach((cat) => {
      const catQuestions = EXERCISES.filter((e) => e.category === cat.id);
      if (catQuestions.length > 0) {
        mixedList.push(catQuestions[Math.floor(Math.random() * catQuestions.length)]);
      }
    });

    setCurrentCategory('mix');
    setActiveExercises(mixedList);
    setCurrentIndex(0);
    setSessionScore(0);
    setView('exercise');
  };

  // Correct answer callback
  const handleCorrect = () => {
    const currentQ = activeExercises[currentIndex];
    if (currentQ) {
      if (!completedExerciseIds.includes(currentQ.id)) {
        setCompletedExerciseIds((prev) => [...prev, currentQ.id]);
        setTotalStars((prev) => prev + 1);
      }
      setSessionScore((prev) => prev + 1);
    }
  };

  // Advance to next question
  const handleNext = () => {
    sounds.playClick();
    if (currentIndex + 1 < activeExercises.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      sounds.playFanfare();
      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.5 },
      });
      setView('summary');
    }
  };

  const handleReturnHome = () => {
    sounds.playClick();
    setView('home');
    setCurrentCategory(null);
  };

  const handleSaveStudentProfile = (name: string, avatar: string) => {
    setStudentName(name);
    setStudentAvatar(avatar);
  };

  const currentExercise = activeExercises[currentIndex];

  const categoryTitle = useMemo(() => {
    if (currentCategory === 'mix') return `Grote Blok ${currentBlok} Oefenmix`;
    const found = CATEGORIES.find((c) => c.id === currentCategory);
    return found ? found.title : 'Rekenles';
  }, [currentCategory, currentBlok]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-amber-100/30 to-amber-50/90 text-slate-800 flex flex-col justify-between selection:bg-amber-200">
      {/* Top Navigation & App Bar */}
      <Header
        studentName={studentName}
        studentAvatar={studentAvatar}
        onOpenNameModal={() => setIsNameModalOpen(true)}
        streak={streak}
        todayClaimed={todayClaimed}
        onOpenDailyCheckIn={() => setIsDailyCheckInOpen(true)}
        totalStars={totalStars}
        autoSpeak={autoSpeak}
        onToggleAutoSpeak={() => setAutoSpeak(!autoSpeak)}
        fontFamily={fontFamily}
        onChangeFont={(font) => setFontFamily(font as any)}
        onOpenStickers={() => setIsStickersOpen(true)}
        onOpenDiploma={() => setIsDiplomaOpen(true)}
        onGoHome={handleReturnHome}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center p-3 sm:p-6 max-w-6xl w-full mx-auto">
        {/* VIEW 1: HOME OVERVIEW (Blok 1 & Blok 2) */}
        {view === 'home' && (
          <BlokOverview
            studentName={studentName}
            studentAvatar={studentAvatar}
            onOpenNameModal={() => setIsNameModalOpen(true)}
            currentBlok={currentBlok}
            onChangeBlok={(b) => setCurrentBlok(b)}
            onSelectCategory={handleSelectCategory}
            onStartMix={handleStartMix}
            categoryStats={categoryStats}
            totalStars={totalStars}
            streak={streak}
            todayClaimed={todayClaimed}
            onOpenDailyCheckIn={() => setIsDailyCheckInOpen(true)}
          />
        )}

        {/* VIEW 2: ACTIVE EXERCISE */}
        {view === 'exercise' && currentExercise && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            {/* Top Bar inside Exercise */}
            <div className="w-full max-w-3xl flex items-center justify-between mb-4 px-2">
              <button
                onClick={handleReturnHome}
                className="chromebook-btn flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-amber-100 border-2 border-amber-300 text-slate-700 font-display font-bold text-sm shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Terug naar menu</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="font-display font-bold text-sm sm:text-base text-slate-700 bg-white px-3 py-1 rounded-xl border border-amber-200 shadow-sm">
                  Vraag {currentIndex + 1} van {activeExercises.length}
                </span>

                {/* Progress bar */}
                <div className="w-24 sm:w-36 h-4 bg-amber-200/80 rounded-full overflow-hidden p-0.5 border border-amber-300">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      currentBlok === 2
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                        : 'bg-gradient-to-r from-amber-400 to-orange-500'
                    }`}
                    style={{
                      width: `${((currentIndex + 1) / activeExercises.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Exercise Card */}
            <ExerciseCard
              exercise={currentExercise}
              onCorrect={handleCorrect}
              onNext={handleNext}
              autoSpeak={autoSpeak}
            />
          </div>
        )}

        {/* VIEW 3: SUMMARY SCREEN */}
        {view === 'summary' && (
          <div className="w-full max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 text-center animate-scale-up">
            <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-3xl flex items-center justify-center text-5xl shadow-lg border-2 border-white">
              🎉
            </div>

            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 font-display font-bold text-xs rounded-full mb-2 border border-amber-200">
              {categoryTitle} afgerond!
            </span>

            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mb-2">
              Fantastisch gerekend, {studentName}! 🌟
            </h2>

            <p className="font-reading text-slate-600 text-sm sm:text-base mb-6">
              Je hebt alle vragen van deze les beantwoord. Je rekenbrein is weer een stukje sterker geworden!
            </p>

            {/* Stars summary banner */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-2xl border-2 border-amber-200 mb-6 flex items-center justify-around">
              <div className="text-center">
                <span className="block text-xs font-reading text-slate-500">Goed beantwoord</span>
                <span className="font-display font-black text-2xl text-emerald-600">
                  {sessionScore} / {activeExercises.length}
                </span>
              </div>
              <div className="w-px h-10 bg-amber-200" />
              <div className="text-center">
                <span className="block text-xs font-reading text-slate-500">Totaal sterren</span>
                <span className="font-display font-black text-2xl text-amber-600 flex items-center justify-center gap-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                  {totalStars}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  if (currentCategory === 'mix') {
                    handleStartMix(currentBlok);
                  } else if (currentCategory) {
                    handleSelectCategory(currentCategory);
                  }
                }}
                className="chromebook-btn w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-display font-bold text-base border-2 border-amber-300"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Nog een keer oefenen</span>
              </button>

              <button
                onClick={handleReturnHome}
                className="chromebook-btn w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-display font-bold text-base shadow-lg"
              >
                <Home className="w-5 h-5" />
                <span>Kies een andere les</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer info for school/Chromebooks */}
      <footer className="py-3 px-4 text-center text-xs text-slate-400 font-reading">
        <span>Rekenpret 1e Leerjaar • Blok 1 & Blok 2 Rekenroute • 100% kid-safe</span>
      </footer>

      {/* Modals: Name Modal, Sticker Album & Diploma */}
      {isNameModalOpen && (
        <NameModal
          currentName={studentName}
          currentAvatar={studentAvatar}
          onSave={handleSaveStudentProfile}
          onClose={() => setIsNameModalOpen(false)}
        />
      )}

      {isStickersOpen && (
        <StickerAlbum
          stickers={stickers}
          totalStars={totalStars}
          onClose={() => setIsStickersOpen(false)}
        />
      )}

      {isDiplomaOpen && (
        <DiplomaModal
          totalStars={totalStars}
          studentName={studentName}
          onUpdateStudentName={(name) => setStudentName(name)}
          initialBlok={currentBlok}
          onClose={() => setIsDiplomaOpen(false)}
        />
      )}

      {isDailyCheckInOpen && (
        <DailyCheckInModal
          streak={streak}
          todayClaimed={todayClaimed}
          rewardStars={rewardStars}
          studentName={studentName}
          onClaim={handleClaimDailyReward}
          onClose={() => setIsDailyCheckInOpen(false)}
        />
      )}
    </div>
  );
}
