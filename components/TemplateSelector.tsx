
import React from 'react';
import { TemplateType, Language } from '../types';
import { translations } from '../translations';

interface Props {
  current: TemplateType;
  onChange: (t: TemplateType) => void;
  lang: Language;
}

const TemplateSelector: React.FC<Props> = ({ current, onChange, lang }) => {
  const t = translations[lang];
  const templates: { id: TemplateType; label: string }[] = [
    { id: 'modern', label: t.modern },
    { id: 'executive', label: t.executive },
    { id: 'creative', label: t.creative },
    { id: 'geometric', label: t.geometric },
    { id: 'sidebar', label: t.sidebar },
    { id: 'professional', label: t.professional },
    { id: 'minimalist', label: t.minimalist },
    { id: 'technical', label: t.technical },
    { id: 'bold', label: t.bold },
    { id: 'compact', label: t.compact },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
         <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
         </div>
         <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-[0.2em]">{t.template}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {templates.map((tmp) => (
          <button
            key={tmp.id}
            onClick={() => onChange(tmp.id)}
            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all border text-center ${
              current === tmp.id 
                ? 'border-slate-900 bg-slate-900 text-white shadow-md scale-[1.02]' 
                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
            }`}
          >
            <div className={`w-full h-8 rounded-md mb-1 ${current === tmp.id ? 'bg-white/20' : 'bg-slate-100'}`}></div>
            <span className="text-[9px] font-black uppercase tracking-tight">{tmp.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
