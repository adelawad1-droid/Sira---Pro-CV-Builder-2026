
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
  // Use the provided fontFamily strictly, falling back to sans-serif
  const containerStyle = { fontFamily: `${fontFamily}, sans-serif` };
  const userImage = data.personalInfo.image || DEFAULT_AVATAR;

  const SectionTitle = ({ children, icon: Icon, light = false, minimal = false, centered = false, bordered = false }: any) => (
    <div className={`mb-6 ${minimal ? 'border-b pb-2 mb-4' : ''} ${centered ? 'flex flex-col items-center' : ''} ${bordered ? 'p-3 border-2 mb-8' : ''}`} style={bordered ? { borderColor: themeColor } : {}}>
      <h3 className={`text-md font-black uppercase tracking-wider flex items-center gap-2 ${light ? 'text-white' : 'text-slate-900'} ${centered ? 'text-center' : ''}`} style={!light && !minimal && !bordered ? { color: themeColor } : {}}>
        {Icon && !minimal && (
          <span className={`w-7 h-7 rounded flex items-center justify-center ${light ? 'bg-white/10 text-white' : 'text-white'}`} style={!light ? { backgroundColor: themeColor } : {}}>
            <Icon />
          </span>
        )}
        {children}
      </h3>
      {!minimal && !bordered && <div className={`h-0.5 w-10 mt-1 rounded-full ${light ? 'bg-white/20' : ''} ${centered ? 'mx-auto' : ''}`} style={!light ? { backgroundColor: themeColor } : {}}></div>}
    </div>
  );

  const renderExperience = (light = false, showTimeline = false, compact = false) => (
    <div className={`space-y-6 ${showTimeline ? 'border-r-2 md:border-r-0 md:border-l-2 border-slate-200 pr-6 pl-0 md:pr-0 md:pl-6' : ''}`}>
      {data.experience.map((exp) => (
        <div key={exp.id} className="relative">
          {showTimeline && (
            <div className={`absolute top-1.5 ${isRtl ? '-right-[29px]' : '-left-[29px]'} w-3 h-3 rounded-full bg-white border-2`} style={{ borderColor: themeColor }}></div>
          )}
          <div className="flex justify-between items-start mb-1">
            <h4 className={`font-black text-sm ${light ? 'text-white' : 'text-slate-900'}`}>{exp.position}</h4>
            {!compact && <span className={`text-[10px] font-bold uppercase ${light ? 'text-slate-300' : 'text-slate-400'}`}>{exp.startDate} - {exp.endDate}</span>}
          </div>
          <p className={`text-[11px] font-black uppercase tracking-tight mb-2 ${light ? 'text-slate-400' : ''}`} style={!light ? { color: themeColor } : {}}>{exp.company} {compact && `| ${exp.startDate} - ${exp.endDate}`}</p>
          <p className={`text-xs leading-relaxed opacity-80 whitespace-pre-line ${light ? 'text-slate-300' : 'text-slate-600'}`}>{exp.description}</p>
        </div>
      ))}
    </div>
  );

  const renderSkills = (isLight = false, variant: 'bar' | 'chip' | 'dots' = 'bar') => (
    <div className={variant === 'bar' ? 'space-y-3' : 'flex flex-wrap gap-2'}>
      {data.skills.map(s => (
        variant === 'bar' ? (
          <div key={s.id}>
            <div className={`flex justify-between text-[10px] font-black mb-1 uppercase ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>
              <span>{s.name}</span>
            </div>
            <div className={`h-1.5 w-full rounded-full ${isLight ? 'bg-white/10' : 'bg-slate-100'}`}>
              <div className="h-full rounded-full" style={{ width: `${(s.level/5)*100}%`, backgroundColor: themeColor }}></div>
            </div>
          </div>
        ) : variant === 'dots' ? (
           <div key={s.id} className="flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase ${isLight ? 'text-white' : 'text-slate-700'}`}>{s.name}</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(dot => <div key={dot} className={`w-1.5 h-1.5 rounded-full ${s.level >= dot ? '' : 'bg-slate-200'}`} style={s.level >= dot ? { backgroundColor: themeColor } : {}}></div>)}
              </div>
           </div>
        ) : (
          <span key={s.id} className="px-3 py-1 rounded-full text-[9px] font-black uppercase border" style={{ borderColor: themeColor, color: themeColor }}>
            {s.name}
          </span>
        )
      ))}
    </div>
  );

  const templatesMap: Record<TemplateType, () => React.ReactElement> = {
    modern: () => (
      <div className="flex flex-col min-h-[1123px] h-full bg-white text-slate-800 p-12">
        <header className="mb-12 border-b-4 pb-8" style={{ borderColor: themeColor }}>
          <div className="flex items-center gap-8">
            <img src={userImage} className="w-32 h-32 rounded-2xl object-cover shadow-md border-4 border-white" alt="Profile" />
            <div>
              <h1 className="text-4xl font-black mb-2 text-slate-900">{data.personalInfo.fullName}</h1>
              <p className="text-xl font-bold opacity-60 mb-4">{data.personalInfo.jobTitle}</p>
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
    classic: () => (
      <div className="p-20 min-h-[1123px] h-full bg-white text-slate-900 text-center">
         <h1 className="text-5xl font-bold mb-4">{data.personalInfo.fullName}</h1>
         <div className="flex justify-center gap-8 text-sm opacity-60 mb-12 border-y-2 py-4 border-slate-900">
            <span>{data.personalInfo.email}</span>
            <span>{data.personalInfo.phone}</span>
            <span>{data.personalInfo.location}</span>
         </div>
         <div className="text-right space-y-12">
            <section><h2 className="text-2xl font-bold border-b-2 border-slate-900 mb-6 pb-2 inline-block px-4">{isRtl ? 'الهدف المهني' : 'Professional Objective'}</h2><p className="text-sm leading-loose px-10">{data.personalInfo.summary}</p></section>
            <section><h2 className="text-2xl font-bold border-b-2 border-slate-900 mb-6 pb-2 inline-block px-4">{isRtl ? 'المسار الوظيفي' : 'Experience'}</h2>{renderExperience()}</section>
            <div className="grid grid-cols-2 gap-20">
               <section><h2 className="text-2xl font-bold border-b-2 border-slate-900 mb-6 pb-2 inline-block px-4">{isRtl ? 'التحصيل الأكاديمي' : 'Education'}</h2>{data.education.map(edu => <div key={edu.id} className="mb-4 text-center"><p className="font-bold">{edu.degree}</p><p className="text-xs opacity-50 uppercase">{edu.institution}</p></div>)}</section>
               <section><h2 className="text-2xl font-bold border-b-2 border-slate-900 mb-6 pb-2 inline-block px-4">{isRtl ? 'المهارات' : 'Skills'}</h2>{renderSkills(false, 'chip')}</section>
            </div>
         </div>
      </div>
    ),
    startup: () => (
      <div className="flex flex-col min-h-[1123px] h-full bg-white text-slate-900 p-16">
         <div className="flex items-start justify-between mb-24">
            <div className="max-w-xl">
               <h1 className="text-7xl font-black tracking-tighter leading-none mb-6 italic">{data.personalInfo.fullName.split(' ')[0]}<span style={{ color: themeColor }}>.</span></h1>
               <p className="text-3xl font-bold opacity-30">{data.personalInfo.jobTitle}</p>
            </div>
            <img src={userImage} className="w-40 h-40 rounded-[3rem] object-cover shadow-2xl rotate-3" alt="Profile" />
         </div>
         <div className="grid grid-cols-12 gap-20">
            <div className="col-span-8 space-y-16">
               <section><SectionTitle minimal>{isRtl ? 'مشاريعي' : 'Experience'}</SectionTitle>{renderExperience()}</section>
            </div>
            <div className="col-span-4 space-y-12">
               <div className="bg-slate-50 p-10 rounded-[4rem] border border-slate-100">
                  <SectionTitle minimal>{isRtl ? 'المهارات' : 'Tech'}</SectionTitle>{renderSkills(false, 'dots')}
               </div>
               <div className="px-6 text-[10px] font-black uppercase tracking-widest space-y-3 opacity-30">
                  <p>{data.personalInfo.email}</p><p>{data.personalInfo.phone}</p><p>{data.personalInfo.location}</p>
               </div>
            </div>
         </div>
      </div>
    ),
    neon: () => (
      <div className="bg-slate-950 min-h-[1123px] h-full text-white p-16 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-20"></div>
         <header className="relative z-10 mb-20">
            <h1 className="text-6xl font-black tracking-widest uppercase mb-4 shadow-blue-500/50" style={{ textShadow: `0 0 20px ${themeColor}` }}>{data.personalInfo.fullName}</h1>
            <p className="text-xl font-bold tracking-[0.5em] opacity-50 uppercase">{data.personalInfo.jobTitle}</p>
         </header>
         <div className="grid grid-cols-12 gap-12 relative z-10">
            <div className="col-span-7 space-y-12">
               <section className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10"><SectionTitle light minimal>{isRtl ? 'التاريخ المهني' : 'History'}</SectionTitle>{renderExperience(true)}</section>
            </div>
            <div className="col-span-5 space-y-12">
               <section className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10"><SectionTitle light minimal>{isRtl ? 'الكفاءة' : 'Skills'}</SectionTitle>{renderSkills(true)}</section>
               <section className="p-10 border border-white/5 rounded-3xl"><SectionTitle light minimal>{isRtl ? 'تواصل' : 'Connect'}</SectionTitle><div className="text-xs space-y-4 opacity-50 uppercase tracking-widest"><p>{data.personalInfo.email}</p><p>{data.personalInfo.phone}</p><p>{data.personalInfo.location}</p></div></section>
            </div>
         </div>
      </div>
    ),
    glass: () => (
      <div className="p-16 min-h-[1123px] h-full flex flex-col items-center justify-center relative bg-slate-100">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent)]"></div>
         <div className="w-full bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[4rem] p-16 shadow-2xl relative z-10 flex-1">
            <div className="flex items-center gap-10 mb-20">
               <img src={userImage} className="w-32 h-32 rounded-full border-4 border-white/80 shadow-lg object-cover" alt="Profile" />
               <div><h1 className="text-5xl font-black text-slate-900 mb-2">{data.personalInfo.fullName}</h1><p className="text-xl font-bold text-slate-500 tracking-widest uppercase">{data.personalInfo.jobTitle}</p></div>
            </div>
            <div className="grid grid-cols-12 gap-12">
               <div className="col-span-8 space-y-12">
                  <section><SectionTitle minimal bordered>{isRtl ? 'نبذة' : 'About'}</SectionTitle><p className="text-sm leading-loose opacity-70">{data.personalInfo.summary}</p></section>
                  <section><SectionTitle minimal bordered>{isRtl ? 'الخبرة' : 'Work'}</SectionTitle>{renderExperience()}</section>
               </div>
               <div className="col-span-4 space-y-12">
                  <section><SectionTitle minimal bordered>{isRtl ? 'القدرات' : 'Expertise'}</SectionTitle>{renderSkills()}</section>
                  <section className="bg-white/20 p-8 rounded-3xl border border-white/40 shadow-sm">
                     <SectionTitle minimal>{isRtl ? 'بيانات' : 'Contact'}</SectionTitle>
                     <div className="text-[10px] font-bold space-y-4 uppercase tracking-widest opacity-50"><p>{data.personalInfo.email}</p><p>{data.personalInfo.phone}</p><p>{data.personalInfo.location}</p></div>
                  </section>
               </div>
            </div>
         </div>
      </div>
    ),
    journal: () => (
      <div className="p-16 min-h-[1123px] h-full bg-[#fdfcf8] text-slate-900 flex flex-col">
         <div className="text-center border-b-8 border-double border-slate-900 pb-10 mb-10">
            <p className="text-[10px] font-black tracking-[0.8em] mb-4 opacity-40 uppercase">VOL 5. NO 2. RESUME SPECIAL EDITION</p>
            <h1 className="text-8xl font-black tracking-tighter uppercase mb-2">{data.personalInfo.fullName}</h1>
            <p className="text-2xl italic border-t border-slate-300 pt-4 px-20 inline-block">{data.personalInfo.jobTitle}</p>
         </div>
         <div className="grid grid-cols-3 gap-12 flex-1">
            <div className="border-r border-slate-200 pr-12 space-y-10">
               <section><h3 className="text-xl font-bold border-b border-slate-900 mb-6 uppercase tracking-widest">{isRtl ? 'الهدف' : 'Objective'}</h3><p className="text-xs leading-relaxed italic opacity-80 text-justify">{data.personalInfo.summary}</p></section>
               <section><h3 className="text-xl font-bold border-b border-slate-900 mb-6 uppercase tracking-widest">{isRtl ? 'التعليم' : 'Academic'}</h3>{data.education.map(edu => <div key={edu.id} className="mb-4"><p className="font-bold text-xs">{edu.degree}</p><p className="text-[10px] italic opacity-50">{edu.institution}</p></div>)}</section>
               <section><h3 className="text-xl font-bold border-b border-slate-900 mb-6 uppercase tracking-widest">{isRtl ? 'المهارات' : 'Core Skills'}</h3>{renderSkills(false, 'chip')}</section>
            </div>
            <div className="col-span-2 space-y-10">
               <section><h3 className="text-3xl font-black mb-10 uppercase tracking-tighter border-b-2 border-slate-900 pb-2">{isRtl ? 'السجل المهني' : 'The Career Story'}</h3>{renderExperience()}</section>
               <div className="mt-auto pt-10 border-t-4 border-slate-900 flex justify-between text-[10px] font-black uppercase opacity-30 tracking-[0.5em]">
                  <span>{data.personalInfo.location}</span><span>{data.personalInfo.email}</span>
               </div>
            </div>
         </div>
      </div>
    ),
    academic: () => (
      <div className="p-20 min-h-[1123px] h-full bg-white text-slate-900">
        <header className="text-center mb-16 border-b-2 border-slate-900 pb-10">
          <h1 className="text-4xl font-bold mb-4">{data.personalInfo.fullName}</h1>
          <div className="flex justify-center gap-6 text-sm opacity-70">
            <span>{data.personalInfo.email}</span>
            <span>•</span>
            <span>{data.personalInfo.phone}</span>
            <span>•</span>
            <span>{data.personalInfo.location}</span>
          </div>
        </header>
        <div className="space-y-12">
          <section>
            <h2 className="text-lg font-bold border-b border-slate-300 mb-6 uppercase tracking-widest">{isRtl ? 'الملخص الأكاديمي' : 'Academic Summary'}</h2>
            <p className="text-[13px] leading-relaxed text-justify opacity-80">{data.personalInfo.summary}</p>
          </section>
          <section>
            <h2 className="text-lg font-bold border-b border-slate-300 mb-6 uppercase tracking-widest">{isRtl ? 'التعليم العالي' : 'Education'}</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-6 flex justify-between">
                <div>
                  <h4 className="font-bold text-sm">{edu.degree}</h4>
                  <p className="text-sm italic opacity-70">{edu.institution}</p>
                </div>
                <div className="text-sm font-bold opacity-40">{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </section>
        </div>
      </div>
    ),
    engineering: () => (
      <div className="p-12 min-h-[1123px] h-full bg-white text-slate-800 border-[12px] border-slate-100 flex flex-col">
         <div className="grid grid-cols-12 border-2 border-slate-900">
            <div className="col-span-9 p-10 bg-slate-900 text-white flex flex-col justify-center">
               <h1 className="text-5xl font-black mb-2 tracking-tighter">{data.personalInfo.fullName}</h1>
               <p className="text-lg font-bold opacity-60 uppercase tracking-widest">[{data.personalInfo.jobTitle}]</p>
            </div>
            <div className="col-span-3 bg-slate-100 flex items-center justify-center p-4">
               <img src={userImage} className="w-full aspect-square object-cover border-2 border-slate-900" alt="Profile" />
            </div>
         </div>
         <div className="mt-12 space-y-12 flex-1">
            <section className="border-2 border-slate-900 p-8"><h3 className="text-xl font-black border-b-2 border-slate-900 mb-6 pb-2 inline-block">SPECIFICATIONS</h3><p className="text-xs leading-relaxed">{data.personalInfo.summary}</p></section>
            <div className="grid grid-cols-12 gap-12">
               <div className="col-span-8 border-r-2 border-slate-100 pr-12">
                  <section><h3 className="text-xl font-black border-b-2 border-slate-900 mb-10 pb-2 inline-block">WORK HISTORY</h3>{renderExperience(false, false, true)}</section>
               </div>
               <div className="col-span-4 space-y-12">
                  <section><h3 className="text-lg font-black border-b-2 border-slate-900 mb-6 pb-2 inline-block">TECHNICAL</h3>{renderSkills()}</section>
                  <section><h3 className="text-lg font-black border-b-2 border-slate-900 mb-6 pb-2 inline-block">ACADEMIC</h3>{data.education.map(edu => <div key={edu.id} className="mb-4"><p className="font-black text-xs">{edu.degree}</p><p className="text-[10px] opacity-50 uppercase mt-1">{edu.institution}</p></div>)}</section>
               </div>
            </div>
         </div>
         <div className="mt-auto border-t-2 border-slate-900 pt-4 flex justify-between text-[10px] font-bold opacity-30">
            <span>ENGINEER-REF-992-X</span><span>{data.personalInfo.phone}</span>
         </div>
      </div>
    ),
    artistic: () => (
      <div className="min-h-[1123px] h-full bg-slate-50 relative p-16 flex flex-col">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-white skew-x-[-15deg] origin-top translate-x-32 shadow-2xl z-0"></div>
         <div className="relative z-10 flex-1 flex flex-col">
            <header className="mb-32 flex items-center justify-between">
               <div className="space-y-4">
                  <h1 className="text-8xl font-black tracking-tighter text-slate-900 leading-none">{data.personalInfo.fullName.split(' ')[0]}<br/>{data.personalInfo.fullName.split(' ').slice(1).join(' ')}</h1>
                  <p className="text-2xl font-bold tracking-[0.3em] uppercase opacity-20">{data.personalInfo.jobTitle}</p>
               </div>
               <div className="p-4 bg-white rounded-full shadow-2xl"><img src={userImage} className="w-48 h-48 rounded-full object-cover" alt="Profile" /></div>
            </header>
            <div className="grid grid-cols-12 gap-20 flex-1">
               <div className="col-span-5 space-y-12">
                  <section><SectionTitle minimal>{isRtl ? 'قصتي' : 'Manifesto'}</SectionTitle><p className="text-lg italic opacity-60 leading-relaxed">"{data.personalInfo.summary}"</p></section>
                  <section><SectionTitle minimal>{isRtl ? 'المهارات' : 'Artistic Stack'}</SectionTitle>{renderSkills(false, 'chip')}</section>
               </div>
               <div className="col-span-7 space-y-12">
                  <section className="pl-12 border-l-4" style={{ borderColor: themeColor }}><SectionTitle minimal>{isRtl ? 'المسار الإبداعي' : 'Creative Journey'}</SectionTitle>{renderExperience()}</section>
               </div>
            </div>
            <footer className="mt-auto flex justify-between text-[11px] font-black uppercase tracking-[0.5em] opacity-30">
               <span>{data.personalInfo.email}</span><span>{data.personalInfo.phone}</span>
            </footer>
         </div>
      </div>
    ),
    official: () => (
      <div className="p-20 min-h-[1123px] h-full bg-white text-slate-900 flex flex-col border-[20px] border-slate-50">
         <div className="flex justify-between items-center mb-16 border-b-4 border-slate-900 pb-12">
            <div>
               <h1 className="text-4xl font-black uppercase mb-4 tracking-tighter">{data.personalInfo.fullName}</h1>
               <p className="text-xl font-bold text-slate-500 uppercase tracking-widest">{data.personalInfo.jobTitle}</p>
            </div>
            <div className="text-right text-xs font-bold space-y-1 opacity-60">
               <p>{data.personalInfo.email}</p><p>{data.personalInfo.phone}</p><p>{data.personalInfo.location}</p>
            </div>
         </div>
         <div className="space-y-12 flex-1">
            <section><h3 className="text-lg font-black border-b-2 border-slate-900 mb-6 pb-1 inline-block uppercase tracking-widest">{isRtl ? 'الهدف المهني' : 'Executive Purpose'}</h3><p className="text-sm leading-relaxed opacity-70 font-medium">{data.personalInfo.summary}</p></section>
            <section><h3 className="text-lg font-black border-b-2 border-slate-900 mb-6 pb-1 inline-block uppercase tracking-widest">{isRtl ? 'السيرة المهنية' : 'Career Progression'}</h3>{renderExperience()}</section>
            <div className="grid grid-cols-2 gap-16">
               <section><h3 className="text-lg font-black border-b-2 border-slate-900 mb-6 pb-1 inline-block uppercase tracking-widest">{isRtl ? 'التعليم والشهادات' : 'Academic Credentials'}</h3>{data.education.map(edu => <div key={edu.id} className="mb-4"><p className="font-bold text-sm">{edu.degree}</p><p className="text-[10px] opacity-40 uppercase tracking-widest">{edu.institution}</p></div>)}</section>
               <section><h3 className="text-lg font-black border-b-2 border-slate-900 mb-6 pb-1 inline-block uppercase tracking-widest">{isRtl ? 'المهارات' : 'Key Core Skills'}</h3>{renderSkills()}</section>
            </div>
         </div>
         <div className="mt-20 pt-10 border-t text-center text-[10px] font-black uppercase tracking-[0.8em] opacity-20">CERTIFIED PROFESSIONAL DOCUMENT</div>
      </div>
    ),
    architectural: () => (
       <div className="flex min-h-[1123px] h-full bg-white p-12 gap-12">
          <div className="w-1/3 flex flex-col gap-12 border-r-2 border-slate-900 pr-12">
             <header className="mb-20">
                <h1 className="text-5xl font-black tracking-tighter leading-none mb-6 text-slate-900">{data.personalInfo.fullName}</h1>
                <p className="text-xl font-bold opacity-30 uppercase tracking-[0.2em]">{data.personalInfo.jobTitle}</p>
             </header>
             <section><SectionTitle minimal>{isRtl ? 'المهارات' : 'Structure'}</SectionTitle>{renderSkills(false, 'bar')}</section>
             <section><SectionTitle minimal>{isRtl ? 'التعليم' : 'Foundations'}</SectionTitle>{data.education.map(edu => <div key={edu.id} className="mb-4"><p className="font-black text-xs">{edu.degree}</p><p className="text-[10px] opacity-40 uppercase">{edu.institution}</p></div>)}</section>
             <div className="mt-auto space-y-4 opacity-30 text-[10px] font-black uppercase tracking-widest">
                <p>{data.personalInfo.email}</p><p>{data.personalInfo.phone}</p><p>{data.personalInfo.location}</p>
             </div>
          </div>
          <div className="flex-1 flex flex-col gap-12 pt-40">
             <section className="mb-10"><SectionTitle minimal>{isRtl ? 'نبذة' : 'Blueprint'}</SectionTitle><p className="text-sm leading-loose italic opacity-60">"{data.personalInfo.summary}"</p></section>
             <section><SectionTitle minimal>{isRtl ? 'الخبرات' : 'Construction'}</SectionTitle>{renderExperience()}</section>
          </div>
       </div>
    ),
    retro: () => (
       <div className="p-16 min-h-[1123px] h-full bg-[#f4ece1] text-[#2c2c2c] flex flex-col border-[24px] border-[#e8ded0]">
          <header className="border-b-4 border-[#2c2c2c] pb-10 mb-10 flex justify-between items-end">
             <h1 className="text-6xl font-black uppercase tracking-tighter">{data.personalInfo.fullName}</h1>
             <div className="text-right text-[10px] font-bold uppercase tracking-[0.3em] opacity-60"><p>{data.personalInfo.email}</p><p>{data.personalInfo.phone}</p></div>
          </header>
          <div className="grid grid-cols-12 gap-12 flex-1">
             <div className="col-span-8 border-r-4 border-[#2c2c2c] pr-12 space-y-12">
                <section><h3 className="text-2xl font-bold italic mb-6">{isRtl ? 'الملخص' : 'The Summary'}</h3><p className="text-sm leading-relaxed text-justify opacity-80">{data.personalInfo.summary}</p></section>
                <section><h3 className="text-2xl font-bold italic mb-6">{isRtl ? 'الخبرات' : 'Professional History'}</h3>{renderExperience()}</section>
             </div>
             <div className="col-span-4 space-y-12">
                <section><h3 className="text-lg font-bold uppercase tracking-widest mb-6 border-b-2 border-[#2c2c2c] inline-block">{isRtl ? 'المهارات' : 'Abilities'}</h3>{renderSkills()}</section>
                <section><h3 className="text-lg font-bold uppercase tracking-widest mb-6 border-b-2 border-[#2c2c2c] inline-block">{isRtl ? 'التعليم' : 'Schooling'}</h3>{data.education.map(edu => <div key={edu.id} className="mb-4"><p className="font-bold text-xs">{edu.degree}</p><p className="text-[10px] italic opacity-50">{edu.institution}</p></div>)}</section>
             </div>
          </div>
       </div>
    ),
    luxury: () => (
      <div className="flex flex-col min-h-[1123px] h-full bg-[#1a1a1a] text-white p-0 overflow-hidden">
        <div className="h-6 w-full" style={{ backgroundColor: '#b4975a' }}></div>
        <div className="p-16 flex flex-col items-center text-center">
          <img src={userImage} className="w-32 h-32 rounded-full border-4 mb-6 object-cover shadow-2xl" style={{ borderColor: '#b4975a' }} alt="Profile" />
          <h1 className="text-5xl font-light tracking-widest uppercase mb-2" style={{ color: '#b4975a' }}>{data.personalInfo.fullName}</h1>
          <p className="text-lg tracking-[0.3em] font-light opacity-50 mb-10">{data.personalInfo.jobTitle}</p>
          <div className="flex gap-8 text-[10px] font-bold tracking-widest opacity-40 uppercase">
            <span>{data.personalInfo.email}</span>
            <span style={{ color: '#b4975a' }}>◆</span>
            <span>{data.personalInfo.phone}</span>
            <span style={{ color: '#b4975a' }}>◆</span>
            <span>{data.personalInfo.location}</span>
          </div>
        </div>
        <div className="px-16 pb-16 grid grid-cols-12 gap-16 flex-1">
          <div className="col-span-8 space-y-12">
            <section><SectionTitle light centered>{isRtl ? 'البيان المهني' : 'Professional Statement'}</SectionTitle><p className="text-center text-sm font-light opacity-70 leading-loose italic">"{data.personalInfo.summary}"</p></section>
            <section><SectionTitle light>{isRtl ? 'تاريخ العمل' : 'Work History'}</SectionTitle>{renderExperience(true)}</section>
          </div>
          <div className="col-span-4 space-y-12 border-l border-white/10 pl-12">
            <section><SectionTitle light>{isRtl ? 'الخبرات' : 'Expertise'}</SectionTitle>{renderSkills(true)}</section>
            <section><SectionTitle light>{isRtl ? 'التعليم' : 'Academic Background'}</SectionTitle>
              {data.education.map(edu => <div key={edu.id} className="mb-6"><p className="font-bold text-xs" style={{ color: '#b4975a' }}>{edu.degree}</p><p className="text-[10px] opacity-40 uppercase tracking-tighter">{edu.institution}</p></div>)}
            </section>
          </div>
        </div>
      </div>
    ),
    timeline: () => (
      <div className="p-16 min-h-[1123px] h-full bg-white flex flex-col">
        <header className="flex justify-between items-end mb-20">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">{data.personalInfo.fullName}</h1>
            <p className="text-xl font-bold uppercase tracking-[0.2em]" style={{ color: themeColor }}>{data.personalInfo.jobTitle}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-[10px] font-black opacity-40 uppercase">{data.personalInfo.email}</p>
            <p className="text-[10px] font-black opacity-40 uppercase">{data.personalInfo.phone}</p>
            <p className="text-[10px] font-black opacity-40 uppercase">{data.personalInfo.location}</p>
          </div>
        </header>
        <div className="grid grid-cols-12 gap-16 flex-1">
          <div className="col-span-8 space-y-16">
            <section><SectionTitle minimal>{isRtl ? 'المسار الزمني' : 'Career Timeline'}</SectionTitle>{renderExperience(false, true)}</section>
            <section><SectionTitle minimal>{isRtl ? 'التعليم والشهادات' : 'Academic Path'}</SectionTitle>
              <div className="space-y-6">
                {data.education.map(edu => (
                   <div key={edu.id} className="flex gap-6">
                      <div className="w-16 text-[10px] font-black opacity-30 pt-1">{edu.startDate}</div>
                      <div>
                        <h4 className="font-black text-sm">{edu.degree}</h4>
                        <p className="text-[10px] font-bold uppercase opacity-50">{edu.institution}</p>
                      </div>
                   </div>
                ))}
              </div>
            </section>
          </div>
          <div className="col-span-4 space-y-12">
            <img src={userImage} className="w-full aspect-square rounded-full border-8 border-slate-50 object-cover shadow-inner mb-10" alt="Profile" />
            <section><SectionTitle minimal>{isRtl ? 'عني' : 'About Me'}</SectionTitle><p className="text-xs opacity-60 leading-relaxed">{data.personalInfo.summary}</p></section>
            <section><SectionTitle minimal>{isRtl ? 'المهارات' : 'Technical Skills'}</SectionTitle>{renderSkills()}</section>
          </div>
        </div>
      </div>
    ),
    infographic: () => (
      <div className="flex flex-col min-h-[1123px] h-full bg-slate-50">
         <div className="p-12 flex items-center justify-between bg-white border-b shrink-0">
            <div className="flex items-center gap-6">
               <img src={userImage} className="w-24 h-24 rounded-full object-cover shadow-lg" alt="Profile" />
               <div>
                  <h1 className="text-4xl font-black text-slate-900 leading-none">{data.personalInfo.fullName}</h1>
                  <p className="text-lg font-bold text-slate-400 mt-2 uppercase">{data.personalInfo.jobTitle}</p>
               </div>
            </div>
         </div>
         <div className="p-12 grid grid-cols-12 gap-12 flex-1">
            <div className="col-span-4 space-y-10">
               <section className="bg-white p-8 rounded-[2rem] shadow-sm"><SectionTitle minimal>{isRtl ? 'الكفاءات' : 'Expertise'}</SectionTitle>{renderSkills()}</section>
            </div>
            <div className="col-span-8 space-y-10">
               <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border-l-8" style={{ borderColor: themeColor }}><p className="text-sm leading-loose opacity-70">{data.personalInfo.summary}</p></section>
               <section className="bg-white p-10 rounded-[2.5rem] shadow-sm"><SectionTitle minimal>{isRtl ? 'الخبرة العملية' : 'Career Highlights'}</SectionTitle>{renderExperience()}</section>
            </div>
         </div>
      </div>
    ),
    executive: () => (
      <div className="flex min-h-[1123px] h-full bg-white">
        <aside className="w-72 bg-slate-900 text-white p-10 space-y-10 flex flex-col min-h-full">
          <img src={userImage} className="w-full aspect-square rounded-xl object-cover mb-8 grayscale border-2 border-white/20" alt="Profile" />
          <section className="flex-1"><SectionTitle light>{isRtl ? 'المهارات' : 'Skills'}</SectionTitle>{renderSkills(true)}</section>
        </aside>
        <main className="flex-1 p-16 h-full">
          <header className="mb-12 border-l-8 pl-6" style={{ borderColor: themeColor }}>
            <h1 className="text-5xl font-black text-slate-900 mb-2">{data.personalInfo.fullName}</h1>
            <p className="text-lg font-bold uppercase tracking-widest text-slate-400">{data.personalInfo.jobTitle}</p>
          </header>
          <section><SectionTitle>{isRtl ? 'المسار المهني' : 'Career path'}</SectionTitle>{renderExperience()}</section>
        </main>
      </div>
    ),
    creative: () => (
      <div className="flex flex-col min-h-[1123px] h-full bg-slate-50">
        <header className="h-72 flex items-center justify-between p-12 text-white relative overflow-hidden shrink-0" style={{ backgroundColor: themeColor }}>
          <div className="relative z-10 flex-1"><h1 className="text-5xl font-black mb-3">{data.personalInfo.fullName}</h1><p className="text-xl font-bold opacity-90 tracking-wide uppercase">({data.personalInfo.jobTitle})</p></div>
          <div className="relative z-10 mr-4 ml-4"><img src={userImage} className="w-48 h-48 rounded-full border-8 border-white shadow-2xl object-cover" alt="Profile" /></div>
        </header>
        <div className="p-12 grid grid-cols-12 gap-12 flex-1 h-full">
          <div className="col-span-4 space-y-10">
             <div className="bg-white p-8 rounded-[3rem] shadow-sm space-y-8 h-full border border-slate-100"><section><SectionTitle minimal>{isRtl ? 'مهاراتي' : 'My Skills'}</SectionTitle>{renderSkills()}</section></div>
          </div>
          <div className="col-span-8 space-y-10 h-full"><section><SectionTitle minimal>{isRtl ? 'ماذا فعلت؟' : 'Experiences'}</SectionTitle>{renderExperience()}</section></div>
        </div>
      </div>
    ),
    geometric: () => (
      <div className="p-16 min-h-[1123px] h-full bg-white relative flex flex-col">
        <div className="absolute top-0 left-0 w-full h-4" style={{ backgroundColor: themeColor }}></div>
        <header className="mb-16 flex justify-between items-center border-b pb-8 mt-10 shrink-0">
          <div className="flex items-center gap-6"><img src={userImage} className="w-24 h-24 rounded-lg object-cover shadow-lg border-2" style={{ borderColor: themeColor }} alt="Profile" /><div><h1 className="text-5xl font-black text-slate-900">{data.personalInfo.fullName}</h1><h2 className="text-xl font-bold uppercase tracking-widest mt-2" style={{ color: themeColor }}>{data.personalInfo.jobTitle}</h2></div></div>
        </header>
        <div className="grid grid-cols-12 gap-16 flex-1 h-full">
          <div className="col-span-7 space-y-12 h-full"><section><SectionTitle minimal>{isRtl ? 'الخبرات' : 'Experience'}</SectionTitle>{renderExperience()}</section></div>
          <div className="col-span-5 space-y-12 h-full"><section><SectionTitle minimal>{isRtl ? 'القدرات' : 'Capabilities'}</SectionTitle>{renderSkills()}</section></div>
        </div>
      </div>
    ),
    sidebar: () => (
      <div className="flex min-h-[1123px] h-full bg-white">
        <aside className="w-24 bg-slate-50 flex flex-col items-center py-12 gap-10 border-r border-slate-100 min-h-full">
           <img src={userImage} className="w-16 h-16 rounded-2xl object-cover shadow-xl grayscale" alt="Profile" /><div className="flex-1 w-px bg-slate-200"></div><div className="rotate-90 text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] whitespace-nowrap mb-12 origin-center">RESUME DOCUMENT</div>
        </aside>
        <main className="flex-1 p-20 flex gap-16 h-full">
           <div className="flex-[2] space-y-12 h-full"><header><h1 className="text-6xl font-black mb-2 tracking-tighter">{data.personalInfo.fullName}</h1><p className="text-2xl font-bold opacity-40 uppercase tracking-widest">{data.personalInfo.jobTitle}</p></header><section><SectionTitle minimal>{isRtl ? 'الخبرة المهنية' : 'Work History'}</SectionTitle>{renderExperience()}</section></div>
           <div className="flex-1 space-y-12 pt-32 h-full"><section className="bg-slate-50 p-8 rounded-3xl border border-slate-100"><SectionTitle minimal>{isRtl ? 'المهارات' : 'Skills'}</SectionTitle>{renderSkills()}</section></div>
        </main>
      </div>
    ),
    professional: () => (
      <div className="p-16 min-h-[1123px] h-full bg-white text-center flex flex-col">
        <header className="mb-12 shrink-0"><img src={userImage} className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 shadow-sm" style={{ borderColor: themeColor }} alt="Profile" /><h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em]">{data.personalInfo.fullName}</h1><div className="h-1 w-40 mx-auto rounded-full mb-4" style={{ backgroundColor: themeColor }}></div><p className="text-[14px] font-bold uppercase tracking-[0.4em] mb-4 opacity-60">{data.personalInfo.jobTitle}</p></header>
        <div className="text-right space-y-12 flex-1 h-full" dir={isRtl ? 'rtl' : 'ltr'}>
          <section className="text-center px-24"><p className="text-md leading-loose opacity-70 font-medium">{data.personalInfo.summary}</p></section>
          <section className="grid grid-cols-2 gap-20 mt-10 h-full"><div className="border-r border-slate-100 px-6"><SectionTitle minimal>{isRtl ? 'الخبرة' : 'Work Experience'}</SectionTitle>{renderExperience()}</div><div className="space-y-16 px-6"><div><SectionTitle minimal>{isRtl ? 'المهارات' : 'Core Skills'}</SectionTitle>{renderSkills()}</div></div></section>
        </div>
      </div>
    ),
    minimalist: () => (
      <div className="p-20 min-h-[1123px] h-full bg-white text-slate-900 flex flex-col">
        <header className="mb-20 flex justify-between items-start shrink-0"><div><h1 className="text-4xl font-light mb-2 tracking-tight">{data.personalInfo.fullName}</h1><p className="text-lg opacity-40 font-medium mb-10">{data.personalInfo.jobTitle}</p></div><img src={userImage} className="w-32 h-32 rounded-sm object-cover grayscale opacity-80" alt="Profile" /></header>
        <div className="space-y-20 flex-1 h-full"><section><SectionTitle minimal>{isRtl ? 'الخبرة' : 'Experience'}</SectionTitle>{renderExperience()}</section></div>
      </div>
    ),
    technical: () => (
      <div className="p-12 min-h-[1123px] h-full bg-white text-slate-800 flex flex-col">
        <header className="grid grid-cols-12 border-4 border-slate-900 mb-12 overflow-hidden shrink-0"><div className="col-span-8 p-10 bg-slate-900 text-white flex items-center gap-8"><img src={userImage} className="w-24 h-24 rounded border-2 border-white/20 object-cover" alt="Profile" /><div><h1 className="text-4xl font-black tracking-tight">{data.personalInfo.fullName}</h1><p className="text-lg font-bold opacity-60 uppercase tracking-widest mt-1">{data.personalInfo.jobTitle}</p></div></div></header>
        <div className="space-y-12 flex-1 h-full"><div className="grid grid-cols-12 gap-16 h-full"><div className="col-span-8 space-y-12 h-full"><section><SectionTitle minimal>{isRtl ? 'المشاريع والخبرات' : 'Technical Projects & Exp'}</SectionTitle>{renderExperience()}</section></div><div className="col-span-4 space-y-12 h-full"><section><SectionTitle minimal>{isRtl ? 'اللغات والمهارات' : 'Tech Stack'}</SectionTitle>{renderSkills()}</section></div></div></div>
      </div>
    ),
    bold: () => (
      <div className="flex min-h-[1123px] h-full">
        <div className="w-1/3 bg-slate-900 p-12 space-y-12 text-white min-h-full h-full shrink-0" style={{ backgroundColor: themeColor }}><img src={userImage} className="w-full rounded-full border-8 border-white/20 shadow-2xl aspect-square object-cover" alt="Profile" /><section className="flex-1"><SectionTitle light minimal>{isRtl ? 'المهارات' : 'Skills'}</SectionTitle>{renderSkills(true)}</section></div>
        <div className="flex-1 p-20 space-y-16 bg-white flex flex-col min-h-full h-full overflow-hidden"><header className="shrink-0"><h1 className="text-8xl font-black tracking-tighter text-slate-900 leading-none">{data.personalInfo.fullName.split(' ')[0]}<br/>{data.personalInfo.fullName.split(' ').slice(1).join(' ')}</h1><p className="text-2xl font-black mt-6 uppercase tracking-[0.3em] opacity-30">{data.personalInfo.jobTitle}</p></header><section className="flex-1 h-full"><SectionTitle minimal>{isRtl ? 'التجارب' : 'Experiences'}</SectionTitle>{renderExperience()}</section></div>
      </div>
    ),
    compact: () => (
      <div className="p-10 min-h-[1123px] h-full bg-white text-slate-900 grid grid-cols-2 gap-10 flex flex-col">
         <div className="space-y-10 flex flex-col h-full"><header className="pb-10 border-b-2 border-slate-900 shrink-0"><div className="flex items-center gap-4 mb-6"><img src={userImage} className="w-20 h-20 rounded-2xl object-cover shadow-lg border-2 border-white" alt="Profile" /><div><h1 className="text-3xl font-black leading-none">{data.personalInfo.fullName}</h1><p className="text-sm font-bold uppercase tracking-widest opacity-50 mt-1">{data.personalInfo.jobTitle}</p></div></div></header><section className="shrink-0"><SectionTitle minimal>{isRtl ? 'نبذة' : 'Summary'}</SectionTitle><p className="text-[12px] leading-loose opacity-70 font-medium">{data.personalInfo.summary}</p></section></div>
         <div className="space-y-10 flex flex-col h-full"><section className="flex-1 h-full"><SectionTitle minimal>{isRtl ? 'الخبرة' : 'Experience'}</SectionTitle><div className="space-y-6">{data.experience.map(exp => (<div key={exp.id} className="border-b border-slate-50 pb-6 last:border-0"><p className="font-black text-[13px]">{exp.position}</p><p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-1 mb-2">{exp.company}</p></div>))}</div></section></div>
      </div>
    )
  };

  return (
    <div 
      className={`print-container bg-white shadow-2xl mx-auto overflow-hidden min-h-[1123px] w-[794px] transform origin-top transition-all duration-300`}
      dir={isRtl ? 'rtl' : 'ltr'}
      style={containerStyle}
    >
      {templatesMap[template] ? templatesMap[template]() : templatesMap.modern()}
    </div>
  );
};

export default CVPreview;
