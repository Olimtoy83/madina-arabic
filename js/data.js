const lessons = [
  { id: "first-words", title: "Первые слова", description: "Полезные слова, с которых начинается знакомство с арабским.", words: [
    { id: 1, arabic: "كِتَابٌ", translation: "Книга", letters: ["ك", "ت", "ا", "ب"], audio: { src: null, expectedPath: "assets/audio/words/word-001.mp3" } }, { id: 2, arabic: "بَيْتٌ", translation: "Дом", letters: ["ب", "ي", "ت"], audio: { src: null, expectedPath: "assets/audio/words/word-002.mp3" } }, { id: 3, arabic: "قَلَمٌ", translation: "Ручка", letters: ["ق", "ل", "م"], audio: { src: null, expectedPath: "assets/audio/words/word-003.mp3" } }, { id: 4, arabic: "مَسْجِدٌ", translation: "Мечеть", letters: ["م", "س", "ج", "د"], audio: { src: null, expectedPath: "assets/audio/words/word-004.mp3" } }, { id: 5, arabic: "بَابٌ", translation: "Дверь", letters: ["ب", "ا", "ب"], audio: { src: null, expectedPath: "assets/audio/words/word-005.mp3" } }
  ] },
  { id: "people-and-family", title: "Люди и семья", description: "Базовые слова о самых близких людях.", words: [
    { id: 6, arabic: "أَبٌ", translation: "Отец", letters: ["أ", "ب"], audio: { src: null, expectedPath: "assets/audio/words/word-006.mp3" } }, { id: 7, arabic: "أُمٌّ", translation: "Мама", letters: ["أ", "م"], audio: { src: null, expectedPath: "assets/audio/words/word-007.mp3" } }, { id: 8, arabic: "أَخٌ", translation: "Брат", letters: ["أ", "خ"], audio: { src: null, expectedPath: "assets/audio/words/word-008.mp3" } }, { id: 9, arabic: "أُخْتٌ", translation: "Сестра", letters: ["أ", "خ", "ت"], audio: { src: null, expectedPath: "assets/audio/words/word-009.mp3" } }
  ] },
  { id: "everyday-things", title: "Вокруг нас", description: "Ещё несколько слов для повседневной жизни.", words: [
    { id: 10, arabic: "مَاءٌ", translation: "Вода", letters: ["م", "ا", "ء"], audio: { src: null, expectedPath: "assets/audio/words/word-010.mp3" } }, { id: 11, arabic: "شَمْسٌ", translation: "Солнце", letters: ["ش", "م", "س"], audio: { src: null, expectedPath: "assets/audio/words/word-011.mp3" } }, { id: 12, arabic: "قَمَرٌ", translation: "Луна", letters: ["ق", "م", "ر"], audio: { src: null, expectedPath: "assets/audio/words/word-012.mp3" } }
  ] }
];
const allWords = lessons.flatMap((lesson) => lesson.words);
