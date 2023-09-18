import { useState } from "react";
import { getEODData } from "../../utils/stockApi";
import formatDate from "../../helper/formatDate";

export default function StockRow({ ticker, date, changeChartData }) {
	const [stock, setStock] = useState([]);

	const handleFetch = async () => {
		const formattedDate = formatDate(date);
		const data = await getEODData(formattedDate, ticker);
		console.log(data);
		setStock(data[0]);
		changeChartData(data);
	};

	return (
		<tr onClick={handleFetch}>
			{/* <td><button onClick={handleFetch}>Get</button></td> */}
			<th>{ticker}</th>
			<td>{stock.close}</td>
			<td>{stock.volume}</td>
			{/* <td>{stock.day_change}</td> */}
		</tr>
	);
}
