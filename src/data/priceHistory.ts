import { Ticker } from "@/data/tickers";

// Generate fake price history for chart
export const generatePriceHistory = (ticker: Ticker, days: number = 30): { date: string; price: number }[] => {
  const data: { date: string; price: number }[] = [];
  let price = ticker.price * (1 - ticker.changePercent / 100 * days * 0.3);
  const volatility = ticker.price * 0.015;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const trend = (ticker.changePercent > 0 ? 1 : -1) * 0.002;
    const noise = (Math.random() - 0.5) * 2 * volatility;
    price = Math.max(price * (1 + trend) + noise, price * 0.9);
    data.push({
      date: date.toLocaleDateString("ru-RU", { day: "2-digit", month: "short" }),
      price: Math.round(price * 100) / 100,
    });
  }

  // Ensure last point matches current price
  data[data.length - 1].price = ticker.price;
  return data;
};
