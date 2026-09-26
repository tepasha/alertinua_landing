import React from 'react';
import { Github, ArrowRight, Play, Cpu, ShieldAlert, Sparkles, BatteryCharging } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
  onScrollToSimulator: () => void;
  onScrollToOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onScrollToSimulator, onScrollToOrder }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background glow and subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-rose-600/10 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-amber-500/10 blur-[110px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Unboxed metadata line with typographic separators (anti-pill discipline) */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm text-slate-400 mb-6 font-mono-code">
          <span>ESP-IDF v5</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span>FreeRTOS (7 задач)</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span>alerts.in.ua IoT API</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span className="text-emerald-400">100% Open Source MIT</span>
        </div>

        {/* Main Editorial Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display text-balance leading-[1.12]">
            {lang === 'ua' ? (
              <>
                Автономний настільний індикатор тривог <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300">для твого простору</span>
              </>
            ) : (
              <>
                Autonomous desktop air raid monitor <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300">for your workspace</span>
              </>
            )}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance">
            {lang === 'ua' ? (
              'Компактний гаджет на базі мікроконтролера ESP32 та кольорового IPS-дисплея LilyGO T-Display. Завжди перед очима, без залежності від смартфона, з розумною нічною яскравістю та миттєвим апаратним зумером.'
            ) : (
              'A compact hardware gadget powered by ESP32 and LilyGO T-Display color IPS. Always in view, independent of your phone, featuring ambient light auto-dimming and instant acoustic alerts.'
            )}
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onScrollToSimulator}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-950/60 transition-all flex items-center justify-center gap-2 group"
            >
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              <span>{lang === 'ua' ? 'Випробувати симулятор онлайн' : 'Test Virtual Simulator'}</span>
            </button>

            <a
              href="https://github.com/tepasha/alertinua"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>{lang === 'ua' ? 'Зібрати самостійно (GitHub)' : 'Build from GitHub (DIY)'}</span>
            </a>

            <button
              onClick={onScrollToOrder}
              className="w-full sm:w-auto px-5 py-3 text-sm font-medium text-amber-300 hover:text-amber-200 bg-amber-950/30 hover:bg-amber-950/50 border border-amber-800/40 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ua' ? 'Готовий девайс / KIT' : 'Get Pre-built Kit'}</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Asset Showcase */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80 bg-slate-900 group">
            <img
              src="/src/assets/images/hero_device_desk_1790420007845.jpg"
              alt="AlertInUA desktop hardware device on a workstation desk"
              className="w-full h-auto object-cover aspect-[16/9] transition-transform duration-700 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
            />

            {/* Subtle Gradient scrim for legible overlay tags */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

            {/* Hardware highlight callouts along the bottom of the photo */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Cpu className="w-4 h-4 text-rose-400" />
                <span className="font-medium">LilyGO T-Display (ST7789 IPS 135×240)</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span className="font-medium">
                  {lang === 'ua' ? 'ПІ-регулятор нічної яскравості (LDR)' : 'Ambient Light Auto-Dimming'}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <BatteryCharging className="w-4 h-4 text-emerald-400" />
                <span className="font-medium">
                  {lang === 'ua' ? 'Li-Po бекап 4-6 годин' : 'Li-Po Battery Backup'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
