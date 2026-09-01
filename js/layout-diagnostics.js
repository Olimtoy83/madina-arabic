(() => {
  if (new URLSearchParams(window.location.search).get("layout-debug") !== "1") return;

  const panel = document.createElement("pre");
  panel.setAttribute("aria-live", "polite");
  panel.style.cssText = "position:fixed;z-index:2147483647;right:8px;bottom:8px;left:8px;max-height:42vh;margin:0;padding:10px;border:1px solid #a84444;border-radius:8px;background:#fff;color:#19332a;font:12px/1.35 monospace;white-space:pre-wrap;overflow:auto;overflow-wrap:anywhere;user-select:text";
  document.body.appendChild(panel);

  const watched = ["html", "body", ".app", ".app-header", ".brand", ".header-stats", ".language-switcher", ".screen", ".summary-card", ".summary-heading", ".continue-button", ".lessons-section", ".section-heading", ".lesson-list", ".lesson-card", ".lesson-progress", ".word-card", ".builder-card", ".learning-actions", ".audio-button"];
  let frame;

  const label = (element) => element.id ? `#${element.id}` : element.classList.length ? `.${[...element.classList].join(".")}` : element.tagName.toLowerCase();
  const details = (element) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return `${label(element)} rect=${Math.round(rect.left)},${Math.round(rect.right)} w=${Math.round(rect.width)} scroll=${element.scrollWidth}/${element.clientWidth} width=${style.width} min=${style.minWidth} max=${style.maxWidth} flex=${style.flex} white-space=${style.whiteSpace} overflow-x=${style.overflowX} transform=${style.transform}`;
  };
  const measure = () => {
    const root = document.documentElement;
    const viewport = root.clientWidth;
    const visual = window.visualViewport;
    const major = [...new Set(watched.flatMap((selector) => [...document.querySelectorAll(selector)]))];
    const all = [...document.body.querySelectorAll("*")];
    const offenders = all.filter((element) => {
      if (element === panel) return false;
      const rect = element.getBoundingClientRect();
      return rect.right > viewport + 0.5 || rect.left < -0.5 || element.scrollWidth > element.clientWidth + 1;
    });
    panel.textContent = [
      "Madina Arabic layout diagnostics (temporary)",
      `viewport clientWidth=${viewport}; document scrollWidth=${root.scrollWidth}; body scrollWidth=${document.body.scrollWidth}; visualViewport=${visual ? `${Math.round(visual.width)}x${Math.round(visual.height)} scale=${visual.scale}` : "unavailable"}`,
      `overflow candidates (${offenders.length}):`,
      ...(offenders.length ? offenders.map(details) : ["none"]),
      "major layout measurements:",
      ...major.map(details)
    ].join("\n");
  };
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(measure);
  };

  new ResizeObserver(schedule).observe(document.documentElement);
  new MutationObserver((records) => {
    if (records.some((record) => !panel.contains(record.target))) schedule();
  }).observe(document.body, { childList: true, subtree: true, characterData: true });
  window.addEventListener("resize", schedule);
  window.visualViewport?.addEventListener("resize", schedule);
  window.addEventListener("load", schedule);
  schedule();
})();
