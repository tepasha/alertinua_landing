/**
 * Web Audio API synthesizer for the AlertInUA piezo buzzer (GPIO25 LEDC PWM)
 * Emulates the 2.7kHz modulated alarm siren and gentle double-chirp
 */

let audioCtx: AudioContext | null = null;
let currentOscillator: OscillatorNode | null = null;
let currentGain: GainNode | null = null;
let alarmInterval: number | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playAlarmSiren(durationSeconds: number = 3.5, onEnd?: () => void) {
  stopBuzzer();
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Piezo buzzers sound best with square wave around 2400-3000 Hz
    osc.type = 'square';
    osc.frequency.setValueAtTime(2400, ctx.currentTime);

    // Subtle siren sweep frequency
    const now = ctx.currentTime;
    for (let i = 0; i < durationSeconds; i += 0.4) {
      osc.frequency.exponentialRampToValueAtTime(3200, now + i + 0.2);
      osc.frequency.exponentialRampToValueAtTime(2200, now + i + 0.4);
    }

    gain.gain.setValueAtTime(0.08, now); // comfortable volume
    gain.gain.exponentialRampToValueAtTime(0.001, now + durationSeconds);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + durationSeconds);

    currentOscillator = osc;
    currentGain = gain;

    window.setTimeout(() => {
      stopBuzzer();
      if (onEnd) onEnd();
    }, durationSeconds * 1000);
  } catch (e) {
    console.warn('AudioContext not allowed or not supported', e);
  }
}

export function playShortBeep() {
  stopBuzzer();
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(2800, ctx.currentTime);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  } catch (e) {
    console.warn('AudioContext failed', e);
  }
}

export function stopBuzzer() {
  if (alarmInterval) {
    window.clearInterval(alarmInterval);
    alarmInterval = null;
  }
  if (currentOscillator) {
    try {
      currentOscillator.stop();
      currentOscillator.disconnect();
    } catch {
      // already stopped
    }
    currentOscillator = null;
  }
  if (currentGain) {
    try {
      currentGain.disconnect();
    } catch {
      // ignore
    }
    currentGain = null;
  }
}
