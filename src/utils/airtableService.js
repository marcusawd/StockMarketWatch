import {
	getPortfolioData,
	patchPortfolioData,
	postPortfolioData,
} from "./airtableApi";

// async function doesTickerExist(tickerToCheck) {
// 	const portfolioData = await getPortfolioData();
// 	const existingRecord = portfolioData?.records.find((record) => {
// 		const ticker = record.fields.Ticker;
// 		return ticker === tickerToCheck;
// 	});
// 	if (existingRecord) {
// 		const recordId = existingRecord.id;
// 		const OldPrice = existingRecord.fields.Price;
// 		const OldQuantity = existingRecord.fields.Quantity;
// 		return { exists: true, recordId, OldPrice, OldQuantity };
// 	} else {
// 		return { exists: false };
// 	}
// }

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

// async function editExistingStock(recordId, Ticker, Price, Quantity) {
// 	const data = {
// 		records: [
// 			{
// 				id: recordId,
// 				fields: {
// 					Ticker,
// 					Price,
// 					Quantity,
// 				},
// 			},
// 		],
// 	};
// 	const existingRecord = await patchPortfolioData(data);
// 	console.log("Update Data", existingRecord);
// }

// async function getAndUpdateTable(Ticker, Price, Quantity) {
// 	const { exists, recordId, OldPrice, OldQuantity } = await doesTickerExist(
// 		Ticker,
// 	);
// 	if (exists) {
// 		Price += OldPrice;
// 		Quantity += OldQuantity;
// 		editExistingStock(recordId, Ticker, Price, Quantity);
// 	} else {
// 		makeNewTransaction(Ticker, Price, Quantity);
// 	}
// }

export { makeNewTransaction };
