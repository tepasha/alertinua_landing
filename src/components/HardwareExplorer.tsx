import React, { useState } from 'react';
import { Layers, CircuitBoard, DollarSign, ExternalLink, Info, Check, Wrench } from 'lucide-react';
import { BOM_ITEMS } from '../data/hardwareData';
import { Language } from '../types';

interface HardwareExplorerProps {
  lang: Language;
}

export const HardwareExplorer: React.FC<HardwareExplorerProps> = ({ lang }) => {
  const [selectedItem, setSelectedItem] = useState<string>(BOM_ITEMS[0].id);

  const totalCostUah = BOM_ITEMS.reduce((sum, item) => sum + item.approxPriceUah, 0);
  const totalCostUsd = BOM_ITEMS.reduce((sum, item) => sum + item.approxPriceUsd, 0);

  const activeBom = BOM_ITEMS.find((b) => b.id === selectedItem) || BOM_ITEMS[0];

  return (
    <section id="hardware" className="py-20 bg-[#090C14] border-t border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono font-semibold text-rose-400 tracking-wider uppercase mb-2">
            {lang === 'ua' ? 'Апаратна частина та BOM' : 'Hardware & Bill of Materials'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white text-balance">
            {lang === 'ua' ? 'Просте складання зі стандартних деталей' : 'Simple DIY Assembly with Standard Parts'}
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed text-balance">
            {lang === 'ua' ? (
              'Ніяких рідкісних або дефіцитних компонентів. Готова плата LilyGO T-Display вже має екран і кнопку, а зовнішні деталі коштують усього ~590 грн ($15).'
            ) : (
              'No rare or custom silicon. The stock LilyGO T-Display integrates display and buttons; auxiliary sensors cost less than $15 total.'
            )}
          </p>
        </div>

        {/* Flat-lay Photo & Interactive BOM Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Image & Active Detail Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-slate-900">
              <img
                src="/images/hardware_assembly.jpg"
                alt="Hardware components of AlertInUA"
                className="w-full h-auto object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-slate-950/80 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>{lang === 'ua' ? 'Загальний бюджет DIY:' : 'Estimated DIY Budget:'}</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    ~{totalCostUah} ₴ / ${totalCostUsd.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Selected Component Inspector Card */}
            <div className="bg-slate-900/90 border border-rose-500/30 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-rose-400 font-semibold uppercase">
                  {lang === 'ua' ? 'Деталі компонента' : 'Component Details'}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  ~{activeBom.approxPriceUah} ₴
                </span>
              </div>

              <h4 className="text-base font-bold text-white mb-2">
                {lang === 'ua' ? activeBom.component : activeBom.componentEn}
              </h4>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 font-mono text-slate-400">
                  <CircuitBoard className="w-3.5 h-3.5 text-rose-400" />
                  <span>GPIO: {activeBom.gpio}</span>
                </div>

                <p className="text-slate-300 leading-relaxed">
                  {lang === 'ua' ? activeBom.roleUa : activeBom.roleEn}
                </p>

                <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">{lang === 'ua' ? 'Примітка: ' : 'Note: '}</span>
                  {lang === 'ua' ? activeBom.notesUa : activeBom.notesEn}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive BOM Table (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-rose-400" />
                <h3 className="text-base font-bold text-white">
                  {lang === 'ua' ? 'Специфікація матеріалів (BOM)' : 'Bill of Materials (BOM)'}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {BOM_ITEMS.length} {lang === 'ua' ? 'позицій' : 'items'}
              </span>
            </div>

            <div className="divide-y divide-white/5 overflow-hidden">
              {BOM_ITEMS.map((item) => {
                const isSelected = selectedItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item.id)}
                    className={`w-full text-left py-3.5 px-3 rounded-xl transition-colors flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-rose-950/40 border border-rose-500/40'
                        : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          isSelected ? 'bg-rose-400 shadow-[0_0_8px_#f43f5e]' : 'bg-slate-600'
                        }`}
                      />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-semibold text-white truncate">
                          {lang === 'ua' ? item.component : item.componentEn}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 truncate">
                          {item.gpio}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-medium text-emerald-400">
                        {item.approxPriceUah} ₴
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        ${item.approxPriceUsd}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pinout & Wiring Rules (Directly from docs/PCB.md) */}
        <div className="bg-slate-950/70 border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'ua' ? 'Ключові інженерні правила розведення' : 'Hardware Pinout & Engineering Notes'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ua' ? 'Вимоги до GPIO та схеми з docs/PCB.md' : 'Extracted directly from docs/PCB.md in the repo'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Чому ADC1 для фоторезистора?</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                {lang === 'ua'
                  ? 'Датчик LDR підключено строго до GPIO33 (ADC1_CH5). Канал ADC2 апаратно блокується драйвером Wi-Fi модуля ESP32 при будь-якій мережевій активності.'
                  : 'LDR uses GPIO33 (ADC1_CH5). ADC2 cannot be used concurrently with the ESP32 Wi-Fi stack.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>Захист зумера R1 (220 Ом)</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                {lang === 'ua'
                  ? 'Резистор 220R на GPIO25 захищає вихід мікроконтролера від ємнісних кидків струму п\'єзоелемента при ШІМ модуляції 2.4-3.2 кГц.'
                  : 'A 220 Ohm resistor protects the GPIO from capacitive current spikes during 2.4-3.2kHz PWM drive.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Керування Li-Po дільником</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                {lang === 'ua'
                  ? 'Дільник напруги акумулятора вмикається імпульсом HIGH на GPIO14 та вимірюється на GPIO34 (ADC1), усуваючи постійне саморозряджання батареї.'
                  : 'The battery divider is switched via GPIO14 to prevent parasitic drain when not measuring voltage.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
