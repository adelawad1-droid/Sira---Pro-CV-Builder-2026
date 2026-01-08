
import React from 'react';
import { translations } from '../translations';
import { Language } from '../types';

interface Props {
  color: string;
  onChange: (color: string) => void;
  lang: Language;
}

const ColorPicker: React.FC<Props> = ({ color, onChange, lang }) => {
  const t = translations[lang];
  const colors = [
    '#4f46e5', // Indigo
    '#0ea5e9', // Sky
    '#10b981', // Emerald
    '#f43f5e', // Rose
    '#8b5cf6', // Violet
    '#f59e0b', // Amber
    '#0f172a', // Slate
    '#7c2d12', // Warm Orange
    '#be185d', // Pink
    '#1e40af', // Deep Blue
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
         <div className="w-6 h-6 rounded bg-rose-100 text-rose-600 flex items-center justify-center text-xs">🎨</div>
         <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-wider">{t.themeColor}</h3>
      </div>
      <div className="flex flex-wrap gap-2.5 px-1">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`w-7 h-7 rounded-full transition-all duration-300 border-2 ${
              color === c ? 'border-white scale-125 shadow-lg' : 'border-transparent hover:scale-110'
            }`}
            style={{ backgroundColor: c, boxShadow: color === c ? `0 0 10px ${c}66` : 'none' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
