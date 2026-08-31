let progress = loadProgress();
let currentWord = Math.min(progress.currentWord, words.length - 1);
let selectedLetters = [];

const arabicWord = document.getElementById("arabic-word");
const translation = document.getElementById("translation");
const progressCount = document.getElementById("progress-count");
const progressFill = document.getElementById("progress-fill");
const streakCount = document.getElementById("streak-count");
const dayCount = document.getElementById("day-count");

function showWord() {

  arabicWord.textContent = words[currentWord].arabic;

  translation.textContent = words[currentWord].translation;

  const learnedCount = progress.learnedWordIds.length;

  progressCount.textContent = `Освоено ${learnedCount} / ${words.length}`;

  const percent = (learnedCount / words.length) * 100;

  progressFill.style.width = percent + "%";
  streakCount.textContent = progress.streak;
  dayCount.textContent = `Серия ${progress.streak} дн.`;

}

touchProgress(progress);
showWord();

const nextButton = document.getElementById("next-word");

nextButton.addEventListener("click", () => {

  markCurrentWordLearned();
  goToNextWord();

});

const startBuilderButton =
  document.getElementById("start-builder");

const wordCard =
  document.querySelector(".word-card");

const builderCard =
  document.getElementById("builder-card");

const lettersContainer =
  document.querySelector(".letters");

const answerSlots =
  document.querySelector(".answer-slots");

startBuilderButton.addEventListener("click", openBuilder);
document.getElementById("repeat-word").addEventListener("click", openBuilder);
document.getElementById("reset-answer").addEventListener("click", renderBuilder);
document.getElementById("check-answer").addEventListener("click", checkAnswer);


function openBuilder() {

  wordCard.hidden = true;

  builderCard.hidden = false;

  renderBuilder();

}

function renderBuilder() {

  lettersContainer.innerHTML = "";

  answerSlots.innerHTML = "";

  selectedLetters = [];

  const feedback = document.getElementById("builder-feedback");
  const checkAnswerButton = document.getElementById("check-answer");
  feedback.textContent = "Выбери буквы по порядку.";
  feedback.className = "builder-feedback";
  checkAnswerButton.disabled = true;
  checkAnswerButton.dataset.completed = "false";
  checkAnswerButton.textContent = "Проверить";

  const letters = [...words[currentWord].letters];

  letters.sort(() => Math.random() - 0.5);

  letters.forEach(letter => {

    const button = document.createElement("button");

    button.textContent = letter;

    button.className = "letter-btn";

    button.addEventListener("click", () => {

      const slot = document.createElement("div");

      slot.className = "slot";

      slot.textContent = letter;

      selectedLetters.push(letter);

      answerSlots.appendChild(slot);

      button.remove();

      checkAnswerButton.disabled = selectedLetters.length !== words[currentWord].letters.length;

    });

    lettersContainer.appendChild(button);

  });

}

function checkAnswer() {
  const checkAnswerButton = document.getElementById("check-answer");

  if (checkAnswerButton.dataset.completed === "true") {
    goToNextWord();
    return;
  }

  progress.attempts += 1;
  const expected = words[currentWord].letters.join("");
  const feedback = document.getElementById("builder-feedback");

  if (selectedLetters.join("") === expected) {
    progress.correctAnswers += 1;
    markCurrentWordLearned();
    feedback.textContent = "Верно! Отличная работа ✨";
    feedback.className = "builder-feedback is-success";
    checkAnswerButton.textContent = "Следующее слово";
    checkAnswerButton.dataset.completed = "true";
  } else {
    saveProgress(progress);
    feedback.textContent = `Почти. Правильно: ${words[currentWord].arabic}`;
    feedback.className = "builder-feedback is-error";
  }

  showWord();
}

function markCurrentWordLearned() {
  const wordId = words[currentWord].id;

  if (!progress.learnedWordIds.includes(wordId)) {
    progress.learnedWordIds.push(wordId);
  }

  saveProgress(progress);
}

function goToNextWord() {
  currentWord = (currentWord + 1) % words.length;
  progress.currentWord = currentWord;
  saveProgress(progress);
  builderCard.hidden = true;
  wordCard.hidden = false;
  showWord();
}
