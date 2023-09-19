import { useEffect, useState } from "react";
import StockRow from "./StockRow";
import StockChart from "./StockChart";
import { Link } from "react-router-dom";
import { getPortfolioData } from "../../utils/airtableApi";

export default function PortfolioTable({ date }) {
	const [portfolioData, setPortfolioData] = useState([]);
	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getPortfolioData();
			setPortfolioData(data);
		};
		fetchData();
	}, []);

	return (
		<>
			<Link to="/portfolio/add">Add</Link>
			<table>
				<thead>
					<tr>
						<th>Ticker</th>
						<th>Price</th>
						<th>Quantity</th>
					</tr>
				</thead>
				<tbody>
					{portfolioData?.records?.map((stock, index) => (
						<StockRow
							ticker={stock.fields.Ticker}
							price={stock.fields.Price}
							quantity={stock.fields.Quantity}
							key={index}
							date={date}
						/>
					))}
				</tbody>
			</table>
			{chartData.length > 0 && <StockChart data={chartData} />}
		</>
	);
}
