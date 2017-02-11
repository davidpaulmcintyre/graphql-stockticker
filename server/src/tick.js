import { stocks } from './db';
import { pubsub } from './subscriptions';

function round2(num) {
  return Math.round(100 * num) / 100;
};

function random(low, high) {
  return round2(Math.random() * (high - low) + low);
};

function tick(stock) {
  let change = random(-1, 1);
  if (stock.price + change < 0) {
    change = -stock.price;
  };

  // New info
  const price = stock.price + change;
  const changePct = round2(change / stock.price);
  const newStock = { ...stock, price, change, changePct }

  console.log(newStock);
  pubsub.publish('stockUpdated', newStock);

  setTimeout(tick, 1000, stock);
};

export function start() {
  stocks.forEach((stock) => tick(stock));
};
