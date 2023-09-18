import { useState } from "react";
import SearchBar from "./SearchBar";
import StockRow from "./StockRow";
import StockChart from "./StockChart";

export default function PortfolioTable({ date }) {
	const [tickers, setTickers] = useState([]);
	const [chartData, setChartData] = useState([]);

	const addTicker = (ticker) => {
		setTickers([...tickers, ticker]);
	};

	const changeChartData = (data) => {
		setChartData(data);
	};

	return (
		<>
			<SearchBar addTicker={addTicker} />
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Ticker</th>
						<th>Price</th>
						<th>Volume</th>
						<th>Day Change</th>
					</tr>
				</thead>
				<tbody>
					{tickers.map((symbol, index) => (
						<StockRow
							ticker={symbol}
							key={index}
							date={date}
							changeChartData={changeChartData}
						/>
					))}
				</tbody>
			</table>
			{chartData.length > 0 && <StockChart data={chartData} />}
		</>
	);
}
