let currentWord = 0;

const arabicWord = document.getElementById("arabic-word");
const translation = document.getElementById("translation");
const progressCount = document.getElementById("progress-count");
const progressFill = document.getElementById("progress-fill");

function showWord() {

  arabicWord.textContent = words[currentWord].arabic;

  translation.textContent = words[currentWord].translation;

  progressCount.textContent =
    `${currentWord + 1} / ${words.length}`;

  const percent =
    ((currentWord + 1) / words.length) * 100;

  progressFill.style.width = percent + "%";

}

showWord();

const nextButton = document.getElementById("next-word");

nextButton.addEventListener("click", () => {

  currentWord++;

  if (currentWord >= words.length) {
    currentWord = 0;
  }

  showWord();

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


function openBuilder() {

  wordCard.hidden = true;

  builderCard.hidden = false;

  lettersContainer.innerHTML = "";

  answerSlots.innerHTML = "";

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

      answerSlots.prepend(slot);

      button.remove();

    });

    lettersContainer.appendChild(button);

  });

}

for (let i = 0; i < words[currentWord].letters.length; i++) {

  const slot = document.createElement("div");

  slot.className = "slot";

  answerSlots.appendChild(slot);

}

let selectedLetters = [];