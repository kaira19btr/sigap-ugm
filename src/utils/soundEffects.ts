/**
 * Web Audio API synthesizer for UI sound effects in SIGAP
 * Zero external assets needed, ultra-fast, offline-ready and crystal clear
 */

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isGlobalListenerAttached: boolean = false;
  private lastSoundTime: number = 0;

  constructor() {
    // Check saved audio preference
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('sigap_sound_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sigap_sound_muted', String(this.isMuted));
    }
    if (!this.isMuted) {
      this.playClick();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sigap_sound_muted', String(muted));
    }
  }

  /**
   * Crisp UI Click - tactile, pleasant haptic click sound
   */
  public playClick(pitch: number = 1.0) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Debounce very rapid multi-click events (< 25ms) to prevent audio clutter
    const nowMs = performance.now();
    if (nowMs - this.lastSoundTime < 25) return;
    this.lastSoundTime = nowMs;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Pleasant high-frequency tactile tap (850Hz dropping to 240Hz)
      const baseFreq = 820 * pitch;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(Math.max(120, baseFreq * 0.28), now + 0.038);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Soft Pop for tabs, toggles, or secondary interactive elements
   */
  public playTabSwitch() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.07);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.075);
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Dialog / Modal open sound
   */
  public playModalOpen() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.12);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.125);
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Login Start - High-tech charge & resonant sweep as Logo radiates power
   */
  public playLoginStart() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Sub bass rumble & sweep
      const sweepOsc = ctx.createOscillator();
      const sweepGain = ctx.createGain();

      sweepOsc.type = 'sawtooth';
      sweepOsc.frequency.setValueAtTime(120, now);
      sweepOsc.frequency.exponentialRampToValueAtTime(480, now + 0.6);

      sweepGain.gain.setValueAtTime(0.08, now);
      sweepGain.gain.linearRampToValueAtTime(0.15, now + 0.3);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(1600, now + 0.6);

      sweepOsc.connect(filter);
      filter.connect(sweepGain);
      sweepGain.connect(ctx.destination);

      sweepOsc.start(now);
      sweepOsc.stop(now + 0.65);

      // Sparkle chime layer
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();

      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(880, now + 0.2);
      chimeOsc.frequency.exponentialRampToValueAtTime(1320, now + 0.5);

      chimeGain.gain.setValueAtTime(0.001, now);
      chimeGain.gain.setValueAtTime(0.1, now + 0.2);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);

      chimeOsc.start(now + 0.2);
      chimeOsc.stop(now + 0.55);
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Success Fanfare Chime
   */
  public playSuccessChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

      notes.forEach((freq, index) => {
        const noteTime = now + index * 0.08;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.14, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.35);
      });
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Quick Role Select Tone
   */
  public playRoleSelect() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Global Click Listener:
   * Listens to every click in the window and plays a crisp tactile sound automatically!
   */
  public initGlobalClickListener() {
    if (typeof window === 'undefined' || this.isGlobalListenerAttached) return;
    this.isGlobalListenerAttached = true;

    // Use capture phase so all clicks (even stopping propagation) get the audio feedback
    window.addEventListener(
      'click',
      (e: MouseEvent) => {
        // Resume AudioContext if suspended
        this.getContext();

        if (this.isMuted) return;

        const target = e.target as HTMLElement | null;
        if (!target) {
          this.playClick();
          return;
        }

        // Determine if target or parent is a special element to vary pitch slightly
        const isButton = target.closest('button, [role="button"], .btn');
        const isInput = target.closest('input, select, textarea');
        const isLink = target.closest('a');
        const isTab = target.closest('[role="tab"], .tab');

        if (isTab) {
          this.playTabSwitch();
        } else if (isButton) {
          this.playClick(1.05); // slightly crisper
        } else if (isInput) {
          this.playClick(0.95);
        } else if (isLink) {
          this.playClick(1.0);
        } else {
          // General click on card, row, icon, canvas, map or background
          this.playClick(1.0);
        }
      },
      { capture: true, passive: true }
    );
  }
}

export const soundEffects = new SoundSynthesizer();
