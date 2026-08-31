const lessons = [
  { id: "first-words", title: "Первые слова", description: "Полезные слова, с которых начинается знакомство с арабским.", words: [
    { id: 1, arabic: "كِتَابٌ", translation: "Книга", letters: ["ك", "ت", "ا", "ب"] }, { id: 2, arabic: "بَيْتٌ", translation: "Дом", letters: ["ب", "ي", "ت"] }, { id: 3, arabic: "قَلَمٌ", translation: "Ручка", letters: ["ق", "ل", "م"] }, { id: 4, arabic: "مَسْجِدٌ", translation: "Мечеть", letters: ["م", "س", "ج", "د"] }, { id: 5, arabic: "بَابٌ", translation: "Дверь", letters: ["ب", "ا", "ب"] }
  ] },
  { id: "people-and-family", title: "Люди и семья", description: "Базовые слова о самых близких людях.", words: [
    { id: 6, arabic: "أَبٌ", translation: "Отец", letters: ["أ", "ب"] }, { id: 7, arabic: "أُمٌّ", translation: "Мама", letters: ["أ", "م"] }, { id: 8, arabic: "أَخٌ", translation: "Брат", letters: ["أ", "خ"] }, { id: 9, arabic: "أُخْتٌ", translation: "Сестра", letters: ["أ", "خ", "ت"] }
  ] },
  { id: "everyday-things", title: "Вокруг нас", description: "Ещё несколько слов для повседневной жизни.", words: [
    { id: 10, arabic: "مَاءٌ", translation: "Вода", letters: ["م", "ا", "ء"] }, { id: 11, arabic: "شَمْسٌ", translation: "Солнце", letters: ["ش", "م", "س"] }, { id: 12, arabic: "قَمَرٌ", translation: "Луна", letters: ["ق", "م", "ر"] }
  ] }
];
const allWords = lessons.flatMap((lesson) => lesson.words);
