const API_TOKEN = "aO6V6IeoJ1KtaEF7HcbWPD3nFbCRAU3U1Lgl8Em0";
const BASE_URL = "https://api.stockdata.org/v1";
// const symbols = "AAPL";

async function getStockData(ticker) {
	const url = `${BASE_URL}/data/quote?symbols=${ticker}&api_token=${API_TOKEN}`;
	const response = await fetch(url);
	const data = await response.json();
	console.log(data.data[0]);
	return data.data[0];
}

async function getStockTicker(search) {
	const url = `${BASE_URL}/entity/search?search=${search}&countries=us&types=equity&api_token=${API_TOKEN}`;
	const response = await fetch(url);
	const data = await response.json();
	return data.data;
}

export { getStockData, getStockTicker };