const STORAGE_KEY = "madina-arabic-learning-progress";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function getDefaultProgress() {
  return { currentWord: 0, learnedWordIds: [], correctAnswers: 0, attempts: 0, streak: 1, lastActiveDate: getToday() };
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && typeof saved === "object" ? { ...getDefaultProgress(), ...saved } : getDefaultProgress();
  } catch {
    return getDefaultProgress();
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function touchProgress(progress) {
  const today = getToday();
  if (progress.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    progress.streak = progress.lastActiveDate === yesterday ? progress.streak + 1 : 1;
    progress.lastActiveDate = today;
  }
  saveProgress(progress);
}
