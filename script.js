// Логіка фіксованої ціни 2-3 дні, потім реальна

// Зберігаємо дату першого відкриття в localStorage
const START_DATE_KEY = 'gmm_demo_start_date';

function getStartDate() {
  let stored = localStorage.getItem(START_DATE_KEY);
  if (!stored) {
    stored = new Date().toISOString();
    localStorage.setItem(START_DATE_KEY, stored);
  }
  return new Date(stored);
}

const startDate = getStartDate();
const now = new Date();
const diffDays = (now - startDate) / (1000 * 60 * 60 * 24);

const priceEl = document.getElementById('price');
const statusEl = document.getElementById('price-status');

async function fetchLivePrice() {
  try {
    // Приклад API для отримання реальної ціни срібла
    // Це заглушка, заміни на свій реальний API
    // Наприклад, можна використовувати Metals-API (https://metals-api.com/) або інші
    
    // Для демонстрації поки повертаємо випадкове значення біля 24
    return (23.5 + Math.random() * 1).toFixed(2);
  } catch {
    return null;
  }
}

async function updatePrice() {
  if (diffDays < 3) {
    // Фіксована ціна від 120 до 130 доларів перші 3 дні
    const fixedPrice = (120 + Math.random() * 10).toFixed(2);
    priceEl.textContent = `$${fixedPrice}`;
    statusEl.textContent = "Demo mode: fixed price between $120-$130";
  } else {
    // Жива ціна
    const livePrice = await fetchLivePrice();
    if (livePrice) {
      priceEl.textContent = `$${livePrice}`;
      statusEl.textContent = "Live market price (XAG/USD)";
    } else {
      statusEl.textContent = "Failed to fetch live price";
    }
  }
}

// Запуск оновлення ціни
updatePrice();

// Підключення TradingView графіку
window.onload = function () {
  new TradingView.widget({
    width: "100%",
    height: 500,
    symbol: "FOREXCOM:XAGUSD",
    interval: "60",
    timezone: "Etc/UTC",
    theme: "light",
    style: "1",
    locale: "en",
    toolbar_bg: "#f1f3f6",
    enable_publishing: false,
    allow_symbol_change: true,
    container_id: "chart",
  });
};
