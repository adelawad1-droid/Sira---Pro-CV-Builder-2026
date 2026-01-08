
import React, { useRef } from 'react';
import { translations } from '../translations';
import { Language } from '../types';

interface Props {
  color: string;
  onChange: (color: string) => void;
  lang: Language;
}

const ColorPicker: React.FC<Props> = ({ color, onChange, lang }) => {
  const t = translations[lang];
  const colorInputRef = useRef<HTMLInputElement>(null);
  
  const predefinedColors = [
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

  // Check if current color is custom (not in predefined list)
  const isCustomColor = !predefinedColors.includes(color);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
         <div className="w-6 h-6 rounded bg-rose-100 text-rose-600 flex items-center justify-center text-xs">🎨</div>
         <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-wider">{t.themeColor}</h3>
      </div>
      <div className="flex flex-wrap gap-2.5 px-1 items-center">
        {predefinedColors.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`w-7 h-7 rounded-full transition-all duration-300 border-2 ${
              color === c ? 'border-white scale-125 shadow-lg' : 'border-transparent hover:scale-110'
            }`}
            style={{ backgroundColor: c, boxShadow: color === c ? `0 0 10px ${c}66` : 'none' }}
            title={c}
          />
        ))}

        {/* Custom Color Button */}
        <div className="relative flex items-center">
          <button
            onClick={() => colorInputRef.current?.click()}
            className={`w-7 h-7 rounded-full transition-all duration-300 border-2 flex items-center justify-center overflow-hidden ${
              isCustomColor ? 'border-white scale-125 shadow-lg' : 'border-slate-200 bg-slate-100 hover:border-slate-400 hover:scale-110'
            }`}
            style={isCustomColor ? { backgroundColor: color, boxShadow: `0 0 10px ${color}66` } : {}}
            title={lang === 'ar' ? 'لون مخصص' : 'Custom Color'}
          >
            {!isCustomColor ? (
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
              </svg>
            ) : (
              <div className="w-full h-full bg-white/20 backdrop-blur-[1px] flex items-center justify-center">
                 <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            )}
          </button>
          <input 
            ref={colorInputRef}
            type="color" 
            className="absolute opacity-0 pointer-events-none" 
            value={color}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
