const API_TOKEN = "aO6V6IeoJ1KtaEF7HcbWPD3nFbCRAU3U1Lgl8Em0";
const BASE_URL = "https://api.stockdata.org/v1/data/quote";
// const symbols = "AAPL";

export default async function getStockData(ticker) {
	const url = `${BASE_URL}?symbols=${ticker}&api_token=${API_TOKEN}`;
	const response = await fetch(url);
	const data = await response.json();
	console.log(data.data[0]);
	return data.data[0];
}
