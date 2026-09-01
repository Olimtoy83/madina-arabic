const lessons = [
  { id: "first-words", titles: { ru: "Первые слова", uz: "Birinchi so‘zlar" }, descriptions: { ru: "Полезные слова, с которых начинается знакомство с арабским.", uz: "Arab tili bilan tanishishni boshlash uchun foydali so‘zlar." }, words: [
    [1,"كِتَابٌ","Книга","Kitob",["ك","ت","ا","ب"]], [2,"بَيْتٌ","Дом","Uy",["ب","ي","ت"]], [3,"قَلَمٌ","Ручка","Qalam",["ق","ل","م"]], [4,"مَسْجِدٌ","Мечеть","Masjid",["م","س","ج","د"]], [5,"بَابٌ","Дверь","Eshik",["ب","ا","ب"]]
  ] },
  { id: "people-and-family", titles: { ru: "Люди и семья", uz: "Odamlar va oila" }, descriptions: { ru: "Базовые слова о самых близких людях.", uz: "Eng yaqin insonlar haqidagi asosiy so‘zlar." }, words: [
    [6,"أَبٌ","Отец","Ota",["أ","ب"]], [7,"أُمٌّ","Мама","Ona",["أ","م"]], [8,"أَخٌ","Брат","Aka / uka",["أ","خ"]], [9,"أُخْتٌ","Сестра","Opa / singil",["أ","خ","ت"]]
  ] },
  { id: "everyday-things", titles: { ru: "Вокруг нас", uz: "Atrofimizda" }, descriptions: { ru: "Ещё несколько слов для повседневной жизни.", uz: "Kundalik hayot uchun yana bir nechta so‘z." }, words: [
    [10,"مَاءٌ","Вода","Suv",["م","ا","ء"]], [11,"شَمْسٌ","Солнце","Quyosh",["ش","م","س"]], [12,"قَمَرٌ","Луна","Oy",["ق","م","ر"]]
  ] },
  { id: "polite-words", titles: { ru: "Вежливые слова", uz: "Xushmuomala so‘zlar" }, descriptions: { ru: "Короткие слова для приветствия и вежливого общения.", uz: "Salomlashish va xushmuomala suhbat uchun qisqa so‘zlar." }, words: [
    [13,"نَعَمْ","Да","Ha",["ن","ع","م"],true], [14,"لَا","Нет","Yo‘q",["ل","ا"],true], [15,"شُكْرًا","Спасибо","Rahmat",["ش","ك","ر","ا"],true], [16,"مَرْحَبًا","Здравствуйте","Salom",["م","ر","ح","ب","ا"],true]
  ] },
  { id: "introductions", titles: { ru: "Знакомство", uz: "Tanishuv" }, descriptions: { ru: "Слова, чтобы представиться и спросить имя.", uz: "O‘zingizni tanishtirish va ism so‘rash uchun so‘zlar." }, words: [
    [17,"أَنَا","Я","Men",["أ","ن","ا"],true], [18,"أَنْتَ","Ты (м.)","Sen",["أ","ن","ت"],true], [19,"مَنْ","Кто?","Kim?",["م","ن"],true], [20,"اِسْمِي","Моё имя","Mening ismim",["ا","س","م","ي"],true], [21,"اِسْمٌ","Имя","Ism",["ا","س","م"],true], [22,"صَدِيقٌ","Друг","Do‘st",["ص","د","ي","ق"],true]
  ] },
  { id: "numbers-one-to-five", titles: { ru: "Числа 1–5", uz: "1–5 sonlari" }, descriptions: { ru: "Первые числа для счёта в повседневных ситуациях.", uz: "Kundalik holatlarda sanash uchun dastlabki sonlar." }, words: [
    [23,"وَاحِدٌ","Один","Bir",["و","ا","ح","د"],true], [24,"اِثْنَانِ","Два","Ikki",["ا","ث","ن","ا","ن"],true], [25,"ثَلَاثَةٌ","Три","Uch",["ث","ل","ا","ث","ة"],true], [26,"أَرْبَعَةٌ","Четыре","To‘rt",["أ","ر","ب","ع","ة"],true], [27,"خَمْسَةٌ","Пять","Besh",["خ","م","س","ة"],true]
  ] },
  { id: "home-and-rooms", titles: { ru: "Дом и комнаты", uz: "Uy va xonalar" }, descriptions: { ru: "Слова для описания дома и предметов в нём.", uz: "Uy va undagi buyumlarni tasvirlash uchun so‘zlar." }, words: [
    [28,"غُرْفَةٌ","Комната","Xona",["غ","ر","ف","ة"],true], [29,"مَطْبَخٌ","Кухня","Oshxona",["م","ط","ب","خ"],true], [30,"نَافِذَةٌ","Окно","Deraza",["ن","ا","ف","ذ","ة"],true], [31,"كُرْسِيٌّ","Стул","Stul",["ك","ر","س","ي"],true], [32,"سَرِيرٌ","Кровать","Karavot",["س","ر","ي","ر"],true]
  ] },
  { id: "food-and-drinks", titles: { ru: "Еда и напитки", uz: "Ovqat va ichimliklar" }, descriptions: { ru: "Повседневные слова для еды и напитков.", uz: "Ovqat va ichimliklar uchun kundalik so‘zlar." }, words: [
    [33,"مَاءٌ","Вода","Suv",["م","ا","ء"]], [34,"خُبْزٌ","Хлеб","Non",["خ","ب","ز"]], [35,"حَلِيبٌ","Молоко","Sut",["ح","ل","ي","ب"]], [36,"شَايٌ","Чай","Choy",["ش","ا","ي"]], [37,"طَعَامٌ","Еда","Ovqat",["ط","ع","ا","م"]]
  ] },
  { id: "family", titles: { ru: "Семья", uz: "Oila" }, descriptions: { ru: "Слова о семье и близких людях.", uz: "Oila va yaqin insonlar haqidagi so‘zlar." }, words: [
    [38,"أَبٌ","Отец","Ota",["أ","ب"]], [39,"أُمٌّ","Мать","Ona",["أ","م"]], [40,"أَخٌ","Брат","Aka / uka",["أ","خ"]], [41,"أُخْتٌ","Сестра","Opa / singil",["أ","خ","ت"]], [42,"أُسْرَةٌ","Семья","Oila",["أ","س","ر","ة"]]
  ] },
  { id: "clothing", titles: { ru: "Одежда", uz: "Kiyimlar" }, descriptions: { ru: "Слова для одежды и головных уборов.", uz: "Kiyim va bosh kiyimlar uchun so‘zlar." }, words: [
    [43,"ثَوْبٌ","Одежда / тоб","Kiyim / to‘n",["ث","و","ب"]], [44,"قَمِيصٌ","Рубашка","Ko‘ylak",["ق","م","ي","ص"]], [45,"حِذَاءٌ","Обувь","Oyoq kiyim",["ح","ذ","ا","ء"]], [46,"سِرْوَالٌ","Брюки","Shim",["س","ر","و","ا","ل"]], [47,"قُبَّعَةٌ","Головной убор / шапка","Bosh kiyim",["ق","ب","ع","ة"]]
  ] },
  { id: "places-and-city", titles: { ru: "Места и город", uz: "Joylar va shahar" }, descriptions: { ru: "Полезные места в городе.", uz: "Shahardagi foydali joylar." }, words: [
    [48,"مَسْجِدٌ","Мечеть","Masjid",["م","س","ج","د"]], [49,"سُوقٌ","Рынок","Bozor",["س","و","ق"]], [50,"مَطْعَمٌ","Ресторан","Restoran",["م","ط","ع","م"]], [51,"مُسْتَشْفًى","Больница","Kasalxona",["م","س","ت","ش","ف","ى"]], [52,"مَدْرَسَةٌ","Школа","Maktab",["م","د","ر","س","ة"]]
  ] }
].map((lesson) => ({ ...lesson, words: lesson.words.map(([id, arabic, ru, uz, letters, hasAudio = true]) => { const path = `assets/audio/words/word-${String(id).padStart(3, "0")}.mp3`; return { id, arabic, translations: { ru, uz }, letters, audio: hasAudio ? { src: path, expectedPath: path } : {} }; }) }));
const allWords = lessons.flatMap((lesson) => lesson.words);
