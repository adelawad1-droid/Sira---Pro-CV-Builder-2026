
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
  Download: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>,
  Image: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  Coffee: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  Eye: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
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
  const [previewScale, setPreviewScale] = useState(1);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  
  const previewRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  useEffect(() => {
    const updateScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.offsetWidth;
        // A4 width is 794px. We scale it down to fit container width with some padding.
        const targetWidth = containerWidth - 32; 
        const newScale = Math.min(1, targetWidth / 794);
        setPreviewScale(newScale);
      }
    };

    window.addEventListener('resize', updateScale);
    updateScale();
    // Re-run after a small delay to ensure DOM is ready
    setTimeout(updateScale, 100);

    return () => window.removeEventListener('resize', updateScale);
  }, [showMobilePreview]); // Re-scale when switching to mobile preview mode

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
    if (window.innerWidth < 1280) {
       setShowMobilePreview(true);
    }
  };

  const seoKeywords = lang === 'ar' 
    ? ["سيرة ذاتية مهندس", "سيرة ذاتية طبيب", "CV محاسب", "سيفي مبرمج", "سيرة ذاتية طالب", "نموذج CV بالانجليزي", "سيرة ذاتية ATS", "صانع سيفي مجاني", "تحميل سيرة ذاتية PDF", "سيرة ذاتية 2025", "كتابة سيرة ذاتية احترافية", "نماذج وورد و PDF"]
    : ["Engineer Resume", "Doctor CV", "Accountant Resume", "Developer Portfolio", "Student CV", "English Resume Template", "ATS Compatible CV", "Free CV Maker", "Download PDF Resume", "2025 CV Trends", "Professional CV Writing", "Word and PDF Samples"];

  return (
    <div className={`min-h-screen bg-[#f8fafc] flex flex-col overflow-x-hidden ${lang === 'ar' ? 'font-cairo' : 'font-inter'}`}>
      
      {/* Top Header - Desktop Only mainly */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 flex items-center justify-between z-[100] no-print shadow-sm" role="banner">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg" style={{ backgroundColor: themeColor }}>س</div>
          <div className="hidden sm:block">
            <h1 className="text-xs font-black text-slate-900 tracking-tight">{t.title}</h1>
            <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">{t.subtitle}</p>
          </div>
        </div>

        <nav className="flex items-center gap-2 md:gap-4" aria-label="Language and Actions">
          <button onClick={toggleLanguage} className="text-[10px] font-black text-slate-500 hover:text-slate-900 px-2 py-1.5 transition-colors">
            {t.language}
          </button>
          <div className="hidden sm:block h-5 w-px bg-slate-200"></div>
          <div className="flex gap-2">
            <button onClick={downloadImage} disabled={isCapturing} className="hidden md:flex px-4 py-2 rounded-lg text-[10px] font-black bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all items-center gap-2">
              <Icons.Image /> <span>{t.downloadImage}</span>
            </button>
            <button onClick={downloadPDF} disabled={isCapturing} className={`px-4 md:px-6 py-2 rounded-lg text-[10px] font-black text-white shadow-lg transition-all flex items-center gap-2 active:scale-95 ${isCapturing ? 'opacity-50' : ''}`} style={{ backgroundColor: themeColor }}>
              {isCapturing ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Icons.Download />}
              <span>{isCapturing ? (lang === 'ar' ? 'تحميل...' : 'Saving...') : t.downloadPDF}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start pt-20 pb-28 md:pb-20 px-4" role="main">
        <div className="w-full max-w-[1700px] flex flex-col xl:flex-row items-start justify-center gap-6">
          
          {/* Section 1: Form / Editor (Hidden on Mobile Preview Mode) */}
          <section className={`flex-1 w-full flex flex-col items-center gap-4 no-print ${showMobilePreview ? 'hidden xl:flex' : 'flex'}`}>
            <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm self-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">{lang === 'ar' ? 'محرر البيانات الذكي' : 'Smart Data Editor'}</span>
            </div>
            
            <article className="w-full max-w-[850px] bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 flex flex-col overflow-hidden min-h-[700px]">
              <div className="p-0 bg-white">
                <nav className="p-3 flex items-center gap-2 border-b border-slate-100 bg-slate-50/50">
                  <button onClick={() => setActivePanel('quick')} className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all ${activePanel === 'quick' ? 'bg-amber-500 text-white shadow-lg shadow-amber-200' : 'text-slate-400 hover:bg-white'}`}><Icons.Quick /><span className="text-[10px] font-black uppercase">{lang === 'ar' ? 'تعبئة فورية' : 'Quick Fill'}</span></button>
                  <button onClick={() => setActivePanel('design')} className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all ${activePanel === 'design' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:bg-white'}`}><Icons.Design /><span className="text-[10px] font-black uppercase">{lang === 'ar' ? 'التنسيق' : 'Design'}</span></button>
                  <button onClick={() => setActivePanel('content')} className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all ${activePanel === 'content' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:bg-white'}`}><Icons.Content /><span className="text-[10px] font-black uppercase">{lang === 'ar' ? 'المحتوى' : 'Content'}</span></button>
                </nav>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar">
                {activePanel === 'content' && <CVForm data={data} setData={setData} lang={lang} />}
                {activePanel === 'design' && <div className="space-y-12 animate-in fade-in duration-500"><TemplateSelector current={template} onChange={setTemplate} lang={lang} /><ColorPicker color={themeColor} onChange={setThemeColor} lang={lang} /><FontSelector currentFont={fontFamily} onChange={setFontFamily} lang={lang} /></div>}
                {activePanel === 'quick' && <SpecialtySelector lang={lang} onSelect={handleSpecialtySelect} themeColor={themeColor} />}
              </div>
            </article>
          </section>

          {/* Section 2: Preview (Takes full width on Mobile Preview Mode) */}
          <section ref={previewContainerRef} className={`flex-1 w-full flex flex-col items-center gap-4 ${!showMobilePreview ? 'hidden xl:flex' : 'flex'}`}>
             <div className="flex items-center gap-4 bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm self-center no-print">
               <div className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span></div>
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">{lang === 'ar' ? 'معاينة حية ومباشرة' : 'Live Preview'}</span>
             </div>
             
             {/* The Magic Scalable Container */}
             <div 
               ref={previewRef} 
               className="transition-all duration-500 ease-out shadow-2xl rounded-sm overflow-hidden bg-slate-200/20"
               style={{ 
                 width: '794px', 
                 height: '1123px',
                 transform: `scale(${previewScale})`,
                 transformOrigin: 'top center',
                 marginBottom: `-${1123 * (1 - previewScale)}px` // Prevents empty space below scaled content
               }}
             >
                <CVPreview data={data} lang={lang} template={template} themeColor={themeColor} fontFamily={fontFamily} />
             </div>
          </section>
        </div>
      </main>

      {/* Mobile Floating Bottom Navigation - Premium Design */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl h-18 px-3 flex items-center justify-around z-[110] xl:hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] no-print">
          <button 
            onClick={() => { setActivePanel('content'); setShowMobilePreview(false); }} 
            className={`flex flex-col items-center justify-center gap-1 transition-all ${activePanel === 'content' && !showMobilePreview ? 'text-blue-600 scale-110' : 'text-slate-400'}`}
          >
            <Icons.Content />
            <span className="text-[8px] font-black uppercase tracking-tighter">{lang === 'ar' ? 'البيانات' : 'Data'}</span>
          </button>
          <button 
            onClick={() => { setActivePanel('design'); setShowMobilePreview(false); }} 
            className={`flex flex-col items-center justify-center gap-1 transition-all ${activePanel === 'design' && !showMobilePreview ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}
          >
            <Icons.Design />
            <span className="text-[8px] font-black uppercase tracking-tighter">{lang === 'ar' ? 'التصميم' : 'Design'}</span>
          </button>
          
          {/* Highlighted Download Button for Mobile */}
          <div className="relative -top-3">
             <button 
              onClick={downloadPDF} 
              disabled={isCapturing}
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl text-white transition-all active:scale-90"
              style={{ backgroundColor: themeColor }}
             >
               {isCapturing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Icons.Download />}
             </button>
          </div>

          <button 
            onClick={() => { setActivePanel('quick'); setShowMobilePreview(false); }} 
            className={`flex flex-col items-center justify-center gap-1 transition-all ${activePanel === 'quick' && !showMobilePreview ? 'text-amber-600 scale-110' : 'text-slate-400'}`}
          >
            <Icons.Quick />
            <span className="text-[8px] font-black uppercase tracking-tighter">{lang === 'ar' ? 'تعبئة' : 'Presets'}</span>
          </button>
          
          <button 
            onClick={() => setShowMobilePreview(!showMobilePreview)} 
            className={`flex flex-col items-center justify-center gap-1 transition-all ${showMobilePreview ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
          >
            <Icons.Eye />
            <span className="text-[8px] font-black uppercase tracking-tighter">{lang === 'ar' ? 'المعاينة' : 'Preview'}</span>
          </button>
      </nav>

      {/* SEO Section - Popular Searches */}
      <section className="w-full max-w-7xl mx-auto px-6 mb-8 no-print" aria-label="SEO Tags">
        <div className="flex flex-wrap items-center justify-center gap-2 pt-8 border-t border-slate-200/60">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">{t.popularSearches}</span>
           {seoKeywords.map((keyword, idx) => (
             <span key={idx} className="text-[9px] font-bold text-slate-400 hover:text-slate-600 transition-colors">
               {keyword}{idx !== seoKeywords.length - 1 && " • "}
             </span>
           ))}
        </div>
      </section>

      {/* Support Section */}
      <section className="w-full max-w-4xl mx-auto px-6 mb-12 no-print" aria-label="Support Us">
        <div className="bg-amber-50/50 backdrop-blur-sm border border-amber-100 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center shadow-md"><Icons.Coffee /></div>
              <div className="text-center md:text-right">
                <h4 className="text-[12px] font-black text-slate-800">{lang === 'ar' ? 'هل أعجبتك الأداة؟' : 'Did you like the tool?'}</h4>
                <p className="text-slate-400 text-[10px] font-bold">{lang === 'ar' ? 'ادعمنا لنستمر في تقديم الخدمات مجاناً للجميع.' : 'Support us to keep providing free services.'}</p>
              </div>
           </div>
           <a href="https://buymeacoffee.com/guidai" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-[#FFDD00] text-slate-900 rounded-xl text-[10px] font-black shadow-sm flex items-center gap-2 transition-transform hover:scale-105">
             <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="BMC logo" className="w-3" />
             <span>{lang === 'ar' ? 'اشترِ لي قهوة' : 'Buy me a coffee'}</span>
           </a>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-200 bg-white no-print mt-auto mb-20 md:mb-0" role="contentinfo">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-[10px]">س</div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.4em]">Sira CV Designer Engine v6.0 Gold</p>
          </div>
          <div className="text-[10px] font-black text-slate-500 flex flex-wrap justify-center gap-4">
            <span>{lang === 'ar' ? 'جميع الحقوق محفوظة 2025' : 'All Rights Reserved 2025'}</span>
            <a href="mailto:adelawad1@gmail.com" className="hover:text-blue-600 transition-colors uppercase tracking-widest">{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
