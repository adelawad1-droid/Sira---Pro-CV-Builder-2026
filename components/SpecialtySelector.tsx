
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { SPECIALTIES_DATA } from '../constants';

interface Props {
  lang: Language;
  onSelect: (data: any) => void;
  themeColor: string;
}

const SpecialtyIcons = {
  software: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
  design: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  medical: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>,
  marketing: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>,
  accounting: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>,
  civil: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-11h.01M15 11h.01M15 15h.01"/></svg>,
  sales: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  hr: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>,
  pm: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>,
  teaching: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
  data: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>,
  content: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>,
  lawyer: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>,
  customer: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>,
  architect: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>,
};

const SpecialtyColors: Record<string, { bg: string, text: string }> = {
  software: { bg: '#eff6ff', text: '#2563eb' },
  design: { bg: '#eef2ff', text: '#4f46e5' },
  medical: { bg: '#fff1f2', text: '#e11d48' },
  marketing: { bg: '#fffbeb', text: '#d97706' },
  accounting: { bg: '#ecfdf5', text: '#059669' },
  civil: { bg: '#fff7ed', text: '#ea580c' },
  sales: { bg: '#f0f9ff', text: '#0284c7' },
  hr: { bg: '#f0fdfa', text: '#0d9488' },
  pm: { bg: '#f5f3ff', text: '#7c3aed' },
  teaching: { bg: '#ecfeff', text: '#0891b2' },
  data: { bg: '#f8fafc', text: '#475569' },
  content: { bg: '#fdf2f8', text: '#db2777' },
  lawyer: { bg: '#f1f5f9', text: '#334155' },
  customer: { bg: '#f7fee7', text: '#65a30d' },
  architect: { bg: '#fefce8', text: '#ca8a04' },
};

const SpecialtySelector: React.FC<Props> = ({ lang, onSelect, themeColor }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const specialtiesList = Object.keys(SPECIALTIES_DATA).map(key => ({
    id: key,
    icon: (SpecialtyIcons as any)[key] || SpecialtyIcons.software,
    style: SpecialtyColors[key] || { bg: '#f1f5f9', text: '#334155' }
  }));

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
         <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-200">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
         </div>
         <div>
           <h3 className="font-black text-slate-800 text-[12px] uppercase tracking-[0.2em]">{t.chooseSpecialty}</h3>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{isRtl ? 'بيانات مهنية جاهزة لـ 15 تخصص' : 'Professional data for 15 specialties'}</p>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {specialtiesList.map((spec) => {
          const Icon = spec.icon;
          return (
            <button
              key={spec.id}
              onClick={() => onSelect(SPECIALTIES_DATA[spec.id][lang])}
              className="group relative flex flex-col items-center gap-4 p-6 rounded-[2.5rem] border border-slate-100 bg-white hover:border-slate-300 transition-all shadow-sm hover:shadow-xl active:scale-95 text-center overflow-hidden"
            >
              <div 
                className="w-14 h-14 rounded-[1.5rem] flex items-center justify-center transition-all group-hover:scale-110 shadow-inner"
                style={{ backgroundColor: spec.style.bg, color: spec.style.text }}
              >
                <Icon />
              </div>
              
              <div className="space-y-1">
                <span className="text-[14px] font-black text-slate-800 leading-tight block group-hover:text-slate-900">
                  {(t.specialties as any)[spec.id]}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block opacity-70">
                  {isRtl ? 'بيانات معتمدة' : 'Verified Data'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-200">
         <p className="text-[10px] text-slate-500 font-black leading-relaxed text-center uppercase tracking-[0.3em]">
           {isRtl ? 'جميع القوالب تدعم أنظمة الـ ATS وتضمن ظهورك الاحترافي' : 'All templates are ATS-ready for professional appearance'}
         </p>
      </div>
    </div>
  );
};

export default SpecialtySelector;
