import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, Package, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface PreorderFormProps {
  lang: Language;
}

export const PreorderForm: React.FC<PreorderFormProps> = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '', // email or telegram
    kitType: 'ready_device',
    city: '',
    comment: ''
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) {
      setErrorMsg(
        lang === 'ua'
          ? 'Будь ласка, заповніть ім\'я та контакт (Email або Telegram).'
          : 'Please provide your name and contact details (Email or Telegram).'
      );
      return;
    }

    // Save lead in localStorage for persistence
    try {
      const existingLeads = JSON.parse(localStorage.getItem('alertinua_leads') || '[]');
      existingLeads.push({
        ...formData,
        date: new Date().toISOString()
      });
      localStorage.setItem('alertinua_leads', JSON.stringify(existingLeads));
    } catch {
      // ignore localstorage quota
    }

    setErrorMsg(null);
    setSubmitted(true);
  };

  return (
    <section id="preorder" className="py-20 bg-[#07090E] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-rose-500/20 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/10 blur-[120px] pointer-events-none rounded-full" />

          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ua' ? 'Спільнота та Замовлення' : 'Community Kits'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white text-balance">
              {lang === 'ua'
                ? 'Не маєш паяльника? Отримай готовий девайс або набір'
                : 'No Soldering Iron? Get a Pre-built Device or DIY Kit'}
            </h2>
            <p className="mt-3 text-slate-300 text-sm leading-relaxed text-balance">
              {lang === 'ua'
                ? 'Залиш контакти, щоб отримати готовий настільний девайс у фірмовому 3D-корпусі, або кит для швидкого складання.'
                : 'Leave your contact info to get a fully assembled device in a 3D-printed enclosure or a ready-to-solder parts kit.'}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3 text-xs text-rose-300 bg-rose-950/60 border border-rose-800/60 rounded-xl">
                  {errorMsg}
                </div>
              )}

              {/* Kit Preference Radio Buttons */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-300">
                  {lang === 'ua' ? 'Оберіть варіант комплектації:' : 'Select configuration:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, kitType: 'ready_device' })}
                    className={`p-3 rounded-xl border text-left transition-colors flex items-center gap-2.5 ${
                      formData.kitType === 'ready_device'
                        ? 'bg-rose-950/50 border-rose-500 text-white'
                        : 'bg-slate-800/40 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Package className="w-4 h-4 text-rose-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">
                        {lang === 'ua' ? 'Готовий девайс' : 'Assembled Device'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {lang === 'ua' ? 'Спаяний у корпусі' : 'Pre-flashed & tested'}
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, kitType: 'diy_kit' })}
                    className={`p-3 rounded-xl border text-left transition-colors flex items-center gap-2.5 ${
                      formData.kitType === 'diy_kit'
                        ? 'bg-rose-950/50 border-rose-500 text-white'
                        : 'bg-slate-800/40 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Package className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">
                        {lang === 'ua' ? 'DIY Набір деталей' : 'DIY Parts Kit'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {lang === 'ua' ? 'Всі деталі + корпус' : 'All components + case'}
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, kitType: 'firmware_only' })}
                    className={`p-3 rounded-xl border text-left transition-colors flex items-center gap-2.5 ${
                      formData.kitType === 'firmware_only'
                        ? 'bg-rose-950/50 border-rose-500 text-white'
                        : 'bg-slate-800/40 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Package className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">
                        {lang === 'ua' ? 'Плата з прошивкою' : 'Flashed Board'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {lang === 'ua' ? 'Лише LilyGO T-Display' : 'LilyGO board only'}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    {lang === 'ua' ? 'Ваше ім\'я' : 'Your Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'ua' ? 'Олександр' : 'John'}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    {lang === 'ua' ? 'Telegram або Email' : 'Telegram handle or Email'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder={lang === 'ua' ? '@username або name@email.com' : '@username or email'}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              </div>

              {/* City & Comment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    {lang === 'ua' ? 'Місто доставки' : 'City / Location'}
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder={lang === 'ua' ? 'Київ, Львів, Дніпро...' : 'Kyiv, Lviv, etc.'}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    {lang === 'ua' ? 'Побажання чи запитання' : 'Comments or questions'}
                  </label>
                  <input
                    type="text"
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder={lang === 'ua' ? 'Колір корпусу, тощо' : 'Custom preferences'}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 px-6 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-950/60 transition-all flex items-center justify-center gap-2 mt-4 active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'ua' ? 'Надіслати запит на девайс' : 'Submit Kit Request'}</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {lang === 'ua' ? 'Дякуємо! Запит успішно отримано' : 'Thank You! Request Received'}
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                {lang === 'ua'
                  ? 'Ми зв\'яжемося з вами через Telegram або Email найближчим часом для уточнення деталей доставки та комплектації.'
                  : 'We will reach out to you shortly via Telegram or Email with kit availability details.'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-mono text-slate-400 hover:text-white underline pt-2"
              >
                {lang === 'ua' ? 'Надіслати ще один запит' : 'Submit another response'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
