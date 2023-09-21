const API_TOKEN = "00H70KgdWPQwafIiTDOdKeAETBXnpw6SyhNdSH0n";
const BASE_URL = "https://api.marketaux.com/v1/news";

export default async function getNewsData(ticker, date) {
	const url = `${BASE_URL}/all?symbols=${ticker}&published_on=${date}&filter_entites=true&language=en&countries=us&entity_types=equity&api_token=${API_TOKEN}`;
	const response = await fetch(url);
	const data = await response.json();
	return data.data;
}
