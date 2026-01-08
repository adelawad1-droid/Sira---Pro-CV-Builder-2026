
import React, { useState } from 'react';
import { CVData, Language } from '../types';
import { translations } from '../translations';

const Icons = {
  User: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
  Briefcase: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745V20a2 2 0 002 2h14a2 2 0 002-2v-6.745zM16 8V5a2 2 0 00-2-2H10a2 2 0 00-2 2v3m8 0H8m8 0a2 2 0 012 2v2M8 8a2 2 0 00-2 2v2m4.688-2.248A5.986 5.986 0 0112 11c1.26 0 2.428-.388 3.394-1.048M12 11V5"/></svg>,
  Graduation: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/></svg>,
  Wrench: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>,
  Plus: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>,
  Image: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
};

const Input = ({ label, value, onChange, placeholder = '', type = 'text' }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-slate-900 focus:bg-white outline-none transition-all text-[12px] font-bold text-slate-700"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

interface Props {
  data: CVData;
  setData: React.Dispatch<React.SetStateAction<CVData>>;
  lang: Language;
}

type Tab = 'personal' | 'experience' | 'education' | 'skills';

const CVForm: React.FC<Props> = ({ data, setData, lang }) => {
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const t = translations[lang];

  const updatePersonalInfo = (field: keyof CVData['personalInfo'], value: string) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex bg-slate-100/60 p-1.5 rounded-2xl gap-2">
        {(['personal', 'experience', 'education', 'skills'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-[10px] font-black transition-all ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {tab === 'personal' && <Icons.User />}
            {tab === 'experience' && <Icons.Briefcase />}
            {tab === 'education' && <Icons.Graduation />}
            {tab === 'skills' && <Icons.Wrench />}
            <span className="hidden lg:inline">{tab === 'personal' ? t.personalInfo : (t as any)[tab]}</span>
          </button>
        ))}
      </div>

      <div className="space-y-10">
        {activeTab === 'personal' && (
          <div className="space-y-10">
             <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 flex flex-col sm:flex-row items-center gap-10">
                {data.personalInfo.image ? (
                  <div className="relative group">
                    <img src={data.personalInfo.image} className="w-36 h-36 rounded-[2.5rem] object-cover shadow-2xl border-4 border-white" />
                    <button onClick={() => updatePersonalInfo('image', '')} className="absolute -top-3 -right-3 bg-slate-900 text-white w-9 h-9 rounded-full text-[14px] flex items-center justify-center shadow-lg active:scale-90 transition-transform">✕</button>
                  </div>
                ) : (
                  <label className="w-36 h-36 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-white hover:border-slate-900 transition-all text-slate-400 group">
                    <Icons.Image />
                    <span className="text-[10px] font-black mt-3">{lang === 'ar' ? 'رفع صورة' : 'Upload Photo'}</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                )}
                <div className="flex-1 text-center sm:text-right">
                   <h4 className="text-[16px] font-black text-slate-800">{t.uploadImage}</h4>
                   <p className="text-[11px] text-slate-400 font-bold mt-3 leading-relaxed">
                     {lang === 'ar' 
                      ? 'يرجى اختيار صورة رسمية واضحة بخلفية بسيطة لضمان أفضل انطباع مهني.' 
                      : 'Please choose a clear formal photo with a simple background for a professional impression.'}
                   </p>
                </div>
             </div>

             <div className="space-y-8">
                <Input label={t.fullName} value={data.personalInfo.fullName} onChange={(v: string) => updatePersonalInfo('fullName', v)} />
                <Input label={t.jobTitle} value={data.personalInfo.jobTitle} onChange={(v: string) => updatePersonalInfo('jobTitle', v)} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <Input label={t.email} value={data.personalInfo.email} onChange={(v: string) => updatePersonalInfo('email', v)} type="email" />
                    <Input label={t.phone} value={data.personalInfo.phone} onChange={(v: string) => updatePersonalInfo('phone', v)} />
                </div>
                <Input label={t.location} value={data.personalInfo.location} onChange={(v: string) => updatePersonalInfo('location', v)} />
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">{t.summary}</label>
                    <textarea rows={8} className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] focus:bg-white focus:border-slate-900 outline-none text-[12px] font-bold leading-relaxed transition-all text-slate-700 shadow-inner" value={data.personalInfo.summary} onChange={(e) => updatePersonalInfo('summary', e.target.value)} />
                </div>
             </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={exp.id} className="p-10 bg-white border border-slate-100 rounded-[3rem] relative group shadow-sm hover:border-slate-300 transition-all">
                <button onClick={() => setData(prev => ({...prev, experience: prev.experience.filter(e => e.id !== exp.id)}))} className="absolute top-8 right-8 text-slate-200 hover:text-red-600 transition-colors"><Icons.Trash /></button>
                <div className="space-y-8 pt-4">
                  <Input label={t.company} value={exp.company} onChange={(v: string) => { let l = [...data.experience]; l[index].company = v; setData({...data, experience: l}); }} />
                  <Input label={t.position} value={exp.position} onChange={(v: string) => { let l = [...data.experience]; l[index].position = v; setData({...data, experience: l}); }} />
                  <div className="grid grid-cols-2 gap-8">
                    <Input label={t.startDate} value={exp.startDate} onChange={(v: string) => { let l = [...data.experience]; l[index].startDate = v; setData({...data, experience: l}); }} />
                    <Input label={t.endDate} value={exp.endDate} onChange={(v: string) => { let l = [...data.experience]; l[index].endDate = v; setData({...data, experience: l}); }} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">{t.description}</label>
                    <textarea rows={4} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-slate-900 focus:bg-white outline-none transition-all text-[12px] font-bold text-slate-700" value={exp.description} onChange={(e) => { let l = [...data.experience]; l[index].description = e.target.value; setData({...data, experience: l}); }} />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => setData(prev => ({...prev, experience: [...prev.experience, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '' }]}))} className="w-full py-8 border-2 border-dashed border-slate-200 text-slate-400 rounded-[3rem] text-[12px] font-black hover:bg-slate-50 hover:text-slate-900 hover:border-slate-900 transition-all flex items-center justify-center gap-4">
              <Icons.Plus /> {t.add}
            </button>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-8">
            {data.education.map((edu, index) => (
              <div key={edu.id} className="p-10 bg-white border border-slate-100 rounded-[3rem] relative group shadow-sm hover:border-slate-300 transition-all">
                <button onClick={() => setData(prev => ({...prev, education: prev.education.filter(e => e.id !== edu.id)}))} className="absolute top-8 right-8 text-slate-200 hover:text-red-600 transition-colors"><Icons.Trash /></button>
                <div className="space-y-8 pt-4">
                  <Input label={t.institution} value={edu.institution} onChange={(v: string) => { let l = [...data.education]; l[index].institution = v; setData({...data, education: l}); }} />
                  <Input label={t.degree} value={edu.degree} onChange={(v: string) => { let l = [...data.education]; l[index].degree = v; setData({...data, education: l}); }} />
                  <div className="grid grid-cols-2 gap-8">
                    <Input label={t.startDate} value={edu.startDate} onChange={(v: string) => { let l = [...data.education]; l[index].startDate = v; setData({...data, education: l}); }} />
                    <Input label={t.endDate} value={edu.endDate} onChange={(v: string) => { let l = [...data.education]; l[index].endDate = v; setData({...data, education: l}); }} />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => setData(prev => ({...prev, education: [...prev.education, { id: Date.now().toString(), institution: '', degree: '', startDate: '', endDate: '', description: '' }]}))} className="w-full py-8 border-2 border-dashed border-slate-200 text-slate-400 rounded-[3rem] text-[12px] font-black hover:bg-slate-50 hover:text-slate-900 hover:border-slate-900 transition-all flex items-center justify-center gap-4">
              <Icons.Plus /> {t.add}
            </button>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 gap-5">
            {data.skills.map((skill, index) => (
              <div key={skill.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-slate-300 transition-all flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900"></div>
                  <input 
                    className="flex-1 bg-transparent border-none outline-none text-[14px] font-black text-slate-700" 
                    value={skill.name} 
                    placeholder={lang === 'ar' ? 'اسم المهارة' : 'Skill Name'} 
                    onChange={(e) => { 
                      let l = [...data.skills]; 
                      l[index].name = e.target.value; 
                      setData({...data, skills: l}); 
                    }} 
                  />
                  <button onClick={() => setData(prev => ({...prev, skills: prev.skills.filter(s => s.id !== skill.id)}))} className="text-slate-200 hover:text-red-600 px-3 transition-colors"><Icons.Trash /></button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.skillLevel}</span>
                    <span className="text-[12px] font-black text-slate-900">{skill.level * 20}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    step="1"
                    className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-slate-900"
                    value={skill.level}
                    onChange={(e) => {
                      let l = [...data.skills];
                      l[index].level = parseInt(e.target.value);
                      setData({...data, skills: l});
                    }}
                  />
                  <div className="flex justify-between px-1">
                    {[1, 2, 3, 4, 5].map(lvl => (
                      <div key={lvl} className={`w-1.5 h-1.5 rounded-full transition-colors ${skill.level >= lvl ? 'bg-slate-900' : 'bg-slate-200'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => setData(prev => ({...prev, skills: [...prev.skills, { id: Date.now().toString(), name: '', level: 3 }]}))} className="w-full py-8 bg-slate-50 text-slate-400 border border-slate-200 rounded-[3rem] text-[11px] font-black hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center justify-center gap-3"><Icons.Plus /> {t.add}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVForm;
