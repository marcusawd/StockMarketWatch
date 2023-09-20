export default function sortedDate(transactions) {
	const copyTransactions = [...transactions];
	copyTransactions.sort((a, b) => {
		const dateA = new Date(a.fields.txDate);
		const dateB = new Date(b.fields.txDate);
		return dateB - dateA;
	});
	return copyTransactions;
}
