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
  ] },
{ id: "shop-and-shopping", titles: { ru: "Магазин и покупки", uz: "Do‘kon va xaridlar" }, descriptions: { ru: "Практические слова для магазина, рынка, оплаты и покупок.", uz: "Do‘kon, bozor, to‘lov va xaridlar uchun amaliy so‘zlar." }, words: [
[53,"مَتْجَر","Магазин","Do‘kon",["م","ت","ج","ر"],true,"assets/images/03A/01.jpg"],
[54,"سُوق","Рынок","Bozor",["س","و","ق"],true,"assets/images/03A/02.jpg"],
[55,"مُنْتَج","Товар","Mahsulot",["م","ن","ت","ج"],true,"assets/images/03A/03.jpg"],
[56,"سِعْر","Цена","Narx",["س","ع","ر"],true,"assets/images/03A/04.jpg"],
[57,"خَصْم","Скидка","Chegirma",["خ","ص","م"],true,"assets/images/03A/05.jpg"],
[58,"عَرْض","Акция / предложение","Aksiya / taklif",["ع","ر","ض"],true,"assets/images/03A/06.jpg"],
[59,"فَاتُورَة","Счёт / чек","Hisob / chek",["ف","ا","ت","و","ر","ة"],true,"assets/images/03A/07.jpg"],
[60,"كَاشِير","Кассир","Kassir",["ك","ا","ش","ي","ر"],true,"assets/images/03A/08.jpg"],
[61,"عَرَبَة تَسَوُّق","Тележка","Xarid aravachasi",["ع","ر","ب","ة","ت","س","و","ق"],true,"assets/images/03A/09.jpg"],
[62,"سَلَّة","Корзина","Savat",["س","ل","ة"],true,"assets/images/03A/10.jpg"],
[63,"كِيس","Пакет","Paket",["ك","ي","س"],true,"assets/images/03A/11.jpg"],
[64,"مِيزَان","Весы","Tarozi",["م","ي","ز","ا","ن"],true,"assets/images/03A/12.jpg"],
[65,"كِيلُو","Килограмм","Kilogramm",["ك","ي","ل","و"],true,"assets/images/03A/13.jpg"],
[66,"حَبَّة","Штука","Dona",["ح","ب","ة"],true,"assets/images/03A/14.jpg"],
[67,"مَقَاس","Размер","O‘lcham",["م","ق","ا","س"],true,"assets/images/03A/15.jpg"],
[68,"نَقْد","Наличные","Naqd pul",["ن","ق","د"],true,"assets/images/03A/16.jpg"],
[69,"بِطَاقَة","Карта","Karta",["ب","ط","ا","ق","ة"],true,"assets/images/03A/17.jpg"],
[70,"دَفْع","Оплата","To‘lov",["د","ف","ع"],true,"assets/images/03A/18.jpg"],
[71,"رِيَال","Риял","Riyol",["ر","ي","ا","ل"],true,"assets/images/03A/19.jpg"],
[72,"بَاقِي","Сдача","Qaytim",["ب","ا","ق","ي"],true,"assets/images/03A/20.jpg"]
], speechKeys: [
{ id: "price", arabic: "بِكَم ...؟", translations: { ru: "Сколько стоит ...?", uz: "... qancha turadi?" } },
{ id: "available", arabic: "فِيه ...؟", translations: { ru: "Есть ...?", uz: "... bormi?" } },
{ id: "want", arabic: "أَبْغَى ...", translations: { ru: "Я хочу / мне ...", uz: "Men ... xohlayman / menga ... kerak" } },
{ id: "have", arabic: "عِنْدَك ...؟", translations: { ru: "У тебя / у вас есть ...?", uz: "Sizda ... bormi?" } },
{ id: "pay", arabic: "بَدْفَع ...", translations: { ru: "Я оплачу ...", uz: "Men ... bilan to‘layman" } },
{ id: "where", arabic: "وَيْن ...؟", translations: { ru: "Где ...?", uz: "... qayerda?" } }
], speak: [
{ id: "03A-S01", arabic: "بِكَم هَذَا؟", translations: { ru: "Сколько это стоит?", uz: "Bu qancha turadi?" }, speechKeyId: "price", chunks: ["بِكَم", "هَذَا؟"] },
{ id: "03A-S02", arabic: "فِيه خَصْم؟", translations: { ru: "Есть скидка?", uz: "Chegirma bormi?" }, speechKeyId: "available", chunks: ["فِيه", "خَصْم؟"] },
{ id: "03A-S03", arabic: "أَبْغَى هَذَا", translations: { ru: "Я хочу это", uz: "Men buni xohlayman" }, speechKeyId: "want", chunks: ["أَبْغَى", "هَذَا"] },
{ id: "03A-S04", arabic: "أَبْغَى هَذِي", translations: { ru: "Я хочу это (ж.р.)", uz: "Men buni xohlayman" }, speechKeyId: "want", chunks: ["أَبْغَى", "هَذِي"] },
{ id: "03A-S05", arabic: "عِنْدَك مَقَاس أَكْبَر؟", translations: { ru: "Есть размер побольше?", uz: "Kattaroq o‘lcham bormi?" }, speechKeyId: "have", chunks: ["عِنْدَك", "مَقَاس", "أَكْبَر؟"] },
{ id: "03A-S06", arabic: "عِنْدَك مَقَاس أَصْغَر؟", translations: { ru: "Есть размер поменьше?", uz: "Kichikroq o‘lcham bormi?" }, speechKeyId: "have", chunks: ["عِنْدَك", "مَقَاس", "أَصْغَر؟"] },
{ id: "03A-S07", arabic: "أَبْغَى كِيلُو مِن هَذَا", translations: { ru: "Мне килограмм этого", uz: "Menga bundan bir kilogramm kerak" }, speechKeyId: "want", chunks: ["أَبْغَى", "كِيلُو", "مِن", "هَذَا"] },
{ id: "03A-S08", arabic: "أَبْغَى حَبَّة وَاحْدَة", translations: { ru: "Мне одну штуку", uz: "Menga bittasi kerak" }, speechKeyId: "want", chunks: ["أَبْغَى", "حَبَّة", "وَاحْدَة"] },
{ id: "03A-S09", arabic: "أَبْغَى كِيس", translations: { ru: "Мне пакет", uz: "Menga paket kerak" }, speechKeyId: "want", chunks: ["أَبْغَى", "كِيس"] },
{ id: "03A-S10", arabic: "بَدْفَع بِالْبِطَاقَة", translations: { ru: "Я оплачу картой", uz: "Karta bilan to‘layman" }, speechKeyId: "pay", chunks: ["بَدْفَع", "بِالْبِطَاقَة"] },
{ id: "03A-S11", arabic: "بَدْفَع نَقْد", translations: { ru: "Я оплачу наличными", uz: "Naqd pul bilan to‘layman" }, speechKeyId: "pay", chunks: ["بَدْفَع", "نَقْد"] },
{ id: "03A-S12", arabic: "وَيْن الكَاشِير؟", translations: { ru: "Где касса?", uz: "Kassa qayerda?" }, speechKeyId: "where", chunks: ["وَيْن", "الكَاشِير؟"] }
] }
].map((lesson) => ({ ...lesson, words: lesson.words.map(([id, arabic, ru, uz, letters, hasAudio = true, imageSrc]) => { const path = `assets/audio/words/word-${String(id).padStart(3, "0")}.mp3`; return { id, arabic, translations: { ru, uz }, letters, audio: hasAudio ? { src: path, expectedPath: path } : {}, image: imageSrc ? { src: imageSrc } : {} }; }) }));
const allWords = lessons.flatMap((lesson) => lesson.words);
