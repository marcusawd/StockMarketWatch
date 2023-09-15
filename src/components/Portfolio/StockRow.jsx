import { useState } from "react";
import getStockData from "../../utils/stockApi";

export default function StockRow({ ticker }) {
	const [stock, setStock] = useState({});

	const handleFetch = async () => {
		const data = await getStockData(ticker);
		setStock(data);
	};

	return (
		<tr>
			<button onClick={handleFetch}>Get</button>
			<th>{ticker}</th>
			<td>{stock.price}</td>
			<td>{stock.volume}</td>
			<td>{stock.day_change}</td>
		</tr>
	);
}
