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

const DIALOGUE_SPEAKERS = new Set(["interlocutor", "learner"]);

function normalizeDialogueAudio(saved) {
  if (saved == null) return {};
  if (!saved || typeof saved !== "object" || Array.isArray(saved) || typeof saved.expectedPath !== "string" || !saved.expectedPath || "src" in saved) return null;
  return { expectedPath: saved.expectedPath };
}

function normalizeDialogues(saved) {
  if (!Array.isArray(saved)) return [];

  const dialogues = saved.map((dialogue) => {
    if (!dialogue || typeof dialogue !== "object" || Array.isArray(dialogue) || typeof dialogue.id !== "string" || !dialogue.id || typeof dialogue.context !== "string" || !dialogue.context || !Array.isArray(dialogue.turns) || !dialogue.turns.length) return null;
    const translations = normalizeLocalizedText(dialogue.translations);
    if (!translations.ru || !translations.uz) return null;

    const turns = dialogue.turns.map((turn) => {
      if (!turn || typeof turn !== "object" || Array.isArray(turn) || typeof turn.id !== "string" || !turn.id || !DIALOGUE_SPEAKERS.has(turn.speaker) || typeof turn.arabic !== "string" || !turn.arabic) return null;
      const turnTranslations = normalizeLocalizedText(turn.translations), audio = normalizeDialogueAudio(turn.audio);
      return turnTranslations.ru && turnTranslations.uz && audio !== null ? { id: turn.id, speaker: turn.speaker, arabic: turn.arabic, translations: turnTranslations, audio } : null;
    });

    if (turns.some((turn) => turn === null) || new Set(turns.map((turn) => turn.id)).size !== turns.length || new Set(turns.map((turn) => turn.audio.expectedPath).filter(Boolean)).size !== turns.filter((turn) => turn.audio.expectedPath).length) return null;
    return { id: dialogue.id, context: dialogue.context, translations, turns };
  });

  const accepted = [], dialogueIds = new Set(), turnIds = new Set(), audioPaths = new Set();
  dialogues.filter((dialogue) => dialogue !== null).forEach((dialogue) => {
    const dialogueTurnIds = dialogue.turns.map((turn) => turn.id), dialogueAudioPaths = dialogue.turns.map((turn) => turn.audio.expectedPath).filter(Boolean);
    if (dialogueIds.has(dialogue.id) || dialogueTurnIds.some((id) => turnIds.has(id)) || dialogueAudioPaths.some((path) => audioPaths.has(path))) return;
    dialogueIds.add(dialogue.id); dialogueTurnIds.forEach((id) => turnIds.add(id)); dialogueAudioPaths.forEach((path) => audioPaths.add(path)); accepted.push(dialogue);
  });
  return accepted;
}

function normalizeUnderstandChoices(saved) {
  if (!Array.isArray(saved) || saved.length !== 3) return [];
  if (!saved.every((choice) => choice && typeof choice === "object" && !Array.isArray(choice) && typeof choice.id === "string" && choice.id && typeof choice.arabic === "string" && choice.arabic && typeof choice.correct === "boolean")) return [];

  const choices = saved.map((choice) => ({
    id: choice.id,
    arabic: choice.arabic,
    correct: choice.correct,
  }));

  return choices.filter((choice) => choice.id && choice.arabic).length === 3 &&
    new Set(choices.map((choice) => choice.id)).size === 3 &&
    new Set(choices.map((choice) => choice.arabic)).size === 3 &&
    choices.filter((choice) => choice.correct).length === 1
      ? choices
      : [];
}

function normalizeUnderstandBuild(saved, answerArabic, answerChunks) {
  if (!saved || typeof saved !== "object" || Array.isArray(saved) || !Array.isArray(saved.answerChunkIds) || !saved.answerChunkIds.length || !Array.isArray(saved.chunks)) return null;
  if (!saved.answerChunkIds.every((id) => typeof id === "string" && id) || !saved.chunks.every((chunk) => chunk && typeof chunk === "object" && !Array.isArray(chunk) && typeof chunk.id === "string" && chunk.id && typeof chunk.arabic === "string" && chunk.arabic)) return null;

  const chunks = saved.chunks.map((chunk) => ({ id: chunk.id, arabic: chunk.arabic }));
  if (new Set(chunks.map((chunk) => chunk.id)).size !== chunks.length || new Set(chunks.map((chunk) => chunk.arabic)).size !== chunks.length || new Set(saved.answerChunkIds).size !== saved.answerChunkIds.length) return null;

  const chunksById = new Map(chunks.map((chunk) => [chunk.id, chunk]));
  const canonicalChunks = saved.answerChunkIds.map((id) => chunksById.get(id));
  if (canonicalChunks.some((chunk) => !chunk)) return null;

  const canonicalArabic = canonicalChunks.map((chunk) => chunk.arabic);
  return canonicalArabic.join(" ") === answerArabic &&
    canonicalArabic.length === answerChunks.length &&
    canonicalArabic.every((chunk, index) => chunk === answerChunks[index])
      ? { answerChunkIds: [...saved.answerChunkIds], chunks }
      : null;
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
    .map((item) => {
      const answerChunks = Array.isArray(item.answerChunks) ? item.answerChunks.filter((chunk) => typeof chunk === "string" && chunk) : [];
      return {
        id: item.id,
        questionArabic: item.questionArabic,
        questionTranslations: normalizeLocalizedText(item.questionTranslations),
        answerArabic: item.answerArabic,
        answerTranslations: normalizeLocalizedText(item.answerTranslations),
        answerChunks,
        questionAudio: (() => { const audio=item.questionAudio&&typeof item.questionAudio==="object"&&!Array.isArray(item.questionAudio)?item.questionAudio:{};return {...(typeof audio.src==="string"&&audio.src?{src:audio.src}:{}),...(typeof audio.expectedPath==="string"&&audio.expectedPath?{expectedPath:audio.expectedPath}:{})}; })(),
        choices: normalizeUnderstandChoices(item.choices),
        build: normalizeUnderstandBuild(item.build, item.answerArabic, answerChunks),
      };
    });
}
