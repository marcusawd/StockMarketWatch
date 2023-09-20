import { Table } from "react-bootstrap";
import StockRow from "./StockRow";

export default function PortfolioTable({ portfolioData, date }) {
	return (
		<Table striped bordered hover className="text-center">
			<thead>
				<tr>
					<th>Ticker</th>
					<th>Average Price</th>
					<th>Quantity</th>
				</tr>
			</thead>
			<tbody>
				{portfolioData?.map((stock, index) => (
					<StockRow
						ticker={stock.ticker}
						price={(stock.totalSpent / stock.totalQuantity).toFixed(2)}
						quantity={stock.totalQuantity}
						key={index}
						date={date}
					/>
				))}
			</tbody>
		</Table>
	);
}
