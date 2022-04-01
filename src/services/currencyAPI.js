const endpoint = 'https://economia.awesomeapi.com.br/json/all';

const allCurrency = async () => {
  const response = await fetch(endpoint);
  const data = await response.json();
  const results = Object.keys(data).filter((element) => element !== 'USDT');
  return results;
};

export default allCurrency;
