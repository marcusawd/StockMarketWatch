import PortfolioHeader from "./PortfolioHeader";
import SearchBar from "./SearchBar";
import StockRow from "./StockRow";

export default function PortfolioTable() {
	return (
		<>
			<SearchBar />
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
					<StockRow ticker="AAPL" />
					<StockRow ticker="TSLA" />
					<StockRow ticker="MSFT" />
					<StockRow ticker="GOOGL" />
				</tbody>
			</table>
		</>
	);
}
