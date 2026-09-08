const LEARNING_STAGES = Object.freeze([
  Object.freeze({ id: "words", number: "01" }),
  Object.freeze({ id: "speak", number: "02" }),
  Object.freeze({ id: "expand", number: "03" }),
  Object.freeze({ id: "understand", number: "04" }),
  Object.freeze({ id: "dialogue", number: "05" }),
  Object.freeze({ id: "practice", number: "06" }),
]);

const LEARNING_STAGE_IDS = Object.freeze(LEARNING_STAGES.map((stage) => stage.id));

function normalizeLocalizedText(saved) {
  const source = saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
  return {
    ru: typeof source.ru === "string" ? source.ru : "",
    uz: typeof source.uz === "string" ? source.uz : "",
  };
}

function normalizeSpeechKeys(saved) {
  if (!Array.isArray(saved)) return [];

  return saved
    .filter((item) =>
      item &&
      typeof item === "object" &&
      !Array.isArray(item) &&
      typeof item.id === "string" &&
      item.id &&
      typeof item.arabic === "string" &&
      item.arabic
    )
    .map((item) => ({
      id: item.id,
      arabic: item.arabic,
      translations: normalizeLocalizedText(item.translations),
    }));
}

function normalizeSpeakItems(saved) {
  if (!Array.isArray(saved)) return [];

  return saved
    .filter((item) =>
      item &&
      typeof item === "object" &&
      !Array.isArray(item) &&
      typeof item.id === "string" &&
      item.id &&
      typeof item.arabic === "string" &&
      item.arabic
    )
    .map((item) => ({
      id: item.id,
      arabic: item.arabic,
      translations: normalizeLocalizedText(item.translations),
      speechKeyId: typeof item.speechKeyId === "string" && item.speechKeyId ? item.speechKeyId : null,
      chunks: Array.isArray(item.chunks) ? item.chunks.filter((chunk) => typeof chunk === "string" && chunk) : [],
    }));
}

function normalizeExpandItems(saved) {
  if (!Array.isArray(saved)) return [];

  return saved
    .filter((item) =>
      item &&
      typeof item === "object" &&
      !Array.isArray(item) &&
      typeof item.id === "string" &&
      item.id &&
      typeof item.arabic === "string" &&
      item.arabic
    )
    .map((item) => ({
      id: item.id,
      arabic: item.arabic,
      translations: normalizeLocalizedText(item.translations),
      baseSpeakId: typeof item.baseSpeakId === "string" && item.baseSpeakId ? item.baseSpeakId : null,
      addedArabic: typeof item.addedArabic === "string" && item.addedArabic ? item.addedArabic : "",
      chunks: Array.isArray(item.chunks) ? item.chunks.filter((chunk) => typeof chunk === "string" && chunk) : [],
    }));
}

function normalizeUnderstandItems(saved) {
  if (!Array.isArray(saved)) return [];

  return saved
    .filter((item) =>
      item &&
      typeof item === "object" &&
      !Array.isArray(item) &&
      typeof item.id === "string" &&
      item.id &&
      typeof item.questionArabic === "string" &&
      item.questionArabic &&
      typeof item.answerArabic === "string" &&
      item.answerArabic
    )
    .map((item) => ({
      id: item.id,
      questionArabic: item.questionArabic,
      questionTranslations: normalizeLocalizedText(item.questionTranslations),
      answerArabic: item.answerArabic,
      answerTranslations: normalizeLocalizedText(item.answerTranslations),
      answerChunks: Array.isArray(item.answerChunks) ? item.answerChunks.filter((chunk) => typeof chunk === "string" && chunk) : [],
    }));
}
