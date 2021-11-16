export const fetchCoins = () => {
  return fetch("https://api.coinpaprika.com/v1/coins").then((res) =>
    res.json()
  );
};

export const fetchCoinInfo = (coinID: string) => {
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`).then((res) =>
    res.json()
  );
};

export const fetchCoinPrice = (coinID: string) => {
  return fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`).then((res) =>
    res.json()
  );
};
