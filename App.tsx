
import React, { useState, useEffect, useRef } from 'react';
import { CVData, Language, TemplateType } from './types';
import { SAMPLE_DATA_AR, SAMPLE_DATA_EN, SPECIALTIES_DATA } from './constants';
import { translations } from './translations';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import TemplateSelector from './components/TemplateSelector';
import SpecialtySelector from './components/SpecialtySelector';
import ColorPicker from './components/ColorPicker';
import FontSelector from './components/FontSelector';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';

type ActivePanel = 'content' | 'design' | 'quick';

const Icons = {
  Content: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>,
  Design: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.172-1.172a4 4 0 115.656 5.656l-1.172 1.172"/></svg>,
  Quick: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  Download: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>,
  Image: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  Coffee: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [themeColor, setThemeColor] = useState<string>('#0f172a');
  const [fontFamily, setFontFamily] = useState<string>('Cairo');
  const [data, setData] = useState<CVData>(SAMPLE_DATA_AR);
  const [activePanel, setActivePanel] = useState<ActivePanel>('quick');
  const [isCapturing, setIsCapturing] = useState(false);
  const [cvCounter, setCvCounter] = useState<number>(128450);
  const previewRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  useEffect(() => {
    const savedCounter = localStorage.getItem('sira_cv_counter');
    const baseValue = savedCounter ? parseInt(savedCounter) : 128450;
    setCvCounter(baseValue);

    const interval = setInterval(() => {
      setCvCounter(prev => {
        const increment = Math.floor(Math.random() * 3) + 1;
        const newValue = prev + increment;
        localStorage.setItem('sira_cv_counter', newValue.toString());
        return newValue;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    if (lang === 'ar') setFontFamily('Cairo');
    else setFontFamily('Inter');
  }, [lang]);

  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    const currentIsArSample = Object.values(SPECIALTIES_DATA).some(s => JSON.stringify(s.ar) === JSON.stringify(data));
    const currentIsEnSample = Object.values(SPECIALTIES_DATA).some(s => JSON.stringify(s.en) === JSON.stringify(data));

    if (nextLang === 'en' && currentIsArSample) {
      const entry = Object.entries(SPECIALTIES_DATA).find(([_, val]) => JSON.stringify(val.ar) === JSON.stringify(data));
      if (entry) setData(entry[1].en);
    } else if (nextLang === 'ar' && currentIsEnSample) {
      const entry = Object.entries(SPECIALTIES_DATA).find(([_, val]) => JSON.stringify(val.en) === JSON.stringify(data));
      if (entry) setData(entry[1].ar);
    }
    setLang(nextLang);
  };

  const downloadPDF = async () => {
    if (!previewRef.current || isCapturing) return;
    setIsCapturing(true);
    try {
      const node = previewRef.current.querySelector('.print-container') as HTMLElement;
      if (!node) throw new Error("Preview container not found");
      const originalTransform = node.style.transform;
      const originalBoxShadow = node.style.boxShadow;
      node.style.transform = 'none';
      node.style.boxShadow = 'none';
      const dataUrl = await htmlToImage.toPng(node, { quality: 1, pixelRatio: 3, backgroundColor: '#ffffff' });
      node.style.transform = originalTransform;
      node.style.boxShadow = originalBoxShadow;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save(`CV-${data.personalInfo.fullName || 'Sira'}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      window.print();
    } finally {
      setIsCapturing(false);
    }
  };

  const downloadImage = async () => {
    if (!previewRef.current || isCapturing) return;
    setIsCapturing(true);
    try {
      const node = previewRef.current.querySelector('.print-container') as HTMLElement;
      if (!node) return;
      const originalTransform = node.style.transform;
      node.style.transform = 'none';
      const dataUrl = await htmlToImage.toPng(node, { quality: 1, pixelRatio: 2, backgroundColor: '#ffffff' });
      node.style.transform = originalTransform;
      const link = document.createElement('a');
      link.download = `CV-${data.personalInfo.fullName || 'Sira'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error capturing image:', err);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleSpecialtySelect = (specialtyData: CVData) => {
    setData(specialtyData);
    setActivePanel('design');
  };

  // SEO Keywords for the footer tags
  const seoKeywords = lang === 'ar' 
    ? ["سيرة ذاتية مهندس", "سيرة ذاتية طبيب", "CV محاسب", "سيفي مبرمج", "سيرة ذاتية طالب", "نموذج CV بالانجليزي", "سيرة ذاتية ATS", "صانع سيفي مجاني", "تحميل سيرة ذاتية PDF", "سيرة ذاتية 2025", "كتابة سيرة ذاتية احترافية", "نماذج وورد و PDF"]
    : ["Engineer Resume", "Doctor CV", "Accountant Resume", "Developer Portfolio", "Student CV", "English Resume Template", "ATS Compatible CV", "Free CV Maker", "Download PDF Resume", "2025 CV Trends", "Professional CV Writing", "Word and PDF Samples"];

  return (
    <div className={`min-h-screen bg-[#f1f5f9] flex flex-col overflow-x-hidden ${lang === 'ar' ? 'font-cairo' : 'font-inter'}`}>
      
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-[100] no-print shadow-sm" role="banner">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-md" style={{ backgroundColor: themeColor }}>س</div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-black text-slate-900 tracking-tight">{t.title}</h1>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{t.subtitle}</p>
          </div>
        </div>

        <nav className="flex items-center gap-4" aria-label="اللغات والتحميل">
          <button onClick={toggleLanguage} className="text-[11px] font-black text-slate-500 hover:text-slate-900 px-3 py-2 transition-colors">
            {t.language}
          </button>
          <div className="h-6 w-px bg-slate-200"></div>
          <div className="flex gap-2">
            <button onClick={downloadImage} disabled={isCapturing} className={`px-5 py-2.5 rounded-xl text-[11px] font-black bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2 ${isCapturing ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <Icons.Image /> <span className="hidden md:inline">{t.downloadImage}</span>
            </button>
            <button onClick={downloadPDF} disabled={isCapturing} className={`px-6 py-2.5 rounded-xl text-[11px] font-black text-white shadow-xl transition-all flex items-center gap-2 active:scale-95 ${isCapturing ? 'opacity-50 cursor-not-allowed' : ''}`} style={{ backgroundColor: themeColor }}>
              {isCapturing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Icons.Download />}
              <span>{isCapturing ? (lang === 'ar' ? 'جاري التحميل...' : 'Downloading...') : t.downloadPDF}</span>
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start pt-24 pb-20 px-4" role="main">
        <div className="w-full max-w-[1700px] flex flex-col xl:flex-row items-start justify-center gap-4 xl:gap-6 transition-all">
          <section className="flex-1 flex flex-col items-center gap-4 no-print" id="editor-section">
            <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm self-center">
              <div className="w-2 h-2 rounded-full bg-slate-900"></div>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">{lang === 'ar' ? 'محرر البيانات الرسمي' : 'Official Data Editor'}</span>
            </div>
            <article className="w-full max-w-[794px] min-h-[1123px] bg-white rounded-sm shadow-[0_30px_70px_-15px_rgba(0,0,0,0.1)] border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="p-0 bg-white border-b border-slate-100">
                <nav className="bg-slate-50/80 rounded-b-[1.8rem] rounded-t-none p-2.5 flex items-center gap-2 border-b border-x border-slate-100 mx-5 mb-5">
                  <button onClick={() => setActivePanel('quick')} className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] transition-all duration-300 ${activePanel === 'quick' ? 'bg-amber-500 text-white shadow-[0_8px_20px_-5px_rgba(245,158,11,0.4)]' : 'text-slate-400 hover:text-amber-600 hover:bg-white'}`}><Icons.Quick /><span className="text-[11px] font-black uppercase tracking-tight">{lang === 'ar' ? 'تعبئة' : 'Presets'}</span></button>
                  <button onClick={() => setActivePanel('design')} className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] transition-all duration-300 ${activePanel === 'design' ? 'bg-indigo-600 text-white shadow-[0_8px_20px_-5px_rgba(79,70,229,0.4)]' : 'text-slate-400 hover:text-indigo-600 hover:bg-white'}`}><Icons.Design /><span className="text-[11px] font-black uppercase tracking-tight">{lang === 'ar' ? 'التصميم' : 'Style'}</span></button>
                  <button onClick={() => setActivePanel('content')} className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] transition-all duration-300 ${activePanel === 'content' ? 'bg-blue-600 text-white shadow-[0_8px_20px_-5px_rgba(37,99,235,0.4)]' : 'text-slate-400 hover:text-blue-600 hover:bg-white'}`}><Icons.Content /><span className="text-[11px] font-black uppercase tracking-tight">{lang === 'ar' ? 'البيانات' : 'Details'}</span></button>
                </nav>
              </div>
              <div className="flex-1 overflow-y-auto p-12 no-scrollbar scroll-smooth">
                <div className="mb-10 pb-6 border-b border-slate-50 flex items-center justify-between">
                  <div><h2 className="text-2xl font-black text-slate-900 leading-none mb-3">{activePanel === 'quick' && (lang === 'ar' ? 'نماذج جاهزة' : 'Auto Presets')}{activePanel === 'design' && (lang === 'ar' ? 'تنسيق الهوية' : 'Identity Setup')}{activePanel === 'content' && (lang === 'ar' ? 'تحرير المحتوى' : 'Edit Content')}</h2><p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Professional Certification Standard</p></div>
                </div>
                {activePanel === 'content' && <CVForm data={data} setData={setData} lang={lang} />}
                {activePanel === 'design' && <div className="space-y-12 animate-in fade-in duration-500"><TemplateSelector current={template} onChange={setTemplate} lang={lang} /><ColorPicker color={themeColor} onChange={setThemeColor} lang={lang} /><FontSelector currentFont={fontFamily} onChange={setFontFamily} lang={lang} /></div>}
                {activePanel === 'quick' && <SpecialtySelector lang={lang} onSelect={handleSpecialtySelect} themeColor={themeColor} />}
              </div>
            </article>
          </section>

          <section className="flex-1 flex flex-col items-center gap-4" id="preview-section">
             <div className="flex items-center gap-4 bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm self-center no-print">
               <div className="relative"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div><div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></div></div>
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">{lang === 'ar' ? 'معاينة المستند المباشرة' : 'Live Document Preview'}</span>
             </div>
             <div ref={previewRef} className="transition-all duration-700 ease-out shadow-[0_30px_80px_rgba(0,0,0,0.15)] border border-slate-200 rounded-sm overflow-hidden">
                <CVPreview data={data} lang={lang} template={template} themeColor={themeColor} fontFamily={fontFamily} />
             </div>
          </section>
        </div>
      </main>

      {/* Popular Searches / SEO Tags Section */}
      <section className="w-full max-w-7xl mx-auto px-10 mb-8 no-print" aria-label="SEO Tags">
        <div className="flex flex-wrap items-center justify-center gap-3 pt-8 border-t border-slate-200/60">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.popularSearches}</span>
           {seoKeywords.map((keyword, idx) => (
             <span key={idx} className="text-[9px] font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-default">
               {keyword}{idx !== seoKeywords.length - 1 && " •"}
             </span>
           ))}
        </div>
      </section>

      {/* Buy Me A Coffee Section - Compact Version */}
      <section className="w-full max-w-5xl mx-auto px-10 mb-8 no-print" aria-label="Support Us">
        <div className="bg-white/60 backdrop-blur-sm border border-amber-100 rounded-full py-3 px-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm group hover:shadow-md transition-all">
           <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center shadow-md">
                <Icons.Coffee />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <h4 className="text-[12px] font-black text-slate-800">
                  {lang === 'ar' ? 'ادعمنا لنبقى مجاناً' : 'Support us to stay free'}
                </h4>
                <p className="text-slate-400 text-[10px] font-bold">
                  {lang === 'ar' ? 'مساهمتك تساعدنا على تغطية تكاليف التشغيل' : 'Your contribution helps us cover costs'}
                </p>
              </div>
           </div>
           
           <a 
            href="https://buymeacoffee.com/guidai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2 bg-[#FFDD00] hover:bg-[#ffea00] text-slate-900 rounded-full text-[10px] font-black shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
           >
             <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="BMC logo" className="w-3" />
             <span>{lang === 'ar' ? 'اشترِ لي قهوة' : 'Buy me a coffee'}</span>
           </a>
        </div>
      </section>

      {/* SEO-Rich Informative Section */}
      <section className="w-full max-w-7xl mx-auto px-10 mb-20 no-print" aria-label="About Sira CV Builder">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16 border-t border-slate-200">
           <div className="space-y-4">
              <h4 className="text-xl font-black text-slate-800">{lang === 'ar' ? 'دعم أنظمة الـ ATS' : 'ATS-Friendly Designs'}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {lang === 'ar' 
                  ? 'تم تصميم جميع قوالبنا لتكون صديقة لأنظمة تتبع المتقدمين (ATS)، مما يضمن قراءة بياناتك بشكل صحيح من قبل خوارزميات التوظيف في الشركات الكبرى.' 
                  : 'Our templates are designed to be Applicant Tracking System (ATS) friendly, ensuring your data is parsed correctly by modern hiring algorithms.'}
              </p>
           </div>
           <div className="space-y-4">
              <h4 className="text-xl font-black text-slate-800">{lang === 'ar' ? 'سيرة ذاتية احترافية مجانية' : 'Professional Free CV'}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {lang === 'ar' 
                  ? 'نقدم لك تجربة إنشاء سيرة ذاتية (CV) مجانية تماماً وبجودة تضاهي المواقع العالمية، مع إمكانية التحميل بصيغة PDF جاهزة للطباعة الفورية.' 
                  : 'We offer a completely free resume building experience with global standards, including high-quality PDF downloads ready for immediate printing.'}
              </p>
           </div>
           <div className="space-y-4">
              <h4 className="text-xl font-black text-slate-800">{lang === 'ar' ? 'قوالب سيرة ذاتية 2025' : '2025 Resume Templates'}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {lang === 'ar' 
                  ? 'اختر من بين أحدث صيحات تصميم السيرة الذاتية لعام 2025، ما بين التصاميم العصرية، التنفيذية، والإبداعية التي تناسب كافة التخصصات.' 
                  : 'Choose from the latest 2025 resume design trends, ranging from modern, executive, to creative styles suitable for all career paths.'}
              </p>
           </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-10 mb-20 no-print" aria-label="Success Stats">
         <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-slate-200/50">
            <div className="flex-1 space-y-4 text-center md:text-start">
               <div className="inline-flex items-center gap-3 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full">
                  <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span></span>
                  <span className="text-[10px] font-black uppercase tracking-widest">{t.liveNow}</span>
               </div>
               <h3 className="text-3xl font-black text-slate-900 leading-tight">{t.counterTitle}</h3>
               <p className="text-slate-400 text-sm font-medium max-w-md">{lang === 'ar' ? 'انضم لآلاف المحترفين الذين حصلوا على وظائف أحلامهم باستخدام قوالبنا المعتمدة.' : 'Join thousands of professionals who secured their dream jobs using our certified templates.'}</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
               <div className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter tabular-nums drop-shadow-sm">{cvCounter.toLocaleString()}</div>
               <div className="w-20 h-1.5 bg-slate-900 rounded-full mt-4" style={{ backgroundColor: themeColor }}></div>
            </div>
         </div>
      </section>

      <div className="fixed inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] z-[-1] opacity-40"></div>

      <footer className="py-12 border-t border-slate-200 bg-white no-print mt-auto" role="contentinfo">
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-black text-[10px]">س</div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Sira Digital Resume Engine v5.5 Gold</p>
          </div>
          <div className="text-[11px] font-black text-slate-500 flex items-center gap-4">
            <span>{lang === 'ar' ? 'كافة الحقوق محفوظة 2025' : 'All Rights Reserved 2025'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
            <a href="mailto:adelawad1@gmail.com" className="hover:text-blue-600 transition-colors">{lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
