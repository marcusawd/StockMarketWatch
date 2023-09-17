import { useState } from "react";
// import PortfolioHeader from "./PortfolioHeader";
import SearchBar from "./SearchBar";
import StockRow from "./StockRow";

export default function PortfolioTable() {
	const [tickers, setTickers] = useState([]);

	const addTicker = (ticker) => {
		setTickers([...tickers, ticker]);
	};

	return (
		<>
			<SearchBar addTicker={addTicker} />
			<table>
				<thead>
					<tr>
						{/* <PortfolioHeader /> */}
						<th></th>
						<th>Ticker</th>
						<th>Price</th>
						<th>Volume</th>
						<th>Day Change</th>
					</tr>
				</thead>
				<tbody>
					{tickers.map((symbol, index) => (
						<StockRow ticker={symbol} key={index} />
					))}
				</tbody>
			</table>
		</>
	);
}
