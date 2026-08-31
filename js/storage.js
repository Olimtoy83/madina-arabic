const STORAGE_KEY = "madina-arabic-learning-progress";
const STORAGE_VERSION = 2;

function getLocalDate() {
  const date = new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function getDefaultProgress() {
  return { version: STORAGE_VERSION, locale: "ru", currentLessonId: lessons[0].id, currentWord: 0, learnedWordIds: [], xpAwardedWordIds: [], attempts: 0, correctAnswers: 0, xp: 0, streak: 1, lastActiveDate: null };
}

function normalizeWordIds(value) {
  return Array.isArray(value) ? [...new Set(value.filter((id) => allWords.some((word) => word.id === id)))] : [];
}

function normalizeProgress(saved) {
  const fallback = getDefaultProgress();
  const source = saved && typeof saved === "object" ? saved : {};
  const currentLessonId = lessons.some((lesson) => lesson.id === source.currentLessonId) ? source.currentLessonId : fallback.currentLessonId;
  const wordCount = lessons.find((lesson) => lesson.id === currentLessonId).words.length;
  return { ...fallback, ...source, version: STORAGE_VERSION, locale: source.locale === "uz" ? "uz" : "ru", currentLessonId, currentWord: Number.isInteger(source.currentWord) && source.currentWord >= 0 ? source.currentWord % wordCount : 0, learnedWordIds: normalizeWordIds(source.learnedWordIds), xpAwardedWordIds: normalizeWordIds(source.xpAwardedWordIds), attempts: Number.isFinite(source.attempts) && source.attempts >= 0 ? source.attempts : 0, correctAnswers: Number.isFinite(source.correctAnswers) && source.correctAnswers >= 0 ? source.correctAnswers : 0, xp: Number.isFinite(source.xp) && source.xp >= 0 ? source.xp : 0, streak: Number.isInteger(source.streak) && source.streak > 0 ? source.streak : 1, lastActiveDate: typeof source.lastActiveDate === "string" ? source.lastActiveDate : null };
}

function loadProgress() { try { return normalizeProgress(JSON.parse(localStorage.getItem(STORAGE_KEY))); } catch { return getDefaultProgress(); } }
function saveProgress(progress) { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
function recordLearningActivity(progress) {
  const today = getLocalDate();
  if (progress.lastActiveDate === today) return;
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = new Date(yesterday.getTime() - yesterday.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  progress.streak = progress.lastActiveDate === yesterdayKey ? progress.streak + 1 : 1;
  progress.lastActiveDate = today;
}
