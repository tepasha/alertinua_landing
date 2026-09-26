import React from 'react';
import { Smartphone, ShieldCheck, Moon, BellOff, Zap, Eye, BatteryLow, Volume2 } from 'lucide-react';
import { Language } from '../types';

interface WhyHardwareProps {
  lang: Language;
}

export const WhyHardware: React.FC<WhyHardwareProps> = ({ lang }) => {
  return (
    <section id="comparison" className="py-20 bg-[#07090E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono font-semibold text-amber-400 tracking-wider uppercase mb-2">
            {lang === 'ua' ? 'Чому фізичний гаджет' : 'Why a Physical Device'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white text-balance">
            {lang === 'ua' ? (
              'Чому окремий настільний прилад надійніший за смартфон'
            ) : (
              'Why a Dedicated Desk Monitor Beats Smartphone Apps'
            )}
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed text-balance">
            {lang === 'ua' ? (
              'Смартфон має десятки відволікаючих факторів, розряджається, стоїть на беззвучному вночі або блокує пуші. AlertInUA створений для однієї мети — рятувати життя та давати спокій.'
            ) : (
              'Smartphones face notification fatigue, silent mode, and battery drain. AlertInUA serves a single vital purpose with zero friction.'
            )}
          </p>
        </div>

        {/* Side-by-Side Comparison Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16">
          {/* Smartphone Column (The Problems) */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-200">
                    {lang === 'ua' ? 'Звичайний смартфон / додаток' : 'Smartphone / Telegram Channels'}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {lang === 'ua' ? 'Ненадійний у критичні моменти' : 'Prone to delays and missed alerts'}
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <BellOff className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'ua'
                      ? 'Режим "Не турбувати" або беззвучний вночі глушить сповіщення'
                      : 'Silent or Do-Not-Disturb modes silence night-time emergency alerts'}
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <BatteryLow className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'ua'
                      ? 'Швидко розряджається при відключеннях світла; треба берегти заряд'
                      : 'Rapid battery drain during power outages; saving battery is paramount'}
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <Eye className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'ua'
                      ? 'Екран вимкнений: щоб дізнатись статус, треба розблокувати телефон і відкрити чат'
                      : 'Screen is off: requires unlocking phone, finding app, and checking chats'}
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <Zap className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'ua'
                      ? 'Push-повідомлення можуть затримуватись на хвилини через навантаження серверів'
                      : 'Push notification gateways often lag by minutes during heavy traffic'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-300">
              {lang === 'ua' ? 'Підсумок: сповіщення губляться серед сотень інших' : 'Verdict: High alert fatigue'}
            </div>
          </div>

          {/* AlertInUA Column (The Solution) */}
          <div className="bg-gradient-to-b from-rose-950/20 via-slate-900 to-slate-900 border border-rose-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-rose-950/20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">AlertInUA ESP32</h3>
                  <p className="text-xs text-rose-300 font-medium">
                    {lang === 'ua' ? 'Автономний настільний вартовий' : 'Dedicated Autonomous Desk Sentinel'}
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <Eye className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'ua'
                      ? 'Один швидкий погляд на стіл — і ти миттєво знаєш ситуацію в країні'
                      : 'Glanceable status: instantaneous visual awareness without touching anything'}
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <Moon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'ua'
                      ? 'Розумний нічний режим: фоторезистор автоматично приглушує яскравість у темряві'
                      : 'Smart night mode: LDR hardware sensor dims brightness down to 15% in the dark'}
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <Volume2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'ua'
                      ? 'Апаратний п\'єзо-зумер спрацьовує без компромісів саме у твоїй області'
                      : 'Direct hardware piezo buzzer triggers only for your configured home region'}
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'ua'
                      ? 'IoT API alerts.in.ua: прямий компактний JSON кожні кілька секунд'
                      : 'Consumes low-bandwidth raw IoT endpoint alerts.in.ua directly'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-500/20 text-xs font-mono text-rose-300">
              {lang === 'ua'
                ? 'Підсумок: 100% фокус на безпеці без інформаційного шуму'
                : 'Verdict: Zero distractions, 100% reliable safety'}
            </div>
          </div>
        </div>

        {/* Ambient Nightstand Feature Spotlight */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-6 sm:p-10">
            <div className="text-xs font-mono font-medium text-rose-400 uppercase tracking-wider mb-2">
              {lang === 'ua' ? 'Комфортний сон' : 'Bedroom & Workstation Comfort'}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4">
              {lang === 'ua'
                ? 'ПІ-регулятор нічної яскравості: не заважає спати'
                : 'Adaptive PI Backlight: Gentle on the Eyes at Night'}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {lang === 'ua'
                ? 'Завдяки фоторезистору LDR (GPIO33) та апаратному ПІ-регулятору в brightness_task, прилад самостійно відчуває рівень світла в кімнаті. Вдень при яскравому сонці він працює на повну яскравість, а вночі делікатно знижує підсвітку дисплея, щоб не засліплювати кімнату.'
                : 'An onboard LDR photoresistor on GPIO33 constantly feeds ambient lux values to a mathematical Proportional-Integral regulator running in its own RTOS task. In bright daylight, the screen runs at full brilliance; at night, it smoothly drops to a gentle glow.'}
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                {lang === 'ua' ? 'Час реакції ~500мс' : '500ms sample period'}
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {lang === 'ua' ? 'Анти-windup фільтрація' : 'Anti-windup clamping'}
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {lang === 'ua' ? 'Плавний LEDC PWM' : 'Smooth LEDC PWM'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 h-full min-h-[320px] relative">
            <img
              src="/images/device_nightstand.jpg"
              alt="AlertInUA on bedroom nightstand in dim lighting"
              className="w-full h-full object-cover max-h-[420px]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
