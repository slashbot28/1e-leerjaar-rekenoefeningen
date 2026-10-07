import React, { useState } from 'react';
import { Award, Printer, X, Sparkles, Star } from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

interface DiplomaModalProps {
  totalStars: number;
  studentName: string;
  onUpdateStudentName?: (name: string) => void;
  initialBlok?: 1 | 2;
  onClose: () => void;
}

export const DiplomaModal: React.FC<DiplomaModalProps> = ({
  totalStars,
  studentName,
  onUpdateStudentName,
  initialBlok = 2,
  onClose,
}) => {
  const [selectedDiplomaType, setSelectedDiplomaType] = useState<'blok1' | 'blok2' | 'allebei'>(
    initialBlok === 2 ? 'blok2' : 'blok1'
  );

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const handleCelebrate = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
    });
  };

  const diplomaDetails = {
    blok1: {
      title: 'Rekendiploma Blok 1',
      desc: 'Voor het dapper oefenen met tellen tot 6, meer en minder, de rangtelwoorden in de rij, vormenpatronen en het netjes schrijven van cijfers!',
    },
    blok2: {
      title: 'Rekendiploma Blok 2',
      desc: 'Voor het knap leren van de getallen 0, 5 en 6, rekenverhalen met plus en min (+/-), optellen tot 6, krokodilvergelijkingen (< en >), inhoud en massa!',
    },
    allebei: {
      title: 'Groot Rekenkampioen Diploma (Blok 1 & 2)',
      desc: 'Gefeliciteerd! Een ware meester in alle vaardigheden van het 1e leerjaar van Blok 1 én Blok 2 van de Rekenroute!',
    },
  }[selectedDiplomaType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative flex flex-col items-center text-center max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 chromebook-btn w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Diploma Type Selector */}
        <div className="flex gap-2 mb-3 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => {
              sounds.playClick();
              setSelectedDiplomaType('blok1');
            }}
            className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all ${
              selectedDiplomaType === 'blok1'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Blok 1
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setSelectedDiplomaType('blok2');
            }}
            className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all ${
              selectedDiplomaType === 'blok2'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Blok 2 ⭐
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setSelectedDiplomaType('allebei');
            }}
            className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all ${
              selectedDiplomaType === 'allebei'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Blok 1 & 2 🏆
          </button>
        </div>

        {/* Diploma Certificate Area (printable) */}
        <div className="w-full bg-amber-50/70 border-8 border-double border-amber-400 rounded-3xl p-6 sm:p-8 relative shadow-inner my-2">
          {/* Corner ornaments */}
          <span className="absolute top-2 left-2 text-2xl">⭐</span>
          <span className="absolute top-2 right-2 text-2xl">⭐</span>
          <span className="absolute bottom-2 left-2 text-2xl">⭐</span>
          <span className="absolute bottom-2 right-2 text-2xl">⭐</span>

          <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-white">
            🏆
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-amber-900 tracking-wide uppercase">
            {diplomaDetails.title}
          </h2>
          <p className="font-reading text-sm text-amber-800 font-semibold mb-4">
            1e Leerjaar • Rekenroute Basisschool
          </p>

          <p className="font-reading text-base text-slate-700 mb-2">
            Dit officiële diploma wordt met trots uitgereikt aan:
          </p>

          {/* Editable child name input */}
          <div className="inline-block border-b-2 border-amber-600 mb-4 px-4 py-1">
            <input
              type="text"
              value={studentName}
              onChange={(e) => onUpdateStudentName?.(e.target.value)}
              placeholder="Typ je naam hier"
              className="font-display font-black text-2xl sm:text-3xl text-blue-700 text-center bg-transparent outline-none focus:ring-0 max-w-xs"
            />
          </div>

          <p className="font-reading text-sm text-slate-600 max-w-md mx-auto mb-4">
            {diplomaDetails.desc}
          </p>

          <div className="flex items-center justify-center gap-2 bg-white/80 py-2 px-4 rounded-full border border-amber-300 max-w-xs mx-auto shadow-sm">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="font-display font-black text-amber-900 text-base">
              Behaalde Sterren: {totalStars} ⭐
            </span>
          </div>

          <div className="flex justify-between items-end mt-6 text-xs text-slate-500 font-reading px-4">
            <div className="text-left">
              <span>📅 Datum: {new Date().toLocaleDateString('nl-BE')}</span>
            </div>
            <div className="text-right">
              <span className="font-display font-bold text-amber-800">Juf & Meester 👍</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <button
            onClick={handleCelebrate}
            className="chromebook-btn flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-display font-bold text-base shadow-md hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            Juichen & Confetti!
          </button>

          <button
            onClick={handlePrint}
            className="chromebook-btn flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-display font-bold text-base shadow-md"
          >
            <Printer className="w-5 h-5" />
            Diploma Afdrukken
          </button>
        </div>
      </div>
    </div>
  );
};
