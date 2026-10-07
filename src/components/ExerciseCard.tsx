import React, { useState, useEffect } from 'react';
import {
  Volume2,
  CheckCircle,
  XCircle,
  ArrowRight,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Plus,
  Minus,
  Equal,
  Scale,
  Smile,
} from 'lucide-react';
import { Exercise } from '../data/exercises';
import { DiceVisual } from './DiceVisual';
import { TracingCanvas } from './TracingCanvas';
import { sounds, speakInstruction, stopSpeaking } from '../utils/audio';

interface ExerciseCardProps {
  exercise: Exercise;
  onCorrect: () => void;
  onNext: () => void;
  autoSpeak?: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onCorrect,
  onNext,
  autoSpeak = false,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showConnectingLines, setShowConnectingLines] = useState(false);

  // Pixel grid cell states (for pixel grid exercise)
  const [pixelCells, setPixelCells] = useState<boolean[]>([]);

  // Multi-step answers (like for one-more-less or order-length)
  const [multiOrder, setMultiOrder] = useState<Record<number, number>>({});
  const [neighborAnswers, setNeighborAnswers] = useState<{ less: number | null; more: number | null }>({
    less: null,
    more: null,
  });

  // Reset state on question change
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setShowHint(false);
    setShowConnectingLines(false);
    setMultiOrder({});
    setNeighborAnswers({ less: null, more: null });

    // Initialize pixel cells if pixel-grid
    if (exercise.visual?.pixelGrid) {
      setPixelCells(new Array(exercise.visual.pixelGrid.totalCells).fill(false));
    } else {
      setPixelCells([]);
    }

    if (autoSpeak) {
      handleSpeak();
    }

    return () => {
      stopSpeaking();
      setIsSpeaking(false);
    };
  }, [exercise.id, autoSpeak]);

  // Keyboard shortcut listener for Chromebook (0-6 for quick answering, Space for audio, Enter for next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space for audio
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        handleSpeak();
      }

      // Enter for next question if already correct
      if (e.key === 'Enter' && isAnswerChecked && isCorrect) {
        e.preventDefault();
        onNext();
      }

      // Number keys 0-6 for number choices
      if (!isAnswerChecked && exercise.options) {
        const num = parseInt(e.key, 10);
        if (!isNaN(num) && num >= 0 && num <= 6 && exercise.options.includes(num)) {
          handleSelectNumber(num);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [exercise, isAnswerChecked, isCorrect]);

  const handleSpeak = () => {
    setIsSpeaking(true);
    speakInstruction(exercise.speechText || exercise.instruction, () => {
      setIsSpeaking(false);
    });
  };

  const handleSelectNumber = (num: number) => {
    sounds.playClick();
    setSelectedAnswer(num);
    const correct = num === exercise.correctAnswer;
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      sounds.playCorrect();
      onCorrect();
    } else {
      sounds.playWrong();
    }
  };

  const handleSelectCompare = (choice: 'left' | 'right' | string) => {
    sounds.playClick();
    setSelectedAnswer(choice);
    const correct = choice === exercise.correctAnswer;
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      sounds.playCorrect();
      onCorrect();
    } else {
      sounds.playWrong();
    }
  };

  const handleSelectSign = (sign: string) => {
    sounds.playClick();
    setSelectedAnswer(sign);
    const correct = sign === exercise.correctAnswer;
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      sounds.playCorrect();
      onCorrect();
    } else {
      sounds.playWrong();
    }
  };

  const handleSelectEnough = (choice: 'ja' | 'nee') => {
    sounds.playClick();
    setSelectedAnswer(choice);
    const correct = choice === exercise.correctAnswer;
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      sounds.playCorrect();
      onCorrect();
    } else {
      sounds.playWrong();
    }
  };

  const handleSelectRowItem = (id: number) => {
    sounds.playClick();
    setSelectedAnswer(id);
    const correct = id === exercise.correctAnswer;
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      sounds.playCorrect();
      onCorrect();
    } else {
      sounds.playWrong();
    }
  };

  const handleSelectPatternCandidate = (candidate: string) => {
    sounds.playClick();
    setSelectedAnswer(candidate);
    const correct = candidate === exercise.correctAnswer;
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      sounds.playCorrect();
      onCorrect();
    } else {
      sounds.playWrong();
    }
  };

  const handleSelectPatternError = (index: number) => {
    sounds.playClick();
    setSelectedAnswer(index);
    const correct = index === exercise.correctAnswer;
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      sounds.playCorrect();
      onCorrect();
    } else {
      sounds.playWrong();
    }
  };

  const handleNeighborPick = (type: 'less' | 'more', val: number) => {
    sounds.playClick();
    const updated = { ...neighborAnswers, [type]: val };
    setNeighborAnswers(updated);

    if (updated.less !== null && updated.more !== null) {
      const correct =
        updated.less === exercise.correctAnswer.less && updated.more === exercise.correctAnswer.more;
      setIsCorrect(correct);
      setIsAnswerChecked(true);
      if (correct) {
        sounds.playCorrect();
        onCorrect();
      } else {
        sounds.playWrong();
      }
    }
  };

  const handleOrderLengthClick = (itemIndex: number, rank: number) => {
    sounds.playClick();
    const updated = { ...multiOrder, [itemIndex]: rank };
    setMultiOrder(updated);

    if (Object.keys(updated).length === 3) {
      const sortedKeys = [0, 1, 2].sort((a, b) => updated[a] - updated[b]);
      const actualOrder = sortedKeys.map((idx) => exercise.visual.lengths![idx].id);
      const isMatch = JSON.stringify(actualOrder) === JSON.stringify(exercise.correctAnswer);
      setIsCorrect(isMatch);
      setIsAnswerChecked(true);
      if (isMatch) {
        sounds.playCorrect();
        onCorrect();
      } else {
        sounds.playWrong();
      }
    }
  };

  const handleTracingComplete = () => {
    setIsCorrect(true);
    setIsAnswerChecked(true);
    onCorrect();
  };

  const handlePixelToggle = (idx: number) => {
    if (isAnswerChecked && isCorrect) return;
    sounds.playClick();
    const updated = [...pixelCells];
    updated[idx] = !updated[idx];
    setPixelCells(updated);

    const filledCount = updated.filter(Boolean).length;
    // Auto-check if matches target
    if (exercise.visual.pixelGrid && filledCount === exercise.visual.pixelGrid.targetCount) {
      setSelectedAnswer(filledCount);
      setIsCorrect(true);
      setIsAnswerChecked(true);
      sounds.playCorrect();
      onCorrect();
    }
  };

  const handleTryAgain = () => {
    sounds.playClick();
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setMultiOrder({});
    setNeighborAnswers({ less: null, more: null });
    if (exercise.visual?.pixelGrid) {
      setPixelCells(new Array(exercise.visual.pixelGrid.totalCells).fill(false));
    }
  };

  // Helper for rendering item arrays like fish, apples, balloons
  const renderItemGrid = (items: string[], count?: number) => {
    const displayItems = count ? Array(count).fill(items[0] || '⭐') : items;
    return (
      <div className="flex flex-wrap items-center justify-center gap-3 py-4 max-w-xl mx-auto">
        {displayItems.map((icon, i) => (
          <div
            key={i}
            className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white rounded-2xl shadow-sm border-2 border-amber-200 text-3xl sm:text-4xl transform hover:scale-110 transition-transform animate-scale-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {icon}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-amber-200 flex flex-col justify-between min-h-[480px]">
      {/* Top Banner with Instruction and Audio Button */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`inline-block px-3 py-1 font-display font-semibold rounded-full text-xs sm:text-sm border ${
                exercise.blok === 2
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border-amber-200'
              }`}>
                {exercise.blok === 2 ? '🌟 Blok 2' : '📚 Blok 1'} • {exercise.title}
              </span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 leading-snug">
              {exercise.instruction}
            </h2>
          </div>

          {/* Big Chromebook-friendly Audio Reader Button */}
          <button
            onClick={handleSpeak}
            className={`chromebook-btn flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl font-display font-bold text-sm sm:text-base transition-all shadow-md shrink-0 ${
              isSpeaking
                ? 'bg-amber-400 text-amber-950 ring-4 ring-amber-300 animate-pulse'
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200'
            }`}
            title="Klik om de vraag voor te lezen (of druk op Spatiebalk)"
            aria-label="Lees de vraag voor"
          >
            <Volume2 className={`w-6 h-6 ${isSpeaking ? 'animate-bounce' : ''}`} />
            <span className="hidden sm:inline">{isSpeaking ? 'Aan het lezen...' : 'Lees voor'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Visual Center */}
      <div className="my-auto py-2 flex flex-col items-center justify-center w-full">
        {/* TYPE: TRACING CANVAS (0, 1-6) */}
        {exercise.visual.kind === 'tracing' && (
          <TracingCanvas digit={exercise.correctAnswer} onComplete={handleTracingComplete} />
        )}

        {/* TYPE: EMPTY ZERO (vissenkom / kooi / leeg) */}
        {exercise.visual.kind === 'empty-zero' && (
          <div className="relative w-72 h-56 bg-gradient-to-b from-sky-50 to-blue-100 border-4 border-dashed border-sky-300 rounded-[40px] flex flex-col items-center justify-center p-4 shadow-inner text-center">
            <div className="text-6xl mb-2 animate-bounce">🫧</div>
            <div className="font-display font-black text-2xl text-sky-800">
              Helemaal leeg!
            </div>
            <p className="font-reading text-xs text-sky-600 mt-1">
              Er zit niets in... Dat is het getal <strong>0</strong>!
            </p>
          </div>
        )}

        {/* TYPE: FISH IN JAR */}
        {exercise.visual.kind === 'fish-jar' && (
          <div className="relative w-64 h-56 sm:w-80 sm:h-64 bg-cyan-100/70 border-4 border-cyan-400 rounded-[50px] shadow-inner p-4 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-4 left-6 text-cyan-300 text-xl animate-bounce">🫧</div>
            <div className="absolute bottom-6 right-8 text-cyan-300 text-sm animate-bounce" style={{ animationDelay: '0.5s' }}>🫧</div>
            <div className="flex flex-wrap items-center justify-center gap-4 z-10">
              {exercise.visual.items?.map((fish, idx) => (
                <span
                  key={idx}
                  className="text-5xl sm:text-6xl transform hover:scale-125 transition-transform animate-wiggle"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  {fish}
                </span>
              ))}
            </div>
            <div className="absolute bottom-0 inset-x-0 h-6 bg-amber-200/60 rounded-b-[46px]" />
          </div>
        )}

        {/* TYPE: DICE */}
        {exercise.visual.kind === 'dice' && (
          <div className="p-4 bg-amber-100/50 rounded-3xl border-2 border-amber-200 flex flex-col items-center">
            <DiceVisual count={exercise.visual.count ?? 1} size="lg" />
            <span className="mt-3 text-slate-600 font-display font-medium text-sm">
              Stippenbeeld van de dobbelsteen
            </span>
          </div>
        )}

        {/* TYPE: CHOCOLATE BAR (Pagina 47) */}
        {exercise.visual.kind === 'chocolate-bar' && exercise.visual.chocolate && (
          <div className="flex flex-col items-center">
            <div className="bg-amber-900 p-3 rounded-2xl shadow-xl border-4 border-amber-950 inline-block">
              <div className="grid grid-cols-2 gap-2 bg-amber-800 p-2 rounded-xl">
                {[...Array(exercise.visual.chocolate.pieces)].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-16 h-14 sm:w-20 sm:h-16 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 rounded-lg shadow-inner border border-amber-600/60 flex items-center justify-center text-amber-200/40 text-xs font-bold"
                  >
                    🍫
                  </div>
                ))}
              </div>
            </div>
            <span className="mt-3 font-display font-semibold text-amber-900 text-sm">
              Chocoladereep met {exercise.visual.chocolate.pieces} blokjes
            </span>
          </div>
        )}

        {/* TYPE: TEN FRAME / TRAY / EIERDOOS (Pagina 41) */}
        {exercise.visual.kind === 'ten-frame-tray' && exercise.visual.tenFrame && (
          <div className="flex flex-col items-center">
            <div className="bg-amber-100 border-4 border-amber-400 p-3 rounded-3xl shadow-md">
              <div className="grid grid-cols-3 gap-3 bg-amber-50 p-3 rounded-2xl border-2 border-amber-300">
                {[...Array(exercise.visual.tenFrame.total)].map((_, idx) => {
                  const isFilled = idx < exercise.visual.tenFrame!.filled;
                  return (
                    <div
                      key={idx}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl shadow-inner border-2 ${
                        isFilled
                          ? 'bg-white border-amber-300'
                          : 'bg-amber-100/40 border-dashed border-amber-300 opacity-40'
                      }`}
                    >
                      {isFilled ? exercise.visual.tenFrame!.itemIcon : ''}
                    </div>
                  );
                })}
              </div>
            </div>
            <span className="mt-2 text-xs font-display font-semibold text-amber-800">
              Eierdoos: tel hoeveel eieren er in zitten!
            </span>
          </div>
        )}

        {/* TYPE: STORY PLUS / MINUS (Pagina 36, 38) */}
        {exercise.visual.kind === 'story-plus-minus' && exercise.visual.story && (
          <div className="flex flex-col items-center w-full max-w-lg p-5 bg-gradient-to-b from-amber-50 to-orange-50/50 rounded-3xl border-3 border-amber-300 shadow-sm">
            <div className="w-24 h-24 rounded-3xl bg-white shadow-md border-2 border-amber-200 flex items-center justify-center text-6xl mb-3 animate-scale-up">
              {exercise.visual.story.sceneIcon}
            </div>

            <p className="font-display font-bold text-lg sm:text-xl text-slate-800 text-center mb-3">
              "{exercise.visual.story.actionText}"
            </p>

            <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-2xl border border-amber-300 shadow-sm text-sm font-reading text-slate-700">
              <span>👉 Gebeurt er iets</span>
              <strong className="text-emerald-700">ERBIJ (+)</strong>
              <span>of</span>
              <strong className="text-rose-700">ERAF (-)</strong>?
            </div>
          </div>
        )}

        {/* TYPE: COMPARE EQUAL SIGNS (= of ≠) (Pagina 37) */}
        {exercise.visual.kind === 'compare-equal-signs' && (
          <div className="flex flex-col items-center w-full max-w-xl">
            <div className="flex items-center justify-center gap-3 sm:gap-6 w-full p-4 bg-amber-50/70 rounded-3xl border-2 border-amber-300">
              {/* Left group */}
              <div className="flex-1 bg-white p-4 rounded-2xl border-2 border-amber-200 flex flex-col items-center shadow-sm min-h-[110px] justify-center">
                {exercise.visual.left ? (
                  <>
                    <span className="font-display font-bold text-xs text-slate-600 mb-2">
                      {exercise.visual.left.label}
                    </span>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {exercise.visual.left.items.map((it, i) => (
                        <span key={i} className="text-3xl">{it}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <span className="font-display font-black text-4xl text-blue-700">
                    {exercise.visual.detail?.split('[ ? ]')[0]?.trim()}
                  </span>
                )}
              </div>

              {/* Middle Question Sign */}
              <div className="w-14 h-14 rounded-2xl bg-amber-200 border-2 border-amber-400 flex items-center justify-center font-display font-black text-2xl text-amber-900 shadow-sm shrink-0">
                {selectedAnswer ?? '?'}
              </div>

              {/* Right group */}
              <div className="flex-1 bg-white p-4 rounded-2xl border-2 border-amber-200 flex flex-col items-center shadow-sm min-h-[110px] justify-center">
                {exercise.visual.right ? (
                  <>
                    <span className="font-display font-bold text-xs text-slate-600 mb-2">
                      {exercise.visual.right.label}
                    </span>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {exercise.visual.right.items.map((it, i) => (
                        <span key={i} className="text-3xl">{it}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <span className="font-display font-black text-4xl text-blue-700">
                    {exercise.visual.detail?.split('[ ? ]')[1]?.trim()}
                  </span>
                )}
              </div>
            </div>

            <span className="mt-2 text-xs font-reading text-slate-500">
              = betekent evenveel (gelijk) • ≠ betekent niet evenveel (ongelijk)
            </span>
          </div>
        )}

        {/* TYPE: CROCODILE COMPARE (<, >, =) (Pagina 43) */}
        {exercise.visual.kind === 'crocodile-compare' && (
          <div className="flex flex-col items-center w-full max-w-xl">
            {/* Friendly Crocodile helper header */}
            <div className="flex items-center gap-2 bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-full text-xs sm:text-sm font-display font-bold mb-4 border border-emerald-300">
              <span>🐊 Hongerige Krokodil:</span>
              <span>"Ik eet altijd het MEESTE op!"</span>
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-6 w-full p-4 bg-emerald-50/70 rounded-3xl border-2 border-emerald-300">
              {/* Left group */}
              <div className="flex-1 bg-white p-4 rounded-2xl border-2 border-emerald-200 flex flex-col items-center shadow-sm min-h-[110px] justify-center">
                {exercise.visual.left ? (
                  <>
                    <span className="font-display font-bold text-xs text-slate-600 mb-2">
                      {exercise.visual.left.label}
                    </span>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {exercise.visual.left.items.map((it, i) => (
                        <span key={i} className="text-3xl">{it}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <span className="font-display font-black text-4xl sm:text-5xl text-emerald-800">
                    {exercise.visual.detail?.split('[ ? ]')[0]?.trim()}
                  </span>
                )}
              </div>

              {/* Crocodile sign box */}
              <div className="w-16 h-16 rounded-2xl bg-emerald-200 border-3 border-emerald-500 flex items-center justify-center font-display font-black text-3xl text-emerald-950 shadow-md shrink-0">
                {selectedAnswer ? (
                  selectedAnswer === '>' ? '🐊 >' : selectedAnswer === '<' ? '< 🐊' : '='
                ) : (
                  '?'
                )}
              </div>

              {/* Right group */}
              <div className="flex-1 bg-white p-4 rounded-2xl border-2 border-emerald-200 flex flex-col items-center shadow-sm min-h-[110px] justify-center">
                {exercise.visual.right ? (
                  <>
                    <span className="font-display font-bold text-xs text-slate-600 mb-2">
                      {exercise.visual.right.label}
                    </span>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {exercise.visual.right.items.map((it, i) => (
                        <span key={i} className="text-3xl">{it}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <span className="font-display font-black text-4xl sm:text-5xl text-emerald-800">
                    {exercise.visual.detail?.split('[ ? ]')[1]?.trim()}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TYPE: ADDITION EQUATION (Pagina 42, 44) */}
        {exercise.visual.kind === 'addition-equation' && exercise.visual.equation && (
          <div className="flex flex-col items-center w-full max-w-xl">
            <div className="flex items-center justify-center gap-2 sm:gap-4 p-5 bg-violet-50/80 rounded-3xl border-3 border-violet-300 w-full shadow-sm flex-wrap">
              {/* Part 1 */}
              <div className="flex flex-col items-center bg-white px-4 py-3 rounded-2xl border-2 border-violet-200 shadow-sm min-w-[70px]">
                <span className="font-display font-black text-3xl sm:text-4xl text-violet-800">
                  {exercise.visual.equation.part1}
                </span>
                {exercise.visual.equation.icon1 && (
                  <div className="flex gap-1 mt-1 text-xl">
                    {[...Array(exercise.visual.equation.part1)].map((_, i) => (
                      <span key={i}>{exercise.visual.equation!.icon1}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Operation Sign (+) */}
              <div className="w-10 h-10 rounded-full bg-violet-200 flex items-center justify-center text-violet-900 font-display font-black text-2xl">
                +
              </div>

              {/* Part 2 */}
              <div className="flex flex-col items-center bg-white px-4 py-3 rounded-2xl border-2 border-violet-200 shadow-sm min-w-[70px]">
                <span className="font-display font-black text-3xl sm:text-4xl text-violet-800">
                  {exercise.visual.equation.part2}
                </span>
                {exercise.visual.equation.icon2 && (
                  <div className="flex gap-1 mt-1 text-xl">
                    {[...Array(exercise.visual.equation.part2)].map((_, i) => (
                      <span key={i}>{exercise.visual.equation!.icon2}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Equals (=) */}
              <div className="w-10 h-10 rounded-full bg-violet-200 flex items-center justify-center text-violet-900 font-display font-black text-2xl">
                =
              </div>

              {/* Result Answer Box */}
              <div className="flex flex-col items-center bg-violet-100 border-3 border-dashed border-violet-500 px-5 py-3 rounded-2xl shadow-md min-w-[80px]">
                <span className="font-display font-black text-4xl text-violet-950">
                  {selectedAnswer ?? '?'}
                </span>
              </div>
            </div>

            {exercise.visual.equation.showCommutative && (
              <span className="mt-2 text-xs font-display font-bold text-violet-700 bg-violet-100 px-3 py-1 rounded-full">
                🔄 Wisseleigenschap: je mag de getallen omdraaien!
              </span>
            )}
          </div>
        )}

        {/* TYPE: NUMBER LINE (0-6) (Pagina 40) */}
        {exercise.visual.kind === 'number-line' && exercise.visual.numberLine && (
          <div className="flex flex-col items-center w-full max-w-xl">
            <div className="w-full p-6 bg-sky-50 rounded-3xl border-3 border-sky-300 shadow-sm flex flex-col items-center">
              {/* The axis line */}
              <div className="relative w-full my-6">
                <div className="h-2 bg-sky-500 rounded-full w-full" />
                <div className="absolute -right-2 -top-1.5 text-sky-600 text-base font-bold">➔</div>

                {/* Ticks and Numbers 0 to 6 */}
                <div className="flex justify-between items-center -mt-3.5 px-2">
                  {[0, 1, 2, 3, 4, 5, 6].map((num) => {
                    const isMissing = num === exercise.visual.numberLine!.missingPos;
                    return (
                      <div key={num} className="flex flex-col items-center">
                        <div className="w-1.5 h-6 bg-sky-700 rounded-full mb-2" />
                        {isMissing ? (
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-300 border-2 border-amber-500 flex items-center justify-center font-display font-black text-xl sm:text-2xl text-amber-950 shadow-md animate-pulse">
                            {selectedAnswer ?? '?'}
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-white border border-sky-200 flex items-center justify-center font-display font-black text-base sm:text-lg text-sky-900 shadow-sm">
                            {num}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <span className="mt-2 text-xs font-reading text-slate-500">
              Kijk naar de getallenas van 0 tot 6
            </span>
          </div>
        )}

        {/* TYPE: CUPS VOLUME (Pagina 33, 53) */}
        {exercise.visual.kind === 'cups-volume' && exercise.visual.volumeCups && (
          <div className="flex flex-col items-center w-full max-w-xl">
            <div className="grid grid-cols-4 gap-3 sm:gap-4 p-4 bg-orange-50/70 rounded-3xl border-2 border-orange-200 w-full">
              {exercise.visual.volumeCups.map((cup) => (
                <div key={cup.id} className="flex flex-col items-center bg-white p-3 rounded-2xl border border-orange-200 shadow-sm">
                  <span className="font-display font-bold text-xs text-slate-700 mb-2">
                    {cup.label}
                  </span>
                  {/* Cup graphic */}
                  <div className="w-14 h-24 bg-sky-50 rounded-b-xl border-2 border-sky-300 flex flex-col justify-end p-1 relative overflow-hidden shadow-inner">
                    <div
                      className="w-full rounded-b-lg transition-all"
                      style={{
                        height: `${cup.percentFull}%`,
                        backgroundColor: cup.liquidColor || '#fb923c',
                      }}
                    />
                  </div>
                  <span className="mt-2 text-[11px] font-reading text-slate-500">
                    {cup.percentFull === 0 ? 'Leeg' : cup.percentFull === 100 ? 'Vol' : `${cup.percentFull}%`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TYPE: BALANCE SCALE (Pagina 45, 46) */}
        {exercise.visual.kind === 'balance-scale' && exercise.visual.balance && (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="relative w-full h-52 bg-amber-50/80 rounded-3xl border-2 border-amber-300 p-4 flex flex-col items-center justify-center overflow-hidden">
              {/* Fulcrum base */}
              <div className="absolute bottom-6 w-12 h-16 bg-amber-800 rounded-t-lg shadow" />

              {/* Seesaw beam (tilted according to balance weight) */}
              <div
                className={`relative w-64 h-3 bg-amber-700 rounded-full shadow transition-transform duration-500 flex justify-between items-center px-2 ${
                  exercise.visual.balance.tilted === 'left'
                    ? 'transform rotate-12'
                    : exercise.visual.balance.tilted === 'right'
                    ? 'transform -rotate-12'
                    : ''
                }`}
              >
                {/* Left Pan */}
                <div className="w-16 h-14 bg-white rounded-xl border-2 border-amber-300 shadow-md -mt-16 flex flex-col items-center justify-center transform -rotate-12">
                  <span className="text-3xl">{exercise.visual.balance.leftItem.icon}</span>
                  <span className="text-[10px] font-bold text-slate-700">{exercise.visual.balance.leftItem.label}</span>
                </div>

                {/* Right Pan */}
                <div className="w-16 h-14 bg-white rounded-xl border-2 border-amber-300 shadow-md -mt-16 flex flex-col items-center justify-center transform rotate-12">
                  <span className="text-3xl">{exercise.visual.balance.rightItem.icon}</span>
                  <span className="text-[10px] font-bold text-slate-700">{exercise.visual.balance.rightItem.label}</span>
                </div>
              </div>

              <div className="absolute bottom-2 text-xs font-display font-semibold text-amber-900 bg-amber-200/70 px-3 py-0.5 rounded-full">
                ⚖️ De zwaarste kant zakt omlaag!
              </div>
            </div>
          </div>
        )}

        {/* TYPE: MASS ORDERING (Pagina 46, 53) */}
        {exercise.visual.kind === 'mass-ordering' && exercise.visual.massItems && (
          <div className="flex flex-col items-center w-full max-w-xl">
            <div className="grid grid-cols-4 gap-3 p-4 bg-teal-50 rounded-3xl border-2 border-teal-300 w-full">
              {exercise.visual.massItems.map((item) => (
                <div key={item.id} className="bg-white p-3 rounded-2xl border border-teal-200 flex flex-col items-center text-center shadow-sm">
                  <span className="text-4xl mb-1">{item.icon}</span>
                  <span className="font-display font-bold text-xs text-slate-800 mb-1">{item.label}</span>
                  <span className="text-[10px] text-teal-700 font-reading">
                    {item.weightRank === 1 ? 'Lichtst (1)' : item.weightRank === 4 ? 'Zwaarst (4)' : `Nummer ${item.weightRank}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TYPE: PIXEL GRID (Pagina 48) */}
        {exercise.visual.kind === 'pixel-grid' && exercise.visual.pixelGrid && (
          <div className="flex flex-col items-center w-full max-w-md">
            <div className="bg-blue-50 p-4 rounded-3xl border-2 border-blue-300 flex flex-col items-center w-full shadow-sm">
              <div className="bg-white px-4 py-1.5 rounded-full font-display font-bold text-blue-900 text-sm mb-3 border border-blue-200">
                {exercise.visual.pixelGrid.codeText}
              </div>

              <div className="flex gap-2 p-3 bg-white rounded-2xl border-2 border-blue-200">
                {pixelCells.map((isFilled, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePixelToggle(idx)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 transition-all flex items-center justify-center text-2xl ${
                      isFilled
                        ? 'bg-blue-500 border-blue-600 text-white shadow-md scale-105'
                        : 'bg-slate-50 border-slate-300 hover:bg-blue-100'
                    }`}
                  >
                    {isFilled ? '🟦' : ''}
                  </button>
                ))}
              </div>

              <p className="mt-3 text-xs font-reading text-blue-700">
                Klik op de vakjes om ze blauw te kleuren volgens de code!
              </p>
            </div>
          </div>
        )}

        {/* TYPE: GRID OF ITEMS (apples, bears, etc.) */}
        {exercise.visual.kind === 'grid-items' && (
          renderItemGrid(exercise.visual.items || [], exercise.visual.count)
        )}

        {/* TYPE: MATH STORY (1 more, 1 less visuals) */}
        {exercise.visual.kind === 'math-story' && (
          <div className="flex flex-col items-center gap-2">
            {renderItemGrid(exercise.visual.items || [], exercise.visual.count)}
            <div className="bg-amber-100/80 px-4 py-1.5 rounded-full text-amber-900 font-display font-bold text-sm">
              {exercise.visual.detail}
            </div>
          </div>
        )}

        {/* TYPE: NEIGHBORS (getallenburen) */}
        {exercise.visual.kind === 'neighbors' && (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex items-center justify-center gap-3 sm:gap-6">
              <div className="flex flex-col items-center">
                <span className="font-display font-bold text-xs sm:text-sm text-slate-500 mb-1">
                  1 MINDER ⬅️
                </span>
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 flex items-center justify-center font-display font-black text-3xl sm:text-4xl shadow-md ${
                  neighborAnswers.less !== null ? 'bg-amber-100 border-amber-500 text-amber-900' : 'bg-slate-50 border-dashed border-slate-300 text-slate-400'
                }`}>
                  {neighborAnswers.less ?? '?'}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-display font-bold text-xs sm:text-sm text-blue-600 mb-1">
                  HET GETAL
                </span>
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-blue-500 bg-blue-50 flex items-center justify-center font-display font-black text-4xl sm:text-5xl text-blue-900 shadow-lg scale-105">
                  {exercise.visual.count}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-display font-bold text-xs sm:text-sm text-slate-500 mb-1">
                  1 MEER ➡️
                </span>
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 flex items-center justify-center font-display font-black text-3xl sm:text-4xl shadow-md ${
                  neighborAnswers.more !== null ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-slate-50 border-dashed border-slate-300 text-slate-400'
                }`}>
                  {neighborAnswers.more ?? '?'}
                </div>
              </div>
            </div>

            {!isAnswerChecked && (
              <div className="w-full mt-2 bg-amber-50 p-4 rounded-2xl border border-amber-200">
                <div className="mb-2 text-center text-sm font-display font-bold text-slate-700">
                  {neighborAnswers.less === null
                    ? 'Stap 1: Welk cijfer is 1 MINDER?'
                    : 'Stap 2: Welk cijfer is 1 MEER?'}
                </div>
                <div className="flex justify-center gap-2 sm:gap-4">
                  {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        if (neighborAnswers.less === null) {
                          handleNeighborPick('less', num);
                        } else if (neighborAnswers.more === null) {
                          handleNeighborPick('more', num);
                        }
                      }}
                      className="chromebook-btn w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white hover:bg-amber-100 text-slate-800 font-display font-black text-xl sm:text-2xl shadow border-2 border-amber-300"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TYPE: COMPARE GROUPS */}
        {exercise.visual.kind === 'compare-groups' && exercise.visual.left && exercise.visual.right && (
          <div className="flex flex-col items-center w-full">
            <div className="grid grid-cols-2 gap-4 sm:gap-8 w-full max-w-xl">
              <button
                onClick={() => !isAnswerChecked && handleSelectCompare('left')}
                className={`chromebook-btn p-4 rounded-3xl border-4 transition-all flex flex-col items-center shadow-md ${
                  selectedAnswer === 'left'
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-200'
                      : 'border-rose-400 bg-rose-50'
                    : 'border-amber-200 hover:border-amber-400 bg-amber-50/50 hover:bg-amber-100/40'
                }`}
              >
                <span className="font-display font-bold text-base text-slate-700 mb-2">
                  {exercise.visual.left.label}
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2 min-h-[90px]">
                  {exercise.visual.left.items.map((icon, idx) => (
                    <span key={idx} className="text-3xl sm:text-4xl">
                      {icon}
                    </span>
                  ))}
                </div>
                <span className="mt-3 px-3 py-1 bg-white rounded-full font-display font-black text-lg text-slate-800 border border-amber-200">
                  {exercise.visual.left.count}
                </span>
              </button>

              <button
                onClick={() => !isAnswerChecked && handleSelectCompare('right')}
                className={`chromebook-btn p-4 rounded-3xl border-4 transition-all flex flex-col items-center shadow-md ${
                  selectedAnswer === 'right'
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-200'
                      : 'border-rose-400 bg-rose-50'
                    : 'border-amber-200 hover:border-amber-400 bg-amber-50/50 hover:bg-amber-100/40'
                }`}
              >
                <span className="font-display font-bold text-base text-slate-700 mb-2">
                  {exercise.visual.right.label}
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2 min-h-[90px]">
                  {exercise.visual.right.items.map((icon, idx) => (
                    <span key={idx} className="text-3xl sm:text-4xl">
                      {icon}
                    </span>
                  ))}
                </div>
                <span className="mt-3 px-3 py-1 bg-white rounded-full font-display font-black text-lg text-slate-800 border border-amber-200">
                  {exercise.visual.right.count}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* TYPE: ENOUGH CHECK */}
        {exercise.visual.kind === 'enough-check' && exercise.visual.left && exercise.visual.right && (
          <div className="flex flex-col items-center w-full max-w-xl">
            <div className="grid grid-cols-2 gap-4 w-full bg-amber-50/60 p-4 rounded-3xl border-2 border-amber-200">
              <div className="flex flex-col items-center">
                <span className="font-display font-bold text-sm text-slate-700 mb-2">
                  {exercise.visual.left.label} ({exercise.visual.left.count})
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {exercise.visual.left.items.map((item, idx) => (
                    <span key={idx} className="text-3xl sm:text-4xl">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-display font-bold text-sm text-slate-700 mb-2">
                  {exercise.visual.right.label} ({exercise.visual.right.count})
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {exercise.visual.right.items.map((item, idx) => (
                    <span key={idx} className="text-3xl sm:text-4xl">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-6 mt-5">
              <button
                onClick={() => !isAnswerChecked && handleSelectEnough('ja')}
                className={`chromebook-btn flex items-center gap-3 px-6 py-4 rounded-2xl font-display font-bold text-lg sm:text-xl shadow-md border-3 transition-all ${
                  selectedAnswer === 'ja'
                    ? isCorrect
                      ? 'bg-emerald-500 text-white border-emerald-600 ring-4 ring-emerald-200'
                      : 'bg-rose-400 text-white border-rose-500'
                    : 'bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-300'
                }`}
              >
                <ThumbsUp className="w-7 h-7" />
                JA, genoeg!
              </button>

              <button
                onClick={() => !isAnswerChecked && handleSelectEnough('nee')}
                className={`chromebook-btn flex items-center gap-3 px-6 py-4 rounded-2xl font-display font-bold text-lg sm:text-xl shadow-md border-3 transition-all ${
                  selectedAnswer === 'nee'
                    ? isCorrect
                      ? 'bg-emerald-500 text-white border-emerald-600 ring-4 ring-emerald-200'
                      : 'bg-rose-400 text-white border-rose-500'
                    : 'bg-white hover:bg-rose-50 text-rose-700 border-rose-300'
                }`}
              >
                <ThumbsDown className="w-7 h-7" />
                NEE, niet genoeg!
              </button>
            </div>
          </div>
        )}

        {/* TYPE: ROW POSITION */}
        {exercise.visual.kind === 'row' && exercise.visual.rowItems && (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center gap-2 text-xs font-display font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-3">
              ⬅️ Looprichting naar links (vooraan)
            </div>

            <div className="flex flex-wrap items-end justify-center gap-3 sm:gap-5 p-4 bg-amber-50/70 rounded-3xl border-2 border-amber-200 max-w-2xl w-full">
              {exercise.visual.rowItems.map((item, idx) => {
                const isItemTarget = selectedAnswer === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => !isAnswerChecked && handleSelectRowItem(item.id)}
                    className={`chromebook-btn flex flex-col items-center p-3 rounded-2xl border-3 transition-all ${
                      isItemTarget
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-100 ring-4 ring-emerald-200'
                          : 'border-rose-400 bg-rose-100'
                        : 'border-amber-300 bg-white hover:border-amber-400 hover:bg-amber-100/50'
                    }`}
                  >
                    <span className="text-4xl sm:text-5xl mb-1 transform hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="font-display font-semibold text-xs sm:text-sm text-slate-700">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-reading">
                      {idx === 0 ? 'vooraan' : idx === exercise.visual.rowItems!.length - 1 ? 'achteraan' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TYPE: PATTERN COMPLETE */}
        {exercise.visual.kind === 'color-pattern' || exercise.visual.kind === 'shape-pattern' ? (
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-4 bg-amber-50/60 rounded-3xl border-2 border-amber-200 mb-6">
              {exercise.visual.pattern?.map((symbol, idx) => (
                <div
                  key={idx}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-sm border-2 ${
                    symbol === '❓'
                      ? 'bg-amber-200 border-amber-400 text-amber-900 animate-pulse font-display font-black'
                      : 'bg-white border-amber-200'
                  }`}
                >
                  {symbol}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {exercise.visual.candidates?.map((candidate, idx) => (
                <button
                  key={idx}
                  onClick={() => !isAnswerChecked && handleSelectPatternCandidate(candidate)}
                  className={`chromebook-btn w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-3 text-3xl sm:text-4xl flex items-center justify-center shadow-md transition-all ${
                    selectedAnswer === candidate
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-200'
                        : 'border-rose-400 bg-rose-50'
                      : 'border-amber-300 hover:border-amber-400 hover:bg-amber-50'
                  }`}
                >
                  {candidate}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {/* TYPE: ORDER LENGTH (1, 2, 3 van kort naar lang) */}
        {exercise.visual.kind === 'caterpillars' && exercise.visual.lengths && (
          <div className="flex flex-col items-center w-full max-w-xl">
            <div className="grid grid-cols-3 gap-4 w-full bg-amber-50/60 p-4 rounded-3xl border-2 border-amber-200">
              {exercise.visual.lengths.map((item, idx) => {
                const currentRank = multiOrder[idx];
                return (
                  <div key={item.id} className="flex flex-col items-center">
                    <span className="font-display font-semibold text-xs text-slate-700 mb-2">
                      {item.label}
                    </span>
                    <div className="w-16 h-36 bg-white rounded-2xl border-2 border-amber-200 flex items-end justify-center p-2 shadow-inner">
                      <div
                        className="w-full bg-gradient-to-t from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center text-2xl transition-all"
                        style={{ height: `${item.heightPercent}%` }}
                      >
                        {item.icon}
                      </div>
                    </div>

                    <div className="mt-3 flex gap-1">
                      {[1, 2, 3].map((r) => (
                        <button
                          key={r}
                          disabled={isAnswerChecked}
                          onClick={() => handleOrderLengthClick(idx, r)}
                          className={`w-8 h-8 rounded-lg font-display font-bold text-sm shadow transition-all ${
                            currentRank === r
                              ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                              : 'bg-white hover:bg-amber-100 text-slate-700 border border-amber-200'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TYPE: SPATIAL DIRECTION */}
        {exercise.visual.kind === 'direction-choice' && (
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 bg-amber-100/70 rounded-3xl border-2 border-amber-300 flex items-center gap-4">
              <span className="text-6xl">🤚</span>
              <div className="text-left font-reading text-sm text-amber-950">
                <p className="font-display font-bold text-base text-amber-900">
                  👋 Het ezelsbruggetje van juf en meester:
                </p>
                <p>Kijk naar je linkerhand met open duim: dat vormt de letter <strong>L</strong> van <strong>Links</strong>!</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SPECIAL INTERACTION: PLUS-MINUS CHOICES (Erbij of Eraf?) */}
      {exercise.type === 'plus-minus' && (
        <div className="w-full mt-5 flex justify-center gap-4 sm:gap-6">
          <button
            disabled={isAnswerChecked && isCorrect}
            onClick={() => handleSelectSign('+')}
            className={`chromebook-btn flex-1 max-w-[220px] py-4 px-5 rounded-2xl font-display font-black text-xl sm:text-2xl shadow-lg border-4 transition-all flex items-center justify-center gap-3 ${
              selectedAnswer === '+'
                ? isCorrect
                  ? 'bg-emerald-500 border-emerald-600 text-white ring-4 ring-emerald-200'
                  : 'bg-rose-500 border-rose-600 text-white ring-4 ring-rose-200'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-400'
            }`}
          >
            <Plus className="w-8 h-8 stroke-[3]" />
            <span>+ ERBIJ</span>
          </button>

          <button
            disabled={isAnswerChecked && isCorrect}
            onClick={() => handleSelectSign('-')}
            className={`chromebook-btn flex-1 max-w-[220px] py-4 px-5 rounded-2xl font-display font-black text-xl sm:text-2xl shadow-lg border-4 transition-all flex items-center justify-center gap-3 ${
              selectedAnswer === '-'
                ? isCorrect
                  ? 'bg-emerald-500 border-emerald-600 text-white ring-4 ring-emerald-200'
                  : 'bg-rose-500 border-rose-600 text-white ring-4 ring-rose-200'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-400'
            }`}
          >
            <Minus className="w-8 h-8 stroke-[3]" />
            <span>- ERAF</span>
          </button>
        </div>
      )}

      {/* SPECIAL INTERACTION: COMPARE-EQUAL CHOICES (= of ≠) */}
      {exercise.type === 'compare-equal' && exercise.options && (
        <div className="w-full mt-5 flex justify-center gap-4 sm:gap-6">
          {exercise.options.map((opt) => {
            const isSelected = selectedAnswer === opt;
            return (
              <button
                key={String(opt)}
                disabled={isAnswerChecked && isCorrect}
                onClick={() => handleSelectSign(String(opt))}
                className={`chromebook-btn flex-1 max-w-[180px] py-4 px-5 rounded-2xl font-display font-black text-3xl shadow-lg border-4 transition-all flex items-center justify-center gap-2 ${
                  isSelected
                    ? isCorrect
                      ? 'bg-emerald-500 border-emerald-600 text-white ring-4 ring-emerald-200'
                      : 'bg-rose-500 border-rose-600 text-white ring-4 ring-rose-200'
                    : 'bg-white hover:bg-cyan-50 text-cyan-900 border-cyan-400'
                }`}
              >
                <span>{opt}</span>
                <span className="text-xs font-reading text-slate-500">
                  {opt === '=' ? '(Gelijk)' : '(Niet gelijk)'}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* SPECIAL INTERACTION: CROCODILE CHOICES (<, =, >) */}
      {exercise.type === 'crocodile-compare' && exercise.options && (
        <div className="w-full mt-5 flex justify-center gap-3 sm:gap-4 flex-wrap">
          {exercise.options.map((opt) => {
            const isSelected = selectedAnswer === opt;
            const labelText =
              opt === '<'
                ? '< Kleiner dan (bek open naar rechts)'
                : opt === '>'
                ? '> Groter dan (bek open naar links)'
                : '= Evenveel';
            return (
              <button
                key={String(opt)}
                disabled={isAnswerChecked && isCorrect}
                onClick={() => handleSelectSign(String(opt))}
                className={`chromebook-btn px-6 py-3.5 rounded-2xl font-display font-black text-2xl sm:text-3xl shadow-md border-3 transition-all flex items-center justify-center gap-2 ${
                  isSelected
                    ? isCorrect
                      ? 'bg-emerald-500 border-emerald-600 text-white ring-4 ring-emerald-200'
                      : 'bg-rose-500 border-rose-600 text-white ring-4 ring-rose-200'
                    : 'bg-white hover:bg-emerald-50 text-emerald-900 border-emerald-400'
                }`}
                title={labelText}
              >
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ANSWER CHOICES FOR STANDARD MULTIPLE CHOICE OR NUMBERS */}
      {exercise.options &&
        exercise.type !== 'plus-minus' &&
        exercise.type !== 'compare-equal' &&
        exercise.type !== 'crocodile-compare' &&
        exercise.type !== 'spatial-direction' &&
        exercise.type !== 'enough' &&
        exercise.type !== 'compare' && (
          <div className="w-full mt-4">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {exercise.options.map((opt) => {
                const isSelected = selectedAnswer === opt;
                return (
                  <button
                    key={String(opt)}
                    disabled={isAnswerChecked && isCorrect}
                    onClick={() => {
                      if (typeof opt === 'number') {
                        handleSelectNumber(opt);
                      } else {
                        handleSelectCompare(opt);
                      }
                    }}
                    className={`chromebook-btn min-w-[70px] sm:min-w-[85px] h-16 sm:h-20 px-4 rounded-2xl font-display font-black text-2xl sm:text-3xl shadow-lg border-3 transition-all flex items-center justify-center ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-500 border-emerald-600 text-white ring-4 ring-emerald-200'
                          : 'bg-rose-400 border-rose-500 text-white ring-4 ring-rose-200'
                        : 'bg-white hover:bg-amber-100 text-slate-800 border-amber-300 hover:border-amber-400'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      {/* CHOICES FOR SPATIAL DIRECTION */}
      {exercise.type === 'spatial-direction' && exercise.options && (
        <div className="w-full mt-4 flex justify-center gap-4">
          {exercise.options.map((opt) => {
            const isSelected = selectedAnswer === opt;
            return (
              <button
                key={String(opt)}
                disabled={isAnswerChecked && isCorrect}
                onClick={() => handleSelectCompare(String(opt))}
                className={`chromebook-btn px-6 py-4 rounded-2xl font-display font-bold text-lg sm:text-xl shadow-md border-3 transition-all ${
                  isSelected
                    ? isCorrect
                      ? 'bg-emerald-500 border-emerald-600 text-white ring-4 ring-emerald-200'
                      : 'bg-rose-400 border-rose-500 text-white ring-4 ring-rose-200'
                    : 'bg-white hover:bg-amber-100 text-slate-800 border-amber-300'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* FEEDBACK BANNER (Instant, encouraging) */}
      {isAnswerChecked && (
        <div
          className={`mt-5 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-md animate-scale-up ${
            isCorrect
              ? 'bg-emerald-50 border-2 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-2 border-rose-300 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <>
                <CheckCircle className="w-8 h-8 text-emerald-600 shrink-0 animate-bounce" />
                <div>
                  <h4 className="font-display font-bold text-lg text-emerald-800">
                    Geweldig gedaan! ⭐
                  </h4>
                  <p className="font-reading text-sm text-emerald-700">
                    Dat is helemaal juist!
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-8 h-8 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-display font-bold text-base text-rose-800">
                    Oeps, probeer het nog eens!
                  </h4>
                  <p className="font-reading text-xs sm:text-sm text-rose-700">
                    Geen probleem, je kan het nog een keer proberen.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isCorrect ? (
              <button
                onClick={handleTryAgain}
                className="chromebook-btn px-4 py-2.5 rounded-xl bg-white hover:bg-rose-100 text-rose-700 font-display font-bold text-sm border border-rose-200 shadow-sm"
              >
                Opnieuw proberen 🔄
              </button>
            ) : (
              <button
                onClick={onNext}
                className="chromebook-btn flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-base shadow-md hover:scale-105"
              >
                <span>Volgende vraag</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* HINT BUTTON */}
      {exercise.hint && !isCorrect && (
        <div className="mt-3 text-center">
          {!showHint ? (
            <button
              onClick={() => {
                sounds.playClick();
                setShowHint(true);
              }}
              className="inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-900 font-display font-medium bg-amber-100/70 hover:bg-amber-200 px-3 py-1 rounded-full transition-colors"
            >
              <Lightbulb className="w-4 h-4 text-amber-600" />
              Tip nodig? Klik hier
            </button>
          ) : (
            <div className="inline-block p-2.5 bg-amber-100/90 rounded-xl text-amber-900 text-xs sm:text-sm font-reading border border-amber-300 animate-fade-in">
              💡 {exercise.hint}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
