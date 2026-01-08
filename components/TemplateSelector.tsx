
import React from 'react';
import { TemplateType, Language } from '../types';
import { translations } from '../translations';

interface Props {
  current: TemplateType;
  onChange: (t: TemplateType) => void;
  lang: Language;
}

const TemplateIcons: Record<string, React.ReactNode> = {
  modern: <path d="M12 3l1.912 5.886h6.191l-5.008 3.638 1.912 5.886-5.007-3.638-5.007 3.638 1.912-5.886-5.008-3.638h6.191z" />,
  executive: <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
  luxury: <path d="M5 16l3-8 4 5 4-5 3 8H5zm14 2H5v2h14v-2z" />,
  timeline: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
  academic: <path d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />,
  infographic: <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
  classic: <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  startup: <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
  architectural: <path d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />,
  retro: <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
  glass: <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />,
  neon: <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
  journal: <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM3 8h16M8 12h8M8 16h5" />,
  engineering: <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
  artistic: <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.172-1.172a4 4 0 115.656 5.656l-1.172 1.172" />,
  official: <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h1m11 0h1m-9 0h1m-9 0h1m5 0v11m4-11v11m4-11v11m-12-11v11" />,
  creative: <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1V5s-.5 1-2 1-2.5-2-4-2-2.5 2-4 2-2.5-2-4-2-2 1-2 1v11z" />,
  geometric: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  sidebar: <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zM9 5v14" />,
  professional: <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745V20a2 2 0 002 2h14a2 2 0 002-2v-6.745zM16 8V5a2 2 0 00-2-2H10a2 2 0 00-2 2v3m8 0H8m8 0a2 2 0 012 2v2M8 8a2 2 0 00-2 2v2m4.688-2.248A5.986 5.986 0 0112 11c1.26 0 2.428-.388 3.394-1.048M12 11V5" />,
  minimalist: <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />,
  technical: <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
  bold: <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343c1.567 1.566 2.433 3.657 2.433 5.748 0 2.09-.866 4.182-2.432 5.566z" />,
  compact: <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
};

const TemplateSelector: React.FC<Props> = ({ current, onChange, lang }) => {
  const t = translations[lang];
  
  const templates: { id: TemplateType; label: string; color: string }[] = [
    { id: 'modern', label: t.modern, color: '#3b82f6' },
    { id: 'executive', label: t.executive, color: '#0f172a' },
    { id: 'luxury', label: t.luxury, color: '#b45309' },
    { id: 'timeline', label: t.timeline, color: '#6366f1' },
    { id: 'academic', label: t.academic, color: '#475569' },
    { id: 'infographic', label: t.infographic, color: '#ec4899' },
    { id: 'classic', label: t.classic, color: '#78350f' },
    { id: 'startup', label: t.startup, color: '#06b6d4' },
    { id: 'architectural', label: t.architectural, color: '#14b8a6' },
    { id: 'retro', label: t.retro, color: '#f59e0b' },
    { id: 'glass', label: t.glass, color: '#0ea5e9' },
    { id: 'neon', label: t.neon, color: '#f43f5e' },
    { id: 'journal', label: t.journal, color: '#6b7280' },
    { id: 'engineering', label: t.engineering, color: '#334155' },
    { id: 'artistic', label: t.artistic, color: '#8b5cf6' },
    { id: 'official', label: t.official, color: '#1e3a8a' },
    { id: 'creative', label: t.creative, color: '#d946ef' },
    { id: 'geometric', label: t.geometric, color: '#10b981' },
    { id: 'sidebar', label: t.sidebar, color: '#64748b' },
    { id: 'professional', label: t.professional, color: '#475569' },
    { id: 'minimalist', label: t.minimalist, color: '#000000' },
    { id: 'technical', label: t.technical, color: '#020617' },
    { id: 'bold', label: t.bold, color: '#ef4444' },
    { id: 'compact', label: t.compact, color: '#7c2d12' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
         <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xl">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
         </div>
         <div>
           <h3 className="font-black text-slate-800 text-[12px] uppercase tracking-[0.2em]">{t.template}</h3>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{lang === 'ar' ? 'اختر النمط المهني المناسب' : 'Select your professional layout'}</p>
         </div>
      </div>
      
      {/* Dense Grid - Packed tightly for formal look */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {templates.map((tmp) => (
          <button
            key={tmp.id}
            onClick={() => onChange(tmp.id)}
            className={`group relative flex flex-col items-center justify-between p-3 rounded-2xl transition-all border h-28 ${
              current === tmp.id 
                ? 'border-slate-900 bg-slate-900 shadow-lg scale-[1.05] z-10' 
                : 'border-slate-100 bg-white hover:border-slate-300'
            }`}
          >
            <div 
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm border border-white/20`}
              style={{ backgroundColor: tmp.color }}
            >
              <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                viewBox="0 0 24 24"
              >
                {TemplateIcons[tmp.id] || <circle cx="12" cy="12" r="8" />}
              </svg>
            </div>
            
            <span className={`text-[8.5px] font-black uppercase tracking-tight text-center leading-tight mb-1 ${current === tmp.id ? 'text-white' : 'text-slate-500'}`}>
              {tmp.label}
            </span>

            {current === tmp.id && (
               <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
