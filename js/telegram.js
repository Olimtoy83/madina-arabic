const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const user = tg.initDataUnsafe.user;

if (user) {
  console.log("Пользователь:", user.first_name);
}