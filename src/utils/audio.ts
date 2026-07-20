// Web Audio API Retro Sound Effects Synthesizer

class AudioSynth {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
  }

  public playClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  }

  public playBootSound() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Classic 4-note chord boot chime (Windows 95/XP synth chord blend)
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);

      const startTime = ctx.currentTime + idx * 0.15;
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 1.8);
    });
  }

  public playShutdownSound() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Descending retro shutdown notes
    const notes = [523.25, 392.00, 329.63, 261.63];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.18);

      const startTime = ctx.currentTime + idx * 0.18;
      gain.gain.setValueAtTime(0.1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  public playError() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  }

  public playWin() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);

      const startTime = ctx.currentTime + i * 0.1;
      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  public playTrash() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Noise buffer for paper crumple
    const bufferSize = ctx.sampleRate * 0.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    filter.Q.setValueAtTime(1, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start();
  }

  // Synthesize a short 8-bit melody sequence for Music Player
  public playSynthesizedTrack(trackId: number, onEnd?: () => void): { stop: () => void } {
    const ctx = this.getContext();
    if (!ctx) return { stop: () => {} };

    let isPlaying = true;
    const timeouts: Array<ReturnType<typeof setTimeout>> = [];

    const tracksMelodies = [
      // Track 0: Win95 Chill Synthwave
      [
        { f: 261.63, d: 0.3 }, { f: 329.63, d: 0.3 }, { f: 392.00, d: 0.3 }, { f: 523.25, d: 0.6 },
        { f: 440.00, d: 0.3 }, { f: 392.00, d: 0.3 }, { f: 349.23, d: 0.3 }, { f: 329.63, d: 0.6 },
        { f: 293.66, d: 0.3 }, { f: 349.23, d: 0.3 }, { f: 392.00, d: 0.3 }, { f: 440.00, d: 0.6 },
      ],
      // Track 1: Retro 8-bit Chiptune
      [
        { f: 440, d: 0.2 }, { f: 440, d: 0.2 }, { f: 659, d: 0.2 }, { f: 587, d: 0.2 },
        { f: 523, d: 0.2 }, { f: 440, d: 0.2 }, { f: 392, d: 0.2 }, { f: 440, d: 0.4 },
        { f: 523, d: 0.2 }, { f: 587, d: 0.2 }, { f: 659, d: 0.4 }, { f: 523, d: 0.4 },
      ],
      // Track 2: MS-DOS Hackers Theme
      [
        { f: 220, d: 0.15 }, { f: 246.94, d: 0.15 }, { f: 261.63, d: 0.15 }, { f: 293.66, d: 0.3 },
        { f: 220, d: 0.15 }, { f: 261.63, d: 0.15 }, { f: 329.63, d: 0.3 }, { f: 293.66, d: 0.3 },
      ]
    ];

    const notes = tracksMelodies[trackId % tracksMelodies.length];
    let step = 0;

    const playNextNote = () => {
      if (!isPlaying) {
        onEnd?.();
        return;
      }
      const note = notes[step % notes.length];
      step++;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = trackId === 1 ? 'square' : 'triangle';
      osc.frequency.setValueAtTime(note.f, ctx.currentTime);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.d * 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + note.d);

      const t = setTimeout(playNextNote, note.d * 1000);
      timeouts.push(t);
    };

    playNextNote();

    return {
      stop: () => {
        isPlaying = false;
        timeouts.forEach(clearTimeout);
      }
    };
  }
}

export const sound = new AudioSynth();
