const BASE_URL = `https://api.bithumb.com/public/`;

export const bithumbCoins = async () => {
  return await (await fetch(`${BASE_URL}/ticker/ALL_KRW`)).json();
};

export const bithumbCoinInfo = async (coinId: string) => {
  return await (await fetch(`${BASE_URL}/ticker/${coinId}_KRW`)).json();
};

export const bithumbCandlestick = async (coinId: string) => {
  return await (await fetch(`${BASE_URL}/candlestick/${coinId}_KRW`)).json();
};