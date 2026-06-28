// 語音朗讀與 Web Audio 音效合成模組 (Audio Engine)

class AudioEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.audioCtx = null;
    this.ptVoice = null;
    this.initVoice();
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  initVoice() {
    if (!this.synth) return;
    const loadVoices = () => {
      const voices = this.synth.getVoices();
      // 優先選擇巴西葡萄牙語 pt-BR
      this.ptVoice = voices.find(v => v.lang === 'pt-BR' || v.lang === 'pt_BR') ||
                     voices.find(v => v.lang.startsWith('pt'));
    };

    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  // 朗讀巴西葡萄牙語
  speak(text, isSlow = false) {
    if (!this.synth) return;
    this.synth.cancel(); // 停止先前的發音

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = isSlow ? 0.6 : 0.9;
    utterance.pitch = 1.0;

    if (this.ptVoice) {
      utterance.voice = this.ptVoice;
    }

    this.synth.speak(utterance);
  }

  // --- Web Audio 原生音效合成 ---

  // 點擊按鈕音效 (Pop)
  playClick() {
    this.initAudioContext();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.05);
  }

  // 答對音效 (Cheerful Chime)
  playCorrect() {
    this.initAudioContext();
    const now = this.audioCtx.currentTime;
    
    // 雙音和諧彈奏 E5 -> A5
    const notes = [659.25, 880];
    notes.forEach((freq, index) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.3, now + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.3);
    });
  }

  // 答錯音效 (Gentle Thud)
  playWrong() {
    this.initAudioContext();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.25);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // 獲得鑽石音效 (Gem Sparkling Coin)
  playGem() {
    this.initAudioContext();
    const now = this.audioCtx.currentTime;
    const notes = [987.77, 1318.51, 1567.98]; // B5, E6, G6
    
    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      gain.gain.setValueAtTime(0.2, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.2);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.2);
    });
  }

  // 通關升級狂歡音效 (Fanfare)
  playLevelUp() {
    this.initAudioContext();
    const now = this.audioCtx.currentTime;
    const arpeggio = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    arpeggio.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);

      gain.gain.setValueAtTime(0.25, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.4);
    });
  }
}

const audioEngine = new AudioEngine();
