import React from 'react';
import { Github, Heart, Shield } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="border-t border-white/[0.07] bg-[#05070B] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Mission */}
          <div className="space-y-1 text-center md:text-left">
            <div className="text-base font-bold font-display text-white">
              AlertInUA
            </div>
            <p className="text-slate-400 text-xs max-w-sm">
              {lang === 'ua'
                ? 'Автономний настільний монітор повітряних тривог України на базі LilyGO T-Display ESP32.'
                : 'Autonomous Ukraine air raid monitor hardware device based on LilyGO T-Display ESP32.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6 font-medium text-slate-300">
            <a href="#simulator" className="hover:text-white transition-colors">
              {lang === 'ua' ? 'Симулятор' : 'Simulator'}
            </a>
            <a href="#hardware" className="hover:text-white transition-colors">
              {lang === 'ua' ? 'BOM Специфікація' : 'Hardware BOM'}
            </a>
            <a href="#architecture" className="hover:text-white transition-colors">
              {lang === 'ua' ? 'Архітектура' : 'Architecture'}
            </a>
            <a
              href="https://github.com/tepasha/alertinua"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} tepasha/alertinua · MIT Open Source License
          </div>

          <div className="flex items-center gap-2">
            <span>Powered by alerts.in.ua IoT API</span>
            <span aria-hidden="true">·</span>
            <span>ESP-IDF / FreeRTOS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
