import React, { useState, useEffect, useMemo } from 'react';
import { Volume2, VolumeX, Sun, Moon, Wifi, Battery, AlertTriangle, CheckCircle2, RotateCcw, Cpu, Radio, Sparkles } from 'lucide-react';
import { MAP_REGIONS, MAP_DISPLAY_W, MAP_DISPLAY_H, MapRegion } from '../data/ukraineMapData';
import { RTOS_TASKS } from '../data/hardwareData';
import { playAlarmSiren, playShortBeep, stopBuzzer } from '../utils/buzzerAudio';
import { Language, AlertState } from '../types';

interface DeviceSimulatorProps {
  lang: Language;
}

export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({ lang }) => {
  // State for each of the 25 regions: id -> 'N' | 'P' | 'A'
  const [regionAlerts, setRegionAlerts] = useState<Record<number, AlertState>>(() => {
    // Default demo: Kyiv partial, Kharkiv & Donetsk full
    const initial: Record<number, AlertState> = {};
    MAP_REGIONS.forEach((r) => {
      if (r.nameUa.includes('Донецька') || r.nameUa.includes('Луганська')) {
        initial[r.id] = 'A';
      } else if (r.nameUa.includes('Київська') || r.nameUa.includes('Харківська')) {
        initial[r.id] = 'P';
      } else {
        initial[r.id] = 'N';
      }
    });
    return initial;
  });

  // Simulated ambient light level (0 = dark night bedroom, 100 = sunny day office)
  const [ambientLight, setAmbientLight] = useState<number>(65);

  // Sound enabled & active siren state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isSirenPlaying, setIsSirenPlaying] = useState<boolean>(false);

  // Simulated device state
  const [isErrorMode, setIsErrorMode] = useState<boolean>(false);
  const [isProvisioning, setIsProvisioning] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<string>('custom');
  const [hoveredRegion, setHoveredRegion] = useState<MapRegion | null>(null);

  // FreeRTOS task telemetry simulation
  const [taskTicks, setTaskTicks] = useState<number>(1420);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaskTicks((t) => t + 1);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // Compute total alerts
  const totalAlarm = useMemo(() => {
    return Object.values(regionAlerts).filter((s) => s === 'A').length;
  }, [regionAlerts]);

  const totalPartial = useMemo(() => {
    return Object.values(regionAlerts).filter((s) => s === 'P').length;
  }, [regionAlerts]);

  // Handle region click: N -> P -> A -> N
  const toggleRegion = (id: number) => {
    setIsErrorMode(false);
    setActivePreset('custom');
    setRegionAlerts((prev) => {
      const current = prev[id] || 'N';
      const next: AlertState = current === 'N' ? 'P' : current === 'P' ? 'A' : 'N';
      if (next === 'A' && soundEnabled) {
        triggerSirenAudio();
      } else if (soundEnabled) {
        playShortBeep();
      }
      return { ...prev, [id]: next };
    });
  };

  const triggerSirenAudio = () => {
    setIsSirenPlaying(true);
    playAlarmSiren(3.5, () => setIsSirenPlaying(false));
  };

  const toggleSound = () => {
    if (!soundEnabled) {
      setSoundEnabled(true);
      playShortBeep();
    } else {
      setSoundEnabled(false);
      stopBuzzer();
      setIsSirenPlaying(false);
    }
  };

  // Presets
  const applyPreset = (type: 'clear' | 'kyiv' | 'east' | 'massive' | 'err') => {
    setActivePreset(type);
    if (type === 'err') {
      setIsErrorMode(true);
      return;
    }
    setIsErrorMode(false);

    const updated: Record<number, AlertState> = {};
    MAP_REGIONS.forEach((r) => {
      if (type === 'clear') {
        updated[r.id] = 'N';
      } else if (type === 'kyiv') {
        updated[r.id] = r.nameUa.includes('Київська') ? 'A' : 'N';
      } else if (type === 'east') {
        const isEast =
          r.nameUa.includes('Харківська') ||
          r.nameUa.includes('Донецька') ||
          r.nameUa.includes('Луганська') ||
          r.nameUa.includes('Дніпропетровська') ||
          r.nameUa.includes('Запорізька');
        updated[r.id] = isEast ? 'A' : 'N';
      } else if (type === 'massive') {
        // Almost everywhere
        const isWest = r.nameUa.includes('Закарпатська') || r.nameUa.includes('Чернівецька');
        updated[r.id] = isWest ? 'P' : 'A';
      }
    });

    setRegionAlerts(updated);

    if (type !== 'clear' && soundEnabled) {
      triggerSirenAudio();
    } else if (soundEnabled) {
      playShortBeep();
    }
  };

  // PI-regulator simulation: calculate screen brightness % from ambient light
  // Min 15% brightness in pitch black, max 100% in bright light
  const screenBacklightPercent = useMemo(() => {
    const minBrightness = 16;
    const maxBrightness = 100;
    const calculated = minBrightness + (ambientLight / 100) * (maxBrightness - minBrightness);
    return Math.round(calculated);
  }, [ambientLight]);

  return (
    <section id="simulator" className="py-20 bg-[#090C14] border-t border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono font-semibold text-rose-400 tracking-wider uppercase mb-2">
            {lang === 'ua' ? 'Живий інтерактивний емулятор' : 'Live Interactive Emulator'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white text-balance">
            {lang === 'ua' ? 'Випробуй LilyGO T-Display прямо зараз' : 'Test the LilyGO T-Display Right in Browser'}
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed text-balance">
            {lang === 'ua' ? (
              'Точна віртуальна копія екрана 135×240 пікселів та векторної мапи України з коду прошивки. Спробуй клікати по областях, тестувати датчик світла чи слухати п\'єзо-зумер.'
            ) : (
              'Pixel-exact replica of the 135x240 display and firmware vector map. Click regions to simulate alerts, adjust ambient room lighting, and hear the real piezo siren.'
            )}
          </p>
        </div>

        {/* Main Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Virtual Device Frame (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* The Physical Device Casing Mockup */}
            <div className="relative w-full max-w-[540px] bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 p-6 sm:p-8 rounded-[32px] border-4 border-neutral-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] select-none">
              {/* Device Top Rim & LEDs */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-3">
                  {/* Alarm Red LED (GPIO2) */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        totalAlarm > 0
                          ? 'bg-rose-500 shadow-[0_0_12px_#f43f5e] animate-pulse'
                          : 'bg-rose-950/60 border border-rose-800/40'
                      }`}
                    />
                    <span className="text-[10px] font-mono text-slate-400">LED1 (ALARM)</span>
                  </div>

                  {/* Wi-Fi Blue LED (GPIO15) */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-3 h-3 rounded-full transition-all ${
                        isErrorMode
                          ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-ping'
                          : 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]'
                      }`}
                    />
                    <span className="text-[10px] font-mono text-slate-400">LED2 (WIFI)</span>
                  </div>
                </div>

                {/* Hardware branding badge on enclosure */}
                <span className="text-[11px] font-mono font-semibold tracking-wider text-neutral-400">
                  AlertInUA · T-Display
                </span>
              </div>

              {/* The 135x240 Color IPS Screen Glass */}
              <div
                className="relative w-full aspect-[240/135] bg-black rounded-xl overflow-hidden border-2 border-neutral-800 shadow-inner flex items-center justify-center transition-all duration-300"
                style={{
                  filter: `brightness(${screenBacklightPercent}%) contrast(105%)`,
                }}
              >
                {/* Simulated IPS Display Pixel Matrix */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4px_4px]" />

                {/* Status Bar on Display */}
                <div className="absolute top-1.5 left-2 right-2 flex items-center justify-between text-[11px] font-mono text-slate-400 z-10 pointer-events-none">
                  <div className="flex items-center gap-1.5 bg-black/60 px-1.5 py-0.5 rounded">
                    <Wifi className="w-3 h-3 text-cyan-400" />
                    <span>alerts.in.ua</span>
                  </div>

                  <div className="flex items-center gap-2 bg-black/60 px-1.5 py-0.5 rounded">
                    <span>{screenBacklightPercent}% PWM</span>
                    <div className="flex items-center gap-1 text-emerald-400">
                      <Battery className="w-3.5 h-3.5" />
                      <span>4.1V</span>
                    </div>
                  </div>
                </div>

                {/* SVG Vector Map of Ukraine using exact C firmware coordinates */}
                {!isErrorMode ? (
                  <svg
                    viewBox={`0 0 ${MAP_DISPLAY_W} ${MAP_DISPLAY_H}`}
                    className="w-full h-full p-1 transition-all"
                  >
                    {MAP_REGIONS.map((region) => {
                      const state = regionAlerts[region.id] || 'N';
                      const isHovered = hoveredRegion?.id === region.id;

                      let fillColor = '#141E33'; // Default safe dark navy
                      let strokeColor = '#2A3F66'; // Border

                      if (state === 'A') {
                        fillColor = '#E11D48'; // Full Alarm Vivid Red
                        strokeColor = '#FDA4AF';
                      } else if (state === 'P') {
                        fillColor = '#D97706'; // Partial Amber
                        strokeColor = '#FDE68A';
                      }

                      if (isHovered && state === 'N') {
                        fillColor = '#1E293B';
                        strokeColor = '#60A5FA';
                      }

                      return (
                        <path
                          key={region.id}
                          d={region.pathData}
                          fill={fillColor}
                          stroke={strokeColor}
                          strokeWidth={isHovered ? 1.4 : 0.8}
                          className="cursor-pointer transition-colors duration-200"
                          onClick={() => toggleRegion(region.id)}
                          onMouseEnter={() => setHoveredRegion(region)}
                          onMouseLeave={() => setHoveredRegion(null)}
                        >
                          <title>{lang === 'ua' ? region.nameUa : region.nameEn}</title>
                        </path>
                      );
                    })}
                  </svg>
                ) : (
                  /* Firmware ERR banner mode */
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <div className="text-3xl font-black font-mono tracking-widest text-rose-500 animate-pulse">
                      ERR
                    </div>
                    <div className="text-xs font-mono text-slate-400 mt-1">
                      HTTP_TIMEOUT // RETRY IN 5S
                    </div>
                  </div>
                )}

                {/* Bottom Screen Info Line */}
                <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-slate-400 z-10 pointer-events-none">
                  <div>
                    {hoveredRegion ? (
                      <span className="text-rose-300 font-semibold">
                        {lang === 'ua' ? hoveredRegion.nameUa : hoveredRegion.nameEn}
                      </span>
                    ) : (
                      <span>{lang === 'ua' ? 'Клікни по області' : 'Click region to toggle'}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {totalAlarm > 0 && (
                      <span className="text-rose-400 font-bold">{totalAlarm} ALARM</span>
                    )}
                    {totalPartial > 0 && (
                      <span className="text-amber-400">{totalPartial} PARTIAL</span>
                    )}
                    {totalAlarm === 0 && totalPartial === 0 && !isErrorMode && (
                      <span className="text-emerald-400 font-medium">ВСЕ СПОКІЙНО</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Physical Buttons & Ports beneath screen */}
              <div className="mt-5 flex items-center justify-between text-neutral-400 text-xs font-mono">
                <div className="flex items-center gap-2">
                  {/* BOOT button (SW1) */}
                  <button
                    onClick={() => {
                      setIsProvisioning(true);
                      setTimeout(() => setIsProvisioning(false), 3000);
                    }}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-900 border border-neutral-600 rounded-md text-[11px] text-slate-200 transition-colors flex items-center gap-1"
                  >
                    <span>BOOT (SW1)</span>
                  </button>
                  {isProvisioning && (
                    <span className="text-amber-400 text-[10px] animate-pulse">
                      SoftAP Active!
                    </span>
                  )}
                </div>

                {/* Buzzer sound toggle */}
                <button
                  onClick={toggleSound}
                  className={`px-3 py-1.5 rounded-md border text-[11px] transition-colors flex items-center gap-1.5 ${
                    soundEnabled
                      ? 'bg-rose-950/80 border-rose-600/70 text-rose-300'
                      : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
                  }`}
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                      <span>{lang === 'ua' ? 'Зумер: Увімкнено' : 'Buzzer: ON'}</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>{lang === 'ua' ? 'Зумер: Вимк' : 'Buzzer: Muted'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* PI-Regulator Ambient Light Interactive Slider */}
            <div className="mt-6 w-full max-w-[540px] bg-slate-900/90 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>
                    {lang === 'ua' ? 'Датчик світла LDR (GPIO33)' : 'Ambient Light Sensor (LDR)'}
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  {ambientLight < 20
                    ? lang === 'ua' ? 'Ніч / Темрява' : 'Night Room'
                    : ambientLight > 75
                    ? lang === 'ua' ? 'Яскравий офіс' : 'Bright Day'
                    : lang === 'ua' ? 'Звичайне світло' : 'Normal Indoor'}
                  {' '}({ambientLight}%)
                </div>
              </div>

              <input
                type="range"
                min="5"
                max="100"
                value={ambientLight}
                onChange={(e) => setAmbientLight(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>ПІ-вихід PWM: {screenBacklightPercent}%</span>
                <span className="text-emerald-400">LEDC Channel 0 (GPIO4)</span>
              </div>
            </div>
          </div>

          {/* Interactive Controls & Telemetry (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Test Presets */}
            <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>{lang === 'ua' ? 'Швидкі сценарії тестування' : 'Quick Test Scenarios'}</span>
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => applyPreset('clear')}
                  className={`px-3 py-2 text-xs font-medium rounded-xl border text-left transition-colors flex items-center gap-2 ${
                    activePreset === 'clear'
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                      : 'bg-slate-800/70 border-white/5 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{lang === 'ua' ? 'Все чисто' : 'All Clear'}</span>
                </button>

                <button
                  onClick={() => applyPreset('kyiv')}
                  className={`px-3 py-2 text-xs font-medium rounded-xl border text-left transition-colors flex items-center gap-2 ${
                    activePreset === 'kyiv'
                      ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                      : 'bg-slate-800/70 border-white/5 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{lang === 'ua' ? 'Київська обл.' : 'Kyiv Region'}</span>
                </button>

                <button
                  onClick={() => applyPreset('east')}
                  className={`px-3 py-2 text-xs font-medium rounded-xl border text-left transition-colors flex items-center gap-2 ${
                    activePreset === 'east'
                      ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                      : 'bg-slate-800/70 border-white/5 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{lang === 'ua' ? 'Східний фронт' : 'East / South'}</span>
                </button>

                <button
                  onClick={() => applyPreset('massive')}
                  className={`px-3 py-2 text-xs font-medium rounded-xl border text-left transition-colors flex items-center gap-2 ${
                    activePreset === 'massive'
                      ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                      : 'bg-slate-800/70 border-white/5 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{lang === 'ua' ? 'Масована загроза' : 'Nationwide Alert'}</span>
                </button>

                <button
                  onClick={() => applyPreset('err')}
                  className={`col-span-2 px-3 py-2 text-xs font-medium rounded-xl border text-left transition-colors flex items-center gap-2 ${
                    activePreset === 'err'
                      ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                      : 'bg-slate-800/70 border-white/5 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    {lang === 'ua' ? 'Емуляція збою зв\'язку (ERR)' : 'Simulate API Network Failure'}
                  </span>
                </button>
              </div>
            </div>

            {/* Live FreeRTOS Tasks Telemetry */}
            <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>FreeRTOS v10 (ESP-IDF)</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  Tick: {taskTicks}
                </span>
              </div>

              <div className="space-y-2">
                {RTOS_TASKS.slice(0, 5).map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center justify-between text-xs py-1.5 px-2.5 bg-slate-950/60 rounded-lg border border-white/5 font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          t.name === 'render_task'
                            ? 'bg-emerald-400 animate-pulse'
                            : t.name === 'fetch_task'
                            ? 'bg-cyan-400'
                            : 'bg-slate-500'
                        }`}
                      />
                      <span className="text-slate-200 font-medium">{t.name}</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                      <span>Prio {t.priority}</span>
                      <span className="text-slate-500">{t.stackWatermark} B</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Task Watchdog (TWDT)</span>
                <span className="text-emerald-400 font-mono">ARMED · AUTO-RESTART</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
