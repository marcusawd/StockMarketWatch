import { Button, ButtonGroup, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PortfolioTable({ portfolioData }) {
	const navigate = useNavigate();

	const handleNewsButton = (ticker) => {
		navigate(`/news/${ticker}`);
	};

	return (
		<Table striped bordered hover className="text-center">
			<thead>
				<tr>
					<th>Ticker</th>
					<th>Average Price</th>
					<th>Quantity</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{portfolioData
					?.sort((a, b) => b.totalSpent - a.totalSpent)
					.map((stock, index) => (
						<tr key={index}>
							<td>{stock.ticker}</td>
							<td>{(stock.totalSpent / stock.totalQuantity).toFixed(2)}</td>
							<td>{stock.totalQuantity}</td>
							<td>
								<ButtonGroup size="sm">
									<Button variant="success">Buy</Button>
									<Button variant="danger">Sell</Button>
								</ButtonGroup>
								<Button
									variant="link"
									size="sm"
									onClick={() => handleNewsButton(stock.ticker)}>
									News
								</Button>
							</td>
						</tr>
					))}
			</tbody>
		</Table>
	);
}
