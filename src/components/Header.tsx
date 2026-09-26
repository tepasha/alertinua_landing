import React from 'react';
import { Github } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenOrder: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, onToggleLang, onOpenOrder }) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#07090E]/85 border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element brand wordmark */}
        <a 
          href="#" 
          className="text-xl font-bold tracking-tight font-display text-white hover:text-rose-400 transition-colors shrink-0"
        >
          AlertInUA
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-400">
          <a href="#simulator" className="hover:text-white transition-colors">
            {lang === 'ua' ? 'Симулятор' : 'Simulator'}
          </a>
          <a href="#comparison" className="hover:text-white transition-colors">
            {lang === 'ua' ? 'Чому девайс' : 'Why Device'}
          </a>
          <a href="#hardware" className="hover:text-white transition-colors">
            {lang === 'ua' ? 'Залізо (BOM)' : 'Hardware & BOM'}
          </a>
          <a href="#architecture" className="hover:text-white transition-colors">
            {lang === 'ua' ? 'Архітектура RTOS' : 'RTOS Architecture'}
          </a>
          <a href="#quickstart" className="hover:text-white transition-colors">
            {lang === 'ua' ? 'Як прошити' : 'Flashing Guide'}
          </a>
        </nav>

        {/* Zone 3: Primary actions & language switcher */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="px-2.5 py-1 text-xs font-mono font-medium text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded transition-colors"
            title={lang === 'ua' ? 'Switch to English' : 'Перемкнути на українську'}
          >
            {lang === 'ua' ? 'EN' : 'UA'}
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/tepasha/alertinua"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-lg transition-colors whitespace-nowrap"
          >
            <Github className="w-3.5 h-3.5 text-slate-400" />
            <span>GitHub</span>
          </a>

          {/* Primary CTA */}
          <button
            onClick={onOpenOrder}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-sm shadow-rose-950/50 transition-colors whitespace-nowrap active:scale-[0.98]"
          >
            {lang === 'ua' ? 'Замовити Кит' : 'Get a Kit'}
          </button>
        </div>
      </div>
    </header>
  );
};
