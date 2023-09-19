export default function StockRow({ date, ticker, price, quantity }) {
	// const [stock, setStock] = useState([]);

	// const handleFetch = async () => {
	// 	const formattedDate = formatDate(date);
	// 	const data = await getEODData(formattedDate, ticker);
	// 	console.log(data);
	// 	setStock(data[0]);
	// 	changeChartData(data);
	// };

	return (
		<tr>
			{/* <td><button onClick={handleFetch}>Get</button></td> */}
			<th>{ticker}</th>
			<td>{price}</td>
			<td>{quantity}</td>
			{/* <td>{stock.day_change}</td> */}
		</tr>
	);
}
