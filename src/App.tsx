import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DeviceSimulator } from './components/DeviceSimulator';
import { WhyHardware } from './components/WhyHardware';
import { HardwareExplorer } from './components/HardwareExplorer';
import { ArchitectureSection } from './components/ArchitectureSection';
import { QuickStart } from './components/QuickStart';
import { Footer } from './components/Footer';
import { Language } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('ua');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ua' ? 'en' : 'ua'));
  };

  const scrollToSimulator = () => {
    const el = document.getElementById('simulator');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-rose-200">
      <Header
        lang={lang}
        onToggleLang={toggleLanguage}
      />

      <main className="flex-1">
        <Hero
          lang={lang}
          onScrollToSimulator={scrollToSimulator}
        />

        <DeviceSimulator lang={lang} />

        <WhyHardware lang={lang} />

        <HardwareExplorer lang={lang} />

        <ArchitectureSection lang={lang} />

        <QuickStart lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
