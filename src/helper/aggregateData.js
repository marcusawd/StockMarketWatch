export default function aggregateData(data) {
	const aggregatedData = {};

	data.forEach((stock) => {
		const ticker = stock.fields.Ticker;

		if (!aggregatedData[ticker]) {
			aggregatedData[ticker] = {
				totalSpent: 0,
				totalQuantity: 0,
				txCount: 0,
			};
		}
		const price = stock.fields.Price;
		const quantity = stock.fields.Quantity;
		aggregatedData[ticker].totalSpent += price * quantity;
		aggregatedData[ticker].totalQuantity += quantity;
		aggregatedData[ticker].txCount++;
	});

	// console.log(Object.keys(aggregatedData));

	const result = Object.keys(aggregatedData).map((ticker) => {
		const { totalSpent, totalQuantity, txCount } = aggregatedData[ticker];
		return {
			ticker,
			totalSpent,
			totalQuantity,
			txCount,
		};
	});
	// console.log(result);
	return result;
}
