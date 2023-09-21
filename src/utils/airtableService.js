import { postPortfolioData } from "./airtableApi";

async function makeNewTransaction(Ticker, Price, Quantity, txDate) {
	const data = {
		records: [
			{
				fields: {
					Ticker,
					Price,
					Quantity,
					txDate,
				},
			},
		],
	};
	const newRecord = await postPortfolioData(data);
	console.log("New Data", newRecord);
}

export { makeNewTransaction };
