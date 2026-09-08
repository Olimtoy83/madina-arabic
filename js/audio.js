class AudioPlaybackController {
  constructor(onStateChange) {
    this.onStateChange = onStateChange;
    this.audio = null;
    this.playbackRate = 1;
  }

  setPlaybackRate(rate) { this.playbackRate = rate === 0.75 ? 0.75 : 1; if (this.audio) this.audio.playbackRate = this.playbackRate; return this.playbackRate; }
  getPlaybackRate() { return this.playbackRate; }

  play(source) {
    this.stop();

    if (!source) {
      this.onStateChange("missing");
      return;
    }

    const audio = new Audio(source);
    this.audio = audio;
    audio.playbackRate = this.playbackRate;
    if ("preservesPitch" in audio) audio.preservesPitch = true;
    this.onStateChange("loading");

    audio.addEventListener("playing", () => this.isCurrent(audio) && this.onStateChange("playing"));
    audio.addEventListener("ended", () => this.isCurrent(audio) && this.finish());
    audio.addEventListener("error", () => this.isCurrent(audio) && this.onStateChange("error"));

    audio.play().catch(() => {
      if (this.isCurrent(audio)) this.onStateChange("error");
    });
  }

  stop() {
    if (!this.audio) return;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio = null;
  }

  finish() {
    this.audio = null;
    this.onStateChange("idle");
  }

  isCurrent(audio) {
    return this.audio === audio;
  }
}
