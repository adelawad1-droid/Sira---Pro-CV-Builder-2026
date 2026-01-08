
import React from 'react';
import { Language } from '../types';

interface Props {
  currentFont: string;
  onChange: (font: string) => void;
  lang: Language;
}

const FontSelector: React.FC<Props> = ({ currentFont, onChange, lang }) => {
  const fonts = [
    { id: 'Cairo', name: 'Cairo' },
    { id: 'Tajawal', name: 'Tajawal' },
    { id: 'Almarai', name: 'Almarai' },
    { id: 'Readex Pro', name: 'Readex' },
    { id: 'IBM Plex Sans Arabic', name: 'IBM' },
    { id: 'Amiri', name: 'Amiri' },
    { id: 'Montserrat', name: 'Monts' },
    { id: 'Poppins', name: 'Poppins' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
         <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">🔡</div>
         <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-wider">
           {lang === 'ar' ? 'نوع الخط' : 'Typography'}
         </h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {fonts.map((f) => (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            className={`px-3 py-2 rounded-xl text-[9px] font-black transition-all border text-center ${
              currentFont === f.id 
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300'
            }`}
            style={{ fontFamily: f.id }}
          >
            {f.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontSelector;
