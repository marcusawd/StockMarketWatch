import { useEffect, useState } from "react";
import StockRow from "./StockRow";
import { Link } from "react-router-dom";
import { getPortfolioData } from "../../utils/airtableApi";
import PortfolioPieChart from "./Graphs/PortfolioPieChart";
import aggregateData from "../../helper/aggregateData";

export default function PortfolioTable({ date }) {
	const [portfolioData, setPortfolioData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getPortfolioData();
			const arrData = aggregateData(data.records);
			console.log(arrData);
			setPortfolioData(arrData);
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
			</table>
			<PortfolioPieChart data={portfolioData} />
		</>
	);
}
