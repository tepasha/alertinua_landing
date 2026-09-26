import React, { useState } from 'react';
import { Terminal, Wifi, KeyRound, Check, Copy, ExternalLink, Download } from 'lucide-react';
import { Language } from '../types';

interface QuickStartProps {
  lang: Language;
}

export const QuickStart: React.FC<QuickStartProps> = ({ lang }) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const steps = [
    {
      num: '01',
      titleUa: 'Клонуй репозиторій та проший через PlatformIO',
      titleEn: 'Clone Repo & Flash via PlatformIO',
      descUa: 'Підключи LilyGO T-Display до комп\'ютера звичайним кабелем USB Type-C та запусти одну команду.',
      descEn: 'Connect your LilyGO T-Display via USB Type-C and execute the standard build & flash command.',
      code: 'git clone https://github.com/tepasha/alertinua.git\ncd alertinua\npio run -t upload -t monitor'
    },
    {
      num: '02',
      titleUa: 'Підключись до Wi-Fi точки пристрою (SoftAP)',
      titleEn: 'Connect to Device Setup Wi-Fi (SoftAP)',
      descUa: 'Якщо мережа ще не налаштована (або після затискання кнопки BOOT на 3с), прилад сам підніме точку доступу.',
      descEn: 'On first boot or long-pressing BOOT for 3s, the device broadcasts a local configuration hotspot.',
      code: 'SSID: AlertInUA-Setup\nIP:   192.168.4.1'
    },
    {
      num: '03',
      titleUa: 'Введи API-токен та обери свою область',
      titleEn: 'Enter alerts.in.ua API Token & Home Region',
      descUa: 'У зручному веб-інтерфейсі збережи ім\'я домашнього Wi-Fi, токен сервісу alerts.in.ua та свою область. Прилад збереже налаштування в NVS flash і почне роботу.',
      descEn: 'Pick your home Wi-Fi SSID, paste your free alerts.in.ua API key, and choose your oblast.',
      code: 'https://alerts.in.ua (Отримати безкоштовний токен)'
    }
  ];

  return (
    <section id="quickstart" className="py-20 bg-[#090C14] border-t border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono font-semibold text-rose-400 tracking-wider uppercase mb-2">
            {lang === 'ua' ? 'Швидкий старт' : 'Fast 5-Minute Setup'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white text-balance">
            {lang === 'ua' ? 'Запуск пристрою за три прості кроки' : 'Get It Running in Three Simple Steps'}
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed text-balance">
            {lang === 'ua' ? (
              'Прошивка підтримує як швидке складання через PlatformIO, так і рідний ESP-IDF v5 з повним набором юніт-тестів.'
            ) : (
              'Native support for both PlatformIO and ESP-IDF v5 with comprehensive unit and host tests.'
            )}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {steps.map((s, idx) => (
            <div
              key={s.num}
              className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl font-black font-display text-rose-500/80 mb-3">
                  {s.num}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {lang === 'ua' ? s.titleUa : s.titleEn}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {lang === 'ua' ? s.descUa : s.descEn}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="relative bg-slate-950 p-3 rounded-xl border border-white/5">
                  <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre">
                    {s.code}
                  </pre>
                  {s.code.includes('pio run') && (
                    <button
                      onClick={() => copyToClipboard(s.code, s.num)}
                      className="absolute top-2 right-2 p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      title="Скопіювати команду"
                    >
                      {copiedCmd === s.num ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Token CTA banner */}
        <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-amber-950/40 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ua' ? 'Потрібен API токен alerts.in.ua?' : 'Need an alerts.in.ua API Token?'}</span>
            </h4>
            <p className="text-xs text-slate-300">
              {lang === 'ua'
                ? 'Сервіс alerts.in.ua надає безкоштовні некомерційні токени для DIY-проєктів і цивільного захисту.'
                : 'Free non-commercial API tokens are provided by alerts.in.ua for personal DIY devices.'}
            </p>
          </div>

          <a
            href="https://alerts.in.ua"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 shrink-0"
          >
            <span>alerts.in.ua</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
