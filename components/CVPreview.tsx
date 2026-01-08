
import React from 'react';
import { CVData, Language, TemplateType } from '../types';

interface Props {
  data: CVData;
  lang: Language;
  template: TemplateType;
  themeColor: string;
  fontFamily: string;
}

const DEFAULT_AVATAR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YxZjVmOSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMzgiIHI9IjIwIiBmaWxsPSIjY2JkNWUxIi8+PHBhdGggZD0iTTIwIDkwYzAtMTUgMTItMjggMzAtMjhzMzAgMTMgMzAgMjh2MTBIMjBWOTB6IiBmaWxsPSIjY2JkNWUxIi8+PC9zdmc+";

const SectionIcons = {
  Profile: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
  Work: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745V20a2 2 0 002 2h14a2 2 0 002-2v-6.745zM16 8V5a2 2 0 00-2-2H10a2 2 0 00-2 2v3m8 0H8m8 0a2 2 0 012 2v2M8 8a2 2 0 00-2 2v2m4.688-2.248A5.986 5.986 0 0112 11c1.26 0 2.428-.388 3.394-1.048M12 11V5"/></svg>,
  Education: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/></svg>,
  Skills: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>,
  Contact: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
};

const CVPreview: React.FC<Props> = ({ data, lang, template, themeColor, fontFamily }) => {
  const isRtl = lang === 'ar';
  const containerStyle = { fontFamily: fontFamily };
  const userImage = data.personalInfo.image || DEFAULT_AVATAR;

  const SectionTitle = ({ children, icon: Icon, light = false, minimal = false }: any) => (
    <div className={`mb-6 ${minimal ? 'border-b pb-2 mb-4' : ''}`}>
      <h3 className={`text-md font-black uppercase tracking-wider flex items-center gap-2 ${light ? 'text-white' : ''}`} style={!light && !minimal ? { color: themeColor } : {}}>
        {Icon && !minimal && (
          <span className={`w-7 h-7 rounded flex items-center justify-center ${light ? 'bg-white/10 text-white' : 'text-white'}`} style={!light ? { backgroundColor: themeColor } : {}}>
            <Icon />
          </span>
        )}
        {children}
      </h3>
      {!minimal && <div className={`h-0.5 w-10 mt-1 rounded-full ${light ? 'bg-white/20' : ''}`} style={!light ? { backgroundColor: themeColor } : {}}></div>}
    </div>
  );

  const renderExperience = (light = false) => (
    <div className="space-y-6">
      {data.experience.map(exp => (
        <div key={exp.id} className="relative">
          <div className="flex justify-between items-start mb-1">
            <h4 className={`font-black text-sm ${light ? 'text-white' : 'text-slate-900'}`}>{exp.position}</h4>
            <span className={`text-[10px] font-bold uppercase ${light ? 'text-slate-300' : 'text-slate-400'}`}>{exp.startDate} - {exp.endDate}</span>
          </div>
          <p className={`text-[11px] font-black uppercase tracking-tight mb-2 ${light ? 'text-slate-400' : ''}`} style={!light ? { color: themeColor } : {}}>{exp.company}</p>
          <p className={`text-xs leading-relaxed opacity-80 whitespace-pre-line ${light ? 'text-slate-300' : 'text-slate-600'}`}>{exp.description}</p>
        </div>
      ))}
    </div>
  );

  const renderSkills = (isLight = false) => (
    <div className="space-y-3">
      {data.skills.map(s => (
        <div key={s.id}>
          <div className={`flex justify-between text-[10px] font-black mb-1 uppercase ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>
            <span>{s.name}</span>
          </div>
          <div className={`h-1.5 w-full rounded-full ${isLight ? 'bg-white/10' : 'bg-slate-100'}`}>
            <div className="h-full rounded-full" style={{ width: `${(s.level/5)*100}%`, backgroundColor: themeColor }}></div>
          </div>
        </div>
      ))}
    </div>
  );

  const templatesMap: Record<TemplateType, () => React.ReactElement> = {
    modern: () => (
      <div className="flex flex-col min-h-[1123px] h-full bg-white text-slate-800 p-12" style={containerStyle}>
        <header className="mb-12 border-b-4 pb-8" style={{ borderColor: themeColor }}>
          <div className="flex items-center gap-8">
            <img src={userImage} className="w-32 h-32 rounded-2xl object-cover shadow-md border-4 border-white" alt="Profile" />
            <div>
              <h1 className="text-4xl font-black mb-2 text-slate-900">{data.personalInfo.fullName || (isRtl ? 'الاسم الكامل' : 'Full Name')}</h1>
              <p className="text-xl font-bold opacity-60 mb-4">{data.personalInfo.jobTitle || (isRtl ? 'المسمى الوظيفي' : 'Job Title')}</p>
              <div className="flex flex-wrap gap-4 text-[10px] font-black text-slate-400 uppercase">
                <span>{data.personalInfo.email}</span>
                <span>{data.personalInfo.phone}</span>
                <span>{data.personalInfo.location}</span>
              </div>
            </div>
          </div>
        </header>
        <div className="flex gap-12 flex-1 h-full">
          <main className="flex-[2] space-y-10">
            <section><SectionTitle icon={SectionIcons.Profile}>{isRtl ? 'الملف الشخصي' : 'Profile'}</SectionTitle><p className="text-sm opacity-80 leading-relaxed">{data.personalInfo.summary}</p></section>
            <section><SectionTitle icon={SectionIcons.Work}>{isRtl ? 'الخبرة' : 'Experience'}</SectionTitle>{renderExperience()}</section>
          </main>
          <aside className="flex-1 space-y-10">
            <section><SectionTitle icon={SectionIcons.Skills}>{isRtl ? 'المهارات' : 'Skills'}</SectionTitle>{renderSkills()}</section>
            <section><SectionTitle icon={SectionIcons.Education}>{isRtl ? 'التعليم' : 'Education'}</SectionTitle>
              {data.education.map(edu => <div key={edu.id} className="mb-4"><p className="font-black text-xs">{edu.degree}</p><p className="text-[10px] opacity-60 uppercase">{edu.institution}</p></div>)}
            </section>
          </aside>
        </div>
      </div>
    ),
    executive: () => (
      <div className="flex min-h-[1123px] h-full bg-white" style={containerStyle}>
        <aside className="w-72 bg-slate-900 text-white p-10 space-y-10 flex flex-col min-h-full">
          <img src={userImage} className="w-full aspect-square rounded-xl object-cover mb-8 grayscale hover:grayscale-0 transition-all border-2 border-white/20" alt="Profile" />
          <section><SectionTitle light>{isRtl ? 'اتصال' : 'Contact'}</SectionTitle><div className="text-[10px] space-y-2 opacity-70"><p>{data.personalInfo.email}</p><p>{data.personalInfo.phone}</p><p>{data.personalInfo.location}</p></div></section>
          <section className="flex-1"><SectionTitle light>{isRtl ? 'المهارات' : 'Skills'}</SectionTitle>{renderSkills(true)}</section>
          <div className="pt-10 border-t border-white/10 text-[8px] opacity-30 font-bold uppercase tracking-widest">{isRtl ? 'سيرة بلاتينيوم' : 'Sira Platinum Standard'}</div>
        </aside>
        <main className="flex-1 p-16 h-full">
          <header className="mb-12 border-l-8 pl-6" style={{ borderColor: themeColor }}>
            <h1 className="text-5xl font-black text-slate-900 mb-2">{data.personalInfo.fullName}</h1>
            <p className="text-lg font-bold uppercase tracking-widest text-slate-400">{data.personalInfo.jobTitle}</p>
          </header>
          <section className="mb-12"><SectionTitle>{isRtl ? 'نبذة تنفيدية' : 'Executive Summary'}</SectionTitle><p className="text-md opacity-70 leading-relaxed">{data.personalInfo.summary}</p></section>
          <section><SectionTitle>{isRtl ? 'المسار المهني' : 'Career path'}</SectionTitle>{renderExperience()}</section>
        </main>
      </div>
    ),
    creative: () => (
      <div className="flex flex-col min-h-[1123px] h-full bg-slate-50" style={containerStyle}>
        <header className="h-72 flex items-center justify-between p-12 text-white relative overflow-hidden shrink-0" style={{ backgroundColor: themeColor }}>
          <div className={`absolute top-0 ${isRtl ? 'left-0' : 'right-0'} w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20`}></div>
          <div className={`absolute bottom-0 ${isRtl ? 'right-0' : 'left-0'} w-48 h-48 bg-black/5 rounded-full -ml-10 -mb-10`}></div>
          
          <div className="relative z-10 flex-1">
            <h1 className="text-5xl font-black tracking-tight mb-3 drop-shadow-md">
              {data.personalInfo.fullName || (isRtl ? 'خالد عبد الله المنصور' : 'Full Name')}
            </h1>
            <p className="text-xl font-bold opacity-90 tracking-wide uppercase">
              ({data.personalInfo.jobTitle || (isRtl ? 'مطور برمجيات' : 'Job Title')})
            </p>
          </div>

          <div className="relative z-10 mr-4 ml-4">
             <img 
               src={userImage} 
               className="w-48 h-48 rounded-full border-8 border-white shadow-2xl object-cover transform hover:scale-105 transition-transform" 
               alt="Profile" 
             />
          </div>
        </header>
        <div className="p-12 grid grid-cols-12 gap-12 flex-1 h-full">
          <div className="col-span-4 space-y-10">
             <div className="bg-white p-8 rounded-[3rem] shadow-sm space-y-8 h-full border border-slate-100">
               <section><SectionTitle minimal>{isRtl ? 'مهاراتي' : 'My Skills'}</SectionTitle>{renderSkills()}</section>
               <section><SectionTitle minimal>{isRtl ? 'اتصل بي' : 'Contact'}</SectionTitle><div className="text-[11px] space-y-2 font-bold opacity-60"><p>{data.personalInfo.email}</p><p>{data.personalInfo.phone}</p><p>{data.personalInfo.location}</p></div></section>
             </div>
          </div>
          <div className="col-span-8 space-y-10 h-full">
            <section className="bg-white p-10 rounded-[3rem] border border-slate-100"><p className="text-xl font-medium leading-relaxed italic text-slate-600">"{data.personalInfo.summary}"</p></section>
            <section><SectionTitle minimal>{isRtl ? 'ماذا فعلت؟' : 'Experiences'}</SectionTitle>{renderExperience()}</section>
          </div>
        </div>
      </div>
    ),
    geometric: () => (
      <div className="p-16 min-h-[1123px] h-full bg-white relative flex flex-col" style={containerStyle}>
        <div className="absolute top-0 left-0 w-full h-4 bg-slate-900" style={{ backgroundColor: themeColor }}></div>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10" style={{ background: `linear-gradient(135deg, ${themeColor} 50%, transparent 50%)` }}></div>
        <header className="mb-16 flex justify-between items-center border-b pb-8 mt-10 shrink-0">
          <div className="flex items-center gap-6">
            <img src={userImage} className="w-24 h-24 rounded-lg object-cover shadow-lg border-2" style={{ borderColor: themeColor }} alt="Profile" />
            <div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight">{data.personalInfo.fullName}</h1>
              <h2 className="text-xl font-bold uppercase tracking-widest mt-2" style={{ color: themeColor }}>{data.personalInfo.jobTitle}</h2>
            </div>
          </div>
          <div className="text-right text-[10px] font-black space-y-1 opacity-50">
            <p>{data.personalInfo.email}</p><p>{data.personalInfo.phone}</p><p>{data.personalInfo.location}</p>
          </div>
        </header>
        <div className="grid grid-cols-12 gap-16 flex-1 h-full">
          <div className="col-span-7 space-y-12 h-full">
            <section><SectionTitle minimal>{isRtl ? 'الخبرات' : 'Experience'}</SectionTitle>{renderExperience()}</section>
          </div>
          <div className="col-span-5 space-y-12 h-full">
            <section><SectionTitle minimal>{isRtl ? 'القدرات' : 'Capabilities'}</SectionTitle>{renderSkills()}</section>
            <section><SectionTitle minimal>{isRtl ? 'التعليم' : 'Education'}</SectionTitle>
              {data.education.map(edu => <div key={edu.id} className="mb-4 p-4 border-l-4" style={{ borderColor: themeColor }}><p className="font-black text-xs">{edu.degree}</p><p className="text-[10px] opacity-60 uppercase">{edu.institution}</p></div>)}
            </section>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10" style={{ background: `linear-gradient(-45deg, ${themeColor} 50%, transparent 50%)` }}></div>
      </div>
    ),
    sidebar: () => (
      <div className="flex min-h-[1123px] h-full bg-white" style={containerStyle}>
        <aside className="w-24 bg-slate-50 flex flex-col items-center py-12 gap-10 border-r border-slate-100 min-h-full">
           <img src={userImage} className="w-16 h-16 rounded-2xl object-cover shadow-xl grayscale" alt="Profile" />
           <div className="flex-1 w-px bg-slate-200"></div>
           <div className="rotate-90 text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] whitespace-nowrap mb-12 origin-center">RESUME DOCUMENT</div>
        </aside>
        <main className="flex-1 p-20 flex gap-16 h-full">
           <div className="flex-[2] space-y-12 h-full">
             <header><h1 className="text-6xl font-black mb-2 tracking-tighter">{data.personalInfo.fullName}</h1><p className="text-2xl font-bold opacity-40 uppercase tracking-widest">{data.personalInfo.jobTitle}</p></header>
             <section><SectionTitle minimal>{isRtl ? 'الخبرة المهنية' : 'Work History'}</SectionTitle>{renderExperience()}</section>
           </div>
           <div className="flex-1 space-y-12 pt-32 h-full">
             <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100"><SectionTitle minimal>{isRtl ? 'المهارات' : 'Skills'}</SectionTitle>{renderSkills()}</section>
             <section className="px-8"><SectionTitle minimal>{isRtl ? 'بيانات التواصل' : 'Contact info'}</SectionTitle><div className="text-[10px] space-y-3 font-bold opacity-40"><p>{data.personalInfo.email}</p><p>{data.personalInfo.phone}</p><p>{data.personalInfo.location}</p></div></section>
           </div>
        </main>
      </div>
    ),
    professional: () => (
      <div className="p-16 min-h-[1123px] h-full bg-white text-center flex flex-col" style={containerStyle}>
        <header className="mb-12 shrink-0">
          <img src={userImage} className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 shadow-sm" style={{ borderColor: themeColor }} alt="Profile" />
          <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em]">{data.personalInfo.fullName}</h1>
          <div className="h-1 w-40 mx-auto rounded-full mb-4" style={{ backgroundColor: themeColor }}></div>
          <p className="text-[14px] font-bold uppercase tracking-[0.4em] mb-4 opacity-60">{data.personalInfo.jobTitle}</p>
          <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
             <span>{data.personalInfo.email}</span><span>{data.personalInfo.phone}</span><span>{data.personalInfo.location}</span>
          </div>
        </header>
        <div className="text-right space-y-12 flex-1 h-full" dir={isRtl ? 'rtl' : 'ltr'}>
          <section className="text-center px-24"><p className="text-md leading-loose opacity-70 font-medium">{data.personalInfo.summary}</p></section>
          <section className="grid grid-cols-2 gap-20 mt-10 h-full">
            <div className="border-r border-slate-100 px-6"><SectionTitle minimal>{isRtl ? 'الخبرة' : 'Work Experience'}</SectionTitle>{renderExperience()}</div>
            <div className="space-y-16 px-6">
              <div><SectionTitle minimal>{isRtl ? 'المهارات' : 'Core Skills'}</SectionTitle>{renderSkills()}</div>
              <div><SectionTitle minimal>{isRtl ? 'التعليم' : 'Academic Path'}</SectionTitle>
                {data.education.map(edu => <div key={edu.id} className="mb-4"><p className="font-black text-sm">{edu.degree}</p><p className="text-[11px] opacity-40 uppercase">{edu.institution}</p></div>)}
              </div>
            </div>
          </section>
        </div>
        <footer className="mt-20 pt-10 border-t text-[10px] opacity-20 font-black tracking-[0.5em] shrink-0">{isRtl ? 'سيرة - المعيار المهني' : 'SIRA - PROFESSIONAL STANDARD'}</footer>
      </div>
    ),
    minimalist: () => (
      <div className="p-20 min-h-[1123px] h-full bg-white text-slate-900 flex flex-col" style={containerStyle}>
        <header className="mb-20 flex justify-between items-start shrink-0">
          <div>
            <h1 className="text-4xl font-light mb-2 tracking-tight">{data.personalInfo.fullName}</h1>
            <p className="text-lg opacity-40 font-medium mb-10">{data.personalInfo.jobTitle}</p>
            <div className="text-[11px] space-x-6 opacity-30 font-bold uppercase tracking-widest">
              <span>{data.personalInfo.email}</span><span>/</span><span>{data.personalInfo.phone}</span><span>/</span><span>{data.personalInfo.location}</span>
            </div>
          </div>
          <img src={userImage} className="w-32 h-32 rounded-sm object-cover grayscale opacity-80" alt="Profile" />
        </header>
        <div className="space-y-20 flex-1 h-full">
           <section className="max-w-2xl"><SectionTitle minimal>{isRtl ? 'عني' : 'About'}</SectionTitle><p className="text-sm leading-loose opacity-60 font-medium">{data.personalInfo.summary}</p></section>
           <section><SectionTitle minimal>{isRtl ? 'الخبرة' : 'Experience'}</SectionTitle>{renderExperience()}</section>
           <section><SectionTitle minimal>{isRtl ? 'المهارات' : 'Expertise'}</SectionTitle>
             <div className="flex flex-wrap gap-x-12 gap-y-6">
               {data.skills.map(s => <div key={s.id} className="space-y-2"><span className="text-[11px] font-black uppercase tracking-widest opacity-40">{s.name}</span><div className="w-32 h-0.5 bg-slate-100"><div className="h-full bg-slate-400" style={{ width: `${(s.level/5)*100}%` }}></div></div></div>)}
             </div>
           </section>
        </div>
      </div>
    ),
    technical: () => (
      <div className="p-12 min-h-[1123px] h-full bg-white text-slate-800 flex flex-col" style={containerStyle}>
        <header className="grid grid-cols-12 border-4 border-slate-900 mb-12 overflow-hidden shrink-0">
          <div className="col-span-8 p-10 bg-slate-900 text-white flex items-center gap-8">
            <img src={userImage} className="w-24 h-24 rounded border-2 border-white/20 object-cover" alt="Profile" />
            <div>
              <h1 className="text-4xl font-black tracking-tight">{data.personalInfo.fullName}</h1>
              <p className="text-lg font-bold opacity-60 uppercase tracking-widest mt-1">{data.personalInfo.jobTitle}</p>
            </div>
          </div>
          <div className="col-span-4 p-10 text-right text-[11px] font-black flex flex-col justify-center bg-slate-50 gap-2">
            <p className="flex items-center justify-end gap-2"><span>{data.personalInfo.email}</span> <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></span></p>
            <p className="flex items-center justify-end gap-2"><span>{data.personalInfo.phone}</span> <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></span></p>
            <p className="flex items-center justify-end gap-2"><span>{data.personalInfo.location}</span> <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></span></p>
          </div>
        </header>
        <div className="space-y-12 flex-1 h-full">
          <section className="border-b-2 border-slate-100 pb-10"><SectionTitle minimal>{isRtl ? 'نظرة فنية' : 'Technical Overview'}</SectionTitle><p className="text-sm font-mono opacity-80 leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-100">{data.personalInfo.summary}</p></section>
          <div className="grid grid-cols-12 gap-16 h-full">
             <div className="col-span-8 space-y-12 h-full">
               <section><SectionTitle minimal>{isRtl ? 'المشاريع والخبرات' : 'Technical Projects & Exp'}</SectionTitle>{renderExperience()}</section>
             </div>
             <div className="col-span-4 space-y-12 h-full">
               <section><SectionTitle minimal>{isRtl ? 'اللغات والمهارات' : 'Tech Stack'}</SectionTitle>{renderSkills()}</section>
               <section><SectionTitle minimal>{isRtl ? 'الشهادات' : 'Certifications'}</SectionTitle>
                {data.education.map(edu => <div key={edu.id} className="mb-6 p-4 bg-slate-50 border-r-4 border-slate-900" style={{ borderColor: themeColor }}><p className="font-black text-xs">{edu.degree}</p><p className="text-[10px] opacity-40 uppercase mt-1">{edu.institution}</p></div>)}
               </section>
             </div>
          </div>
        </div>
        <div className="text-[8px] font-mono opacity-20 text-center pt-10 shrink-0">GEN-CV-SIRA-ENGINE-UUID-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
      </div>
    ),
    bold: () => (
      <div className="flex min-h-[1123px] h-full" style={containerStyle}>
        <div className="w-1/3 bg-slate-900 p-12 space-y-12 text-white min-h-full h-full shrink-0" style={{ backgroundColor: themeColor }}>
          <img src={userImage} className="w-full rounded-full border-8 border-white/20 shadow-2xl aspect-square object-cover" alt="Profile" />
          <section className="pt-10"><SectionTitle light minimal>{isRtl ? 'تواصل' : 'Connect'}</SectionTitle><div className="text-[12px] font-black space-y-4 opacity-70"><p>{data.personalInfo.email}</p><p>{data.personalInfo.phone}</p><p>{data.personalInfo.location}</p></div></section>
          <section className="flex-1"><SectionTitle light minimal>{isRtl ? 'المهارات' : 'Skills'}</SectionTitle>{renderSkills(true)}</section>
        </div>
        <div className="flex-1 p-20 space-y-16 bg-white flex flex-col min-h-full h-full overflow-hidden">
           <header className="shrink-0"><h1 className="text-8xl font-black tracking-tighter text-slate-900 leading-none">{data.personalInfo.fullName.split(' ')[0]}<br/>{data.personalInfo.fullName.split(' ').slice(1).join(' ')}</h1><p className="text-2xl font-black mt-6 uppercase tracking-[0.3em] opacity-30">{data.personalInfo.jobTitle}</p></header>
           <section className="shrink-0"><SectionTitle minimal>{isRtl ? 'القصة المهنية' : 'My Story'}</SectionTitle><p className="text-xl leading-relaxed text-slate-500 font-medium italic">"{data.personalInfo.summary}"</p></section>
           <section className="flex-1 h-full"><SectionTitle minimal>{isRtl ? 'التجارب' : 'Experiences'}</SectionTitle>{renderExperience()}</section>
        </div>
      </div>
    ),
    compact: () => (
      <div className="p-10 min-h-[1123px] h-full bg-white text-slate-900 grid grid-cols-2 gap-10 flex flex-col" style={containerStyle}>
         <div className="space-y-10 flex flex-col h-full">
            <header className="pb-10 border-b-2 border-slate-900 shrink-0">
               <div className="flex items-center gap-4 mb-6">
                 <img src={userImage} className="w-20 h-20 rounded-2xl object-cover shadow-lg border-2 border-white" alt="Profile" />
                 <div>
                   <h1 className="text-3xl font-black leading-none">{data.personalInfo.fullName}</h1>
                   <p className="text-sm font-bold uppercase tracking-widest opacity-50 mt-1">{data.personalInfo.jobTitle}</p>
                 </div>
               </div>
               <div className="grid grid-cols-2 text-[9px] font-black uppercase gap-4 opacity-60">
                 <p>{data.personalInfo.email}</p><p>{data.personalInfo.phone}</p><p className="col-span-2">{data.personalInfo.location}</p>
               </div>
            </header>
            <section className="shrink-0"><SectionTitle minimal>{isRtl ? 'نبذة' : 'Summary'}</SectionTitle><p className="text-[12px] leading-loose opacity-70 font-medium">{data.personalInfo.summary}</p></section>
            <section className="flex-1 h-full"><SectionTitle minimal>{isRtl ? 'التعليم' : 'Education'}</SectionTitle>
              {data.education.map(edu => <div key={edu.id} className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100"><p className="font-black text-xs">{edu.degree}</p><p className="text-[10px] opacity-40 uppercase mt-1">{edu.institution}</p></div>)}
            </section>
         </div>
         <div className="space-y-10 flex flex-col h-full">
            <section className="flex-1 h-full"><SectionTitle minimal>{isRtl ? 'الخبرة' : 'Experience'}</SectionTitle>
               <div className="space-y-6">
                 {data.experience.map(exp => (
                   <div key={exp.id} className="border-b border-slate-50 pb-6 last:border-0">
                     <p className="font-black text-[13px]">{exp.position}</p>
                     <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-1 mb-2">{exp.company}</p>
                     <p className="text-[10px] opacity-60 leading-relaxed line-clamp-3">{exp.description}</p>
                   </div>
                 ))}
               </div>
            </section>
            <section className="bg-slate-900 p-10 rounded-[3rem] text-white shrink-0" style={{ backgroundColor: themeColor }}><SectionTitle light minimal>{isRtl ? 'المهارات' : 'Skills'}</SectionTitle>{renderSkills(true)}</section>
         </div>
      </div>
    )
  };

  return (
    <div 
      className={`print-container bg-white shadow-2xl mx-auto overflow-hidden min-h-[1123px] w-[794px] transform origin-top`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {templatesMap[template] ? templatesMap[template]() : templatesMap.modern()}
    </div>
  );
};

export default CVPreview;
