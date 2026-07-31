const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

console.log("Telegram объект:", tg);
console.log("initData:", tg.initData);
console.log("initDataUnsafe:", tg.initDataUnsafe);

if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
  alert("Здравствуйте, " + tg.initDataUnsafe.user.first_name);
} else {
  alert("Mini App открыт без данных пользователя.");
}