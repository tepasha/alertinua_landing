import React, { useState } from 'react';
import { Cpu, Terminal, Copy, Check, GitBranch, ShieldAlert, Zap, Layers } from 'lucide-react';
import { RTOS_TASKS } from '../data/hardwareData';
import { Language } from '../types';

interface ArchitectureProps {
  lang: Language;
}

const SAMPLE_PARSER_C = `// alerts_parser.c: Zero-copy IoT stream parsing (27 chars A/P/N)
esp_err_t alerts_parse_iot_payload(const char *json_str, uint8_t *alert_mask_out) {
    if (!json_str || !alert_mask_out) return ESP_ERR_INVALID_ARG;
    
    cJSON *root = cJSON_Parse(json_str);
    if (!root || !cJSON_IsString(root)) {
        cJSON_Delete(root);
        return ESP_ERR_INVALID_RESPONSE;
    }
    
    const char *statuses = root->valuestring;
    if (strlen(statuses) != ALERTS_API_LOCATIONS) { // 27 regions
        cJSON_Delete(root);
        return ESP_ERR_INVALID_SIZE;
    }
    
    // Map A -> Full Alert, P -> Partial, N -> Clear
    for (int i = 0; i < ALERTS_API_LOCATIONS; i++) {
        char s = statuses[i];
        if (s == 'A') alert_mask_out[i] = ALERT_STATE_FULL;
        else if (s == 'P') alert_mask_out[i] = ALERT_STATE_PARTIAL;
        else alert_mask_out[i] = ALERT_STATE_CLEAR;
    }
    cJSON_Delete(root);
    return ESP_OK;
}`;

export const ArchitectureSection: React.FC<ArchitectureProps> = ({ lang }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<string>(RTOS_TASKS[2].name); // render_task

  const handleCopy = () => {
    navigator.clipboard.writeText(SAMPLE_PARSER_C);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeTask = RTOS_TASKS.find((t) => t.name === selectedTask) || RTOS_TASKS[0];

  return (
    <section id="architecture" className="py-20 bg-[#07090E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono font-semibold text-rose-400 tracking-wider uppercase mb-2">
            {lang === 'ua' ? 'Архітектура прошивки' : 'Firmware Architecture'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white text-balance">
            {lang === 'ua' ? 'Чому FreeRTOS, а не звичайний Arduino loop' : 'Why FreeRTOS Instead of a Superloop'}
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed text-balance">
            {lang === 'ua' ? (
              'Пристрою необхідно одночасно тримати Wi-Fi, опитувати REST API із тайм-аутом до 10с, оновлювати дисплей, фільтрувати датчик світла та реагувати на кнопку без найменших затримок.'
            ) : (
              'The device must handle Wi-Fi retries, 10s network I/O, smooth ST7789 rendering, and button ISR events concurrently without blocking.'
            )}
          </p>
        </div>

        {/* 3 Pillars of Reliability */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-900/60 border border-white/5 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              {lang === 'ua' ? '7 незалежних RTOS-задач' : '7 Preemptive FreeRTOS Tasks'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'ua'
                ? 'Кожна задача має свій пріоритет та стек. Мережевий лаг ніколи не "підвішує" екран чи дебаунс апаратної кнопки.'
                : 'Prioritized preemptive dispatching guarantees UI and buzzer responsiveness regardless of network latency.'}
            </p>
          </div>

          <div className="bg-slate-900/60 border border-white/5 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              {lang === 'ua' ? 'Нуль фрагментації RAM' : 'Zero Heap Fragmentation'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'ua'
                ? 'Статичний буфер HTTP 8КБ виділяється один раз при старті системи. Жодних витоків пам\'яті через часті malloc/free.'
                : 'A single 8KB static buffer is allocated once. No memory leaks or fragmentation during 24/7 continuous operation.'}
            </p>
          </div>

          <div className="bg-slate-900/60 border border-white/5 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              {lang === 'ua' ? 'Апаратний Watchdog (TWDT)' : 'Task Watchdog Timer'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'ua'
                ? 'Кожна циклічна задача відзначається у системному Watchdog. У разі підвисання процесора мікроконтролер перезавантажиться за 5с.'
                : 'Cyclic tasks must reset the TWDT periodically. If any task deadlocks, hardware auto-reboots immediately.'}
            </p>
          </div>
        </div>

        {/* Interactive RTOS Task Inspector & C Code View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Task Selector (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <GitBranch className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-white">
                {lang === 'ua' ? 'Розподіл обов\'язків задач (task/)' : 'Task Hierarchy & Dispatching'}
              </h3>
            </div>

            <div className="space-y-2">
              {RTOS_TASKS.map((t) => {
                const isSelected = selectedTask === t.name;
                return (
                  <button
                    key={t.name}
                    onClick={() => setSelectedTask(t.name)}
                    className={`w-full text-left p-3 rounded-xl transition-all border ${
                      isSelected
                        ? 'bg-rose-950/40 border-rose-500/50 text-white'
                        : 'bg-slate-950/40 border-white/5 text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-semibold text-rose-300">{t.name}</span>
                      <span className="text-[11px] text-slate-400">Prio {t.priority}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-1">
                      {t.folder}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Task Details */}
            <div className="mt-4 p-3.5 bg-slate-950/80 rounded-xl border border-white/5 text-xs">
              <div className="font-mono text-slate-400 mb-1">
                {lang === 'ua' ? 'Блокується на: ' : 'Blocks on: '}
                <span className="text-amber-300 font-semibold">{activeTask.blockedOn}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {lang === 'ua' ? activeTask.descriptionUa : activeTask.descriptionEn}
              </p>
            </div>
          </div>

          {/* C Code Preview (7 cols) */}
          <div className="lg:col-span-7 bg-[#05070B] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-rose-400" />
                <span>components/scraping/alerts_parser.c</span>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Скопійовано</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy C Code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 sm:p-5 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-[380px]">
              <code>{SAMPLE_PARSER_C}</code>
            </pre>

            <div className="px-4 py-2.5 bg-slate-900/60 border-t border-white/5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Host Tested with Unity (test_host/)</span>
              <span className="text-emerald-400">100% Pass Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
