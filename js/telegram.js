function getTelegramUser() {
  const tg = window.Telegram && window.Telegram.WebApp;
  if (!tg) return null;
  tg.ready();
  tg.expand();
  return tg.initDataUnsafe && tg.initDataUnsafe.user ? tg.initDataUnsafe.user : null;
}
