alert("Файл telegram.js загрузился");

console.log("telegram.js работает");

if (window.Telegram) {
  alert("Telegram SDK найден");
} else {
  alert("Telegram SDK НЕ найден");
}