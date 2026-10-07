import React from 'react';

interface DiceVisualProps {
  count: number;
  size?: 'sm' | 'md' | 'lg';
}

export const DiceVisual: React.FC<DiceVisualProps> = ({ count, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16 p-2 rounded-xl border-2',
    md: 'w-24 h-24 p-3 rounded-2xl border-4',
    lg: 'w-32 h-32 p-4 rounded-3xl border-4',
  }[size];

  const dotSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  }[size];

  // Dice dot positions in a 3x3 grid
  // Grid positions:
  // 0 1 2
  // 3 4 5
  // 6 7 8
  const getDotIndices = (num: number): number[] => {
    switch (num) {
      case 0:
        return [];
      case 1:
        return [4];
      case 2:
        return [2, 6];
      case 3:
        return [2, 4, 6];
      case 4:
        return [0, 2, 6, 8];
      case 5:
        return [0, 2, 4, 6, 8];
      case 6:
        return [0, 2, 3, 5, 6, 8];
      default:
        return [4];
    }
  };

  const activeDots = new Set(getDotIndices(count));

  return (
    <div
      className={`bg-white shadow-md border-amber-300 grid grid-cols-3 grid-rows-3 gap-1 items-center justify-items-center ${sizeClasses}`}
      aria-label={`Dobbelsteen met ${count} stippen`}
    >
      {[...Array(9)].map((_, i) => (
        <div key={i} className="flex items-center justify-center w-full h-full">
          {activeDots.has(i) ? (
            <div
              className={`${dotSize} rounded-full bg-slate-900 shadow-sm animate-pulse-once`}
            />
          ) : (
            <div className="w-1 h-1 opacity-0" />
          )}
        </div>
      ))}
    </div>
  );
};
