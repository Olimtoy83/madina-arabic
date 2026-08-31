class AudioPlaybackController {
  constructor(onStateChange) {
    this.onStateChange = onStateChange;
    this.audio = null;
  }

  play(source) {
    this.stop();

    if (!source) {
      this.onStateChange("missing");
      return;
    }

    const audio = new Audio(source);
    this.audio = audio;
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
