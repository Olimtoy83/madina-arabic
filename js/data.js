const lessons = [
  { id: "first-words", titles: { ru: "Первые слова", uz: "Birinchi so‘zlar" }, descriptions: { ru: "Полезные слова, с которых начинается знакомство с арабским.", uz: "Arab tili bilan tanishishni boshlash uchun foydali so‘zlar." }, words: [
    [1,"كِتَابٌ","Книга","Kitob",["ك","ت","ا","ب"]], [2,"بَيْتٌ","Дом","Uy",["ب","ي","ت"]], [3,"قَلَمٌ","Ручка","Qalam",["ق","ل","م"]], [4,"مَسْجِدٌ","Мечеть","Masjid",["م","س","ج","د"]], [5,"بَابٌ","Дверь","Eshik",["ب","ا","ب"]]
  ] },
  { id: "people-and-family", titles: { ru: "Люди и семья", uz: "Odamlar va oila" }, descriptions: { ru: "Базовые слова о самых близких людях.", uz: "Eng yaqin insonlar haqidagi asosiy so‘zlar." }, words: [
    [6,"أَبٌ","Отец","Ota",["أ","ب"]], [7,"أُمٌّ","Мама","Ona",["أ","م"]], [8,"أَخٌ","Брат","Aka / uka",["أ","خ"]], [9,"أُخْتٌ","Сестра","Opa / singil",["أ","خ","ت"]]
  ] },
  { id: "everyday-things", titles: { ru: "Вокруг нас", uz: "Atrofimizda" }, descriptions: { ru: "Ещё несколько слов для повседневной жизни.", uz: "Kundalik hayot uchun yana bir nechta so‘z." }, words: [
    [10,"مَاءٌ","Вода","Suv",["م","ا","ء"]], [11,"شَمْسٌ","Солнце","Quyosh",["ش","م","س"]], [12,"قَمَرٌ","Луна","Oy",["ق","م","ر"]]
  ] }
].map((lesson) => ({ ...lesson, words: lesson.words.map(([id, arabic, ru, uz, letters]) => { const path = `assets/audio/words/word-${String(id).padStart(3, "0")}.mp3`; return { id, arabic, translations: { ru, uz }, letters, audio: { src: path, expectedPath: path } }; }) }));
const allWords = lessons.flatMap((lesson) => lesson.words);
