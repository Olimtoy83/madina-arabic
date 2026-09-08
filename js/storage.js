const STORAGE_KEY = "madina-arabic-learning-progress";
const AUDIO_PLAYBACK_RATE_STORAGE_KEY = "madina-arabic-audio-playback-rate";
const STORAGE_VERSION = 3;

function normalizeAudioPlaybackRate(rate) {
  return rate === 0.75 || rate === "0.75" ? 0.75 : 1;
}

function getAudioPlaybackRate() {
  return normalizeAudioPlaybackRate(localStorage.getItem(AUDIO_PLAYBACK_RATE_STORAGE_KEY));
}

function setAudioPlaybackRate(rate) {
  const normalized = normalizeAudioPlaybackRate(rate);
  localStorage.setItem(AUDIO_PLAYBACK_RATE_STORAGE_KEY, String(normalized));
  return normalized;
}

function getLocalDate() {
  const date = new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function getDefaultProgress() {
  return { version: STORAGE_VERSION, locale: "ru", currentLessonId: lessons[0].id, currentWord: 0, learnedWordIds: [], xpAwardedWordIds: [], attempts: 0, correctAnswers: 0, xp: 0, streak: 1, lastActiveDate: null, topicProgress: {} };
}

function normalizeWordIds(value) {
  return Array.isArray(value) ? [...new Set(value.filter((id) => allWords.some((word) => word.id === id)))] : [];
}

function normalizeStageProgress(saved) {
  const source = saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
  return {
    completed: source.completed === true,
    position: Number.isInteger(source.position) && source.position >= 0 ? source.position : 0,
    helpCount: Number.isInteger(source.helpCount) && source.helpCount >= 0 ? source.helpCount : 0,
    mode: source.mode === "listenArabic" ? "listenArabic" : "listenRead",
  };
}

function normalizeTopicProgress(saved) {
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};

  return Object.fromEntries(
    Object.entries(saved)
      .filter(([lessonId, value]) =>
        lessons.some((lesson) => lesson.id === lessonId) &&
        value &&
        typeof value === "object" &&
        !Array.isArray(value)
      )
      .map(([lessonId, value]) => {
        const currentStageId = LEARNING_STAGE_IDS.includes(value.currentStageId)
          ? value.currentStageId
          : LEARNING_STAGE_IDS[0];

        const sourceStages =
          value.stages &&
          typeof value.stages === "object" &&
          !Array.isArray(value.stages)
            ? value.stages
            : {};

        const stages = Object.fromEntries(
          LEARNING_STAGE_IDS.map((stageId) => [
            stageId,
            normalizeStageProgress(sourceStages[stageId]),
          ])
        );

        return [lessonId, { currentStageId, stages }];
      })
  );
}

function getOrCreateTopicProgress(progress, lessonId) {
  if (!lessons.some((lesson) => lesson.id === lessonId)) return null;

  if (
    !progress.topicProgress ||
    typeof progress.topicProgress !== "object" ||
    Array.isArray(progress.topicProgress)
  ) {
    progress.topicProgress = {};
  }

  const normalized = normalizeTopicProgress({
    [lessonId]:
      progress.topicProgress[lessonId] &&
      typeof progress.topicProgress[lessonId] === "object" &&
      !Array.isArray(progress.topicProgress[lessonId])
        ? progress.topicProgress[lessonId]
        : {},
  });

  progress.topicProgress[lessonId] = normalized[lessonId];
  return progress.topicProgress[lessonId];
}

function getTopicStageProgress(progress, lessonId, stageId) {
  if (!LEARNING_STAGE_IDS.includes(stageId)) return null;

  const topic = getOrCreateTopicProgress(progress, lessonId);
  return topic ? topic.stages[stageId] : null;
}

function setCurrentTopicStage(progress, lessonId, stageId) {
  if (!LEARNING_STAGE_IDS.includes(stageId)) return false;

  const topic = getOrCreateTopicProgress(progress, lessonId);
  if (!topic) return false;

  topic.currentStageId = stageId;
  return true;
}

function updateTopicStageProgress(progress, lessonId, stageId, patch) {
  if (!LEARNING_STAGE_IDS.includes(stageId)) return false;

  const topic = getOrCreateTopicProgress(progress, lessonId);
  if (!topic) return false;

  const sourcePatch =
    patch && typeof patch === "object" && !Array.isArray(patch)
      ? patch
      : {};

  topic.stages[stageId] = normalizeStageProgress({
    ...topic.stages[stageId],
    ...sourcePatch,
  });

  return true;
}

function normalizeProgress(saved) {
  const fallback = getDefaultProgress();
  const source = saved && typeof saved === "object" ? saved : {};
  const currentLessonId = lessons.some((lesson) => lesson.id === source.currentLessonId) ? source.currentLessonId : fallback.currentLessonId;
  const wordCount = lessons.find((lesson) => lesson.id === currentLessonId).words.length;
  return {
    ...fallback, ...source, version: STORAGE_VERSION, locale: source.locale === "uz" ? "uz" : "ru", currentLessonId, currentWord: Number.isInteger(source.currentWord) && source.currentWord >= 0 ? source.currentWord % wordCount : 0, learnedWordIds: normalizeWordIds(source.learnedWordIds), xpAwardedWordIds: normalizeWordIds(source.xpAwardedWordIds), attempts: Number.isFinite(source.attempts) && source.attempts >= 0 ? source.attempts : 0, correctAnswers: Number.isFinite(source.correctAnswers) && source.correctAnswers >= 0 ? source.correctAnswers : 0, xp: Number.isFinite(source.xp) && source.xp >= 0 ? source.xp : 0, streak: Number.isInteger(source.streak) && source.streak > 0 ? source.streak : 1, lastActiveDate: typeof source.lastActiveDate === "string" ? source.lastActiveDate : null, topicProgress: normalizeTopicProgress(source.topicProgress) };
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
