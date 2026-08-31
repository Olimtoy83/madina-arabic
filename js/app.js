let progress = loadProgress();
let selectedLetters = [];
let builderCompleted = false;

const homeScreen = document.getElementById("home-screen");
const lessonScreen = document.getElementById("lesson-screen");
const wordCard = document.getElementById("word-card");
const builderCard = document.getElementById("builder-card");
const lessonList = document.getElementById("lesson-list");
const arabicWord = document.getElementById("arabic-word");
const translation = document.getElementById("translation");
const lessonProgressCount = document.getElementById("lesson-progress-count");
const lessonProgressFill = document.getElementById("lesson-progress-fill");
const streakCount = document.getElementById("streak-count");
const xpCount = document.getElementById("xp-count");
const lettersContainer = document.getElementById("letters");
const answerSlots = document.getElementById("answer-slots");
const feedback = document.getElementById("builder-feedback");
const checkAnswerButton = document.getElementById("check-answer");
const playAudioButton = document.getElementById("play-audio");
const audioButtonLabel = document.getElementById("audio-button-label");
const audioStatus = document.getElementById("audio-status");
const greetingName = document.getElementById("greeting-name");
const audioController = new AudioPlaybackController(setAudioState);

function getCurrentLesson() { return lessons.find((lesson) => lesson.id === progress.currentLessonId) || lessons[0]; }
function getCurrentWord() { const lesson = getCurrentLesson(); if (progress.currentWord >= lesson.words.length) progress.currentWord = 0; return lesson.words[progress.currentWord]; }
function getMasteredWords(words) { return words.filter((word) => progress.learnedWordIds.includes(word.id)).length; }
function showScreen(screen) { homeScreen.hidden = screen !== "home"; lessonScreen.hidden = screen !== "lesson"; }
function renderHeader() { streakCount.textContent = progress.streak; xpCount.textContent = progress.xp; }

function setAudioState(state) {
  const word = getCurrentWord();
  const hasAudio = Boolean(word.audio && word.audio.src);
  audioStatus.className = "audio-status";

  if (!hasAudio || state === "missing") {
    playAudioButton.disabled = true;
    audioButtonLabel.textContent = "Произношение скоро";
    audioStatus.textContent = "Проверенная запись для этого слова ещё не добавлена.";
    return;
  }

  playAudioButton.disabled = state === "loading";
  if (state === "loading") {
    audioButtonLabel.textContent = "Загрузка…";
    audioStatus.textContent = "";
  } else if (state === "playing") {
    audioButtonLabel.textContent = "Повторить произношение";
    audioStatus.textContent = "Воспроизводится запись.";
  } else if (state === "error") {
    audioButtonLabel.textContent = "Попробовать ещё раз";
    audioStatus.textContent = "Не удалось загрузить запись. Попробуйте ещё раз позже.";
    audioStatus.classList.add("is-error");
  } else {
    audioButtonLabel.textContent = "Прослушать произношение";
    audioStatus.textContent = "";
  }
}

function renderAudioControl(word) {
  audioController.stop();
  setAudioState(word.audio && word.audio.src ? "idle" : "missing");
}

function renderHome() {
  audioController.stop();
  const user = getTelegramUser();
  greetingName.hidden = !user || !user.first_name;
  greetingName.textContent = user && user.first_name ? `, ${user.first_name}!` : "";
  const mastered = getMasteredWords(allWords);
  document.getElementById("overall-progress").textContent = `${mastered} / ${allWords.length} слов`;
  document.getElementById("overall-progress-fill").style.width = `${(mastered / allWords.length) * 100}%`;
  document.getElementById("streak-description").textContent = `Серия: ${progress.streak} ${progress.streak === 1 ? "день" : "дней"}`;
  document.getElementById("lesson-count").textContent = `${lessons.length} урока`;
  document.getElementById("continue-lesson").textContent = `Продолжить: ${getCurrentLesson().title}`;
  lessonList.innerHTML = "";
  lessons.forEach((lesson, index) => {
    const masteredInLesson = getMasteredWords(lesson.words);
    const button = document.createElement("button");
    button.className = "lesson-card"; button.type = "button";
    button.innerHTML = `<span class="lesson-number">Урок ${index + 1}</span><strong>${lesson.title}</strong><span>${lesson.description}</span><span class="lesson-card-progress">${masteredInLesson} / ${lesson.words.length} слов</span>`;
    button.addEventListener("click", () => openLesson(lesson.id)); lessonList.appendChild(button);
  });
  renderHeader();
}

function openLesson(lessonId) {
  const lesson = lessons.find((item) => item.id === lessonId) || lessons[0];
  const changesLesson = progress.currentLessonId !== lesson.id;
  progress.currentLessonId = lesson.id;
  progress.currentWord = changesLesson ? 0 : Math.min(progress.currentWord, lesson.words.length - 1);
  saveProgress(progress);
  showScreen("lesson"); renderLesson();
}

function renderLesson() {
  const lesson = getCurrentLesson(); const word = getCurrentWord(); const mastered = getMasteredWords(lesson.words);
  document.getElementById("lesson-kicker").textContent = `Урок ${lessons.indexOf(lesson) + 1}`;
  document.getElementById("lesson-title").textContent = lesson.title; document.getElementById("lesson-description").textContent = lesson.description;
  lessonProgressCount.textContent = `${mastered} / ${lesson.words.length} слов`; lessonProgressFill.style.width = `${(mastered / lesson.words.length) * 100}%`;
  document.getElementById("word-position").textContent = `Слово ${progress.currentWord + 1} из ${lesson.words.length}`;
  arabicWord.textContent = word.arabic; translation.textContent = word.translation;
  renderAudioControl(word);
  builderCard.hidden = true; wordCard.hidden = false; document.getElementById("learning-actions").hidden = false; renderHeader();
}

function openBuilder() { wordCard.hidden = true; builderCard.hidden = false; document.getElementById("learning-actions").hidden = true; renderBuilder(); }
function renderBuilder() {
  const word = getCurrentWord(); selectedLetters = []; builderCompleted = false; lettersContainer.innerHTML = ""; answerSlots.innerHTML = "";
  feedback.textContent = "Выберите буквы в правильном порядке."; feedback.className = "builder-feedback"; checkAnswerButton.disabled = true; checkAnswerButton.textContent = "Проверить";
  [...word.letters].sort(() => Math.random() - 0.5).forEach((letter) => {
    const button = document.createElement("button"); button.className = "letter-button"; button.type = "button"; button.textContent = letter;
    button.addEventListener("click", () => { selectedLetters.push(letter); const slot = document.createElement("span"); slot.className = "slot"; slot.textContent = letter; answerSlots.appendChild(slot); button.remove(); checkAnswerButton.disabled = selectedLetters.length !== word.letters.length; });
    lettersContainer.appendChild(button);
  });
}

function awardWordCompletion(word) {
  recordLearningActivity(progress);
  if (!progress.learnedWordIds.includes(word.id)) progress.learnedWordIds.push(word.id);
  if (!progress.xpAwardedWordIds.includes(word.id)) { progress.xpAwardedWordIds.push(word.id); progress.xp += 10; }
  saveProgress(progress);
}

function checkAnswer() {
  if (builderCompleted) { goToNextWord(); return; }
  const word = getCurrentWord(); progress.attempts += 1;
  if (selectedLetters.join("") === word.letters.join("")) { progress.correctAnswers += 1; awardWordCompletion(word); feedback.textContent = "Верно! +10 XP за новое освоенное слово."; feedback.className = "builder-feedback is-success"; checkAnswerButton.textContent = "Следующее слово"; builderCompleted = true; }
  else { saveProgress(progress); feedback.textContent = `Почти. Правильно: ${word.arabic}`; feedback.className = "builder-feedback is-error"; }
  renderHeader();
}

function markCurrentWordKnown() { awardWordCompletion(getCurrentWord()); goToNextWord(); }
function goToNextWord() { const lesson = getCurrentLesson(); progress.currentWord = (progress.currentWord + 1) % lesson.words.length; saveProgress(progress); renderLesson(); }

document.getElementById("home-button").addEventListener("click", () => { showScreen("home"); renderHome(); });
document.getElementById("back-to-home").addEventListener("click", () => { showScreen("home"); renderHome(); });
document.getElementById("continue-lesson").addEventListener("click", () => openLesson(progress.currentLessonId));
document.getElementById("next-word").addEventListener("click", markCurrentWordKnown);
document.getElementById("repeat-word").addEventListener("click", openBuilder);
document.getElementById("start-builder").addEventListener("click", openBuilder);
document.getElementById("reset-answer").addEventListener("click", renderBuilder);
playAudioButton.addEventListener("click", () => audioController.play(getCurrentWord().audio && getCurrentWord().audio.src));
checkAnswerButton.addEventListener("click", checkAnswer);
renderHome();
