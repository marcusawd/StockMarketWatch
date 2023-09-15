import PortfolioHeader from "./PortfolioHeader";
import StockRow from "./StockRow";

export default function PortfolioTable() {
	return (
		<>
			<table>
				<thead>
					<PortfolioHeader />
				</thead>
				<tbody>
					<StockRow ticker="AAPL" />
					<StockRow />
					<StockRow />
					<StockRow />
				</tbody>
			</table>
		</>
	);
}
