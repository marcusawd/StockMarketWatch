import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPortfolioData } from "../../utils/airtableApi";
import PortfolioPieChart from "./Graphs/PortfolioPieChart";
import aggregateData from "../../helper/aggregateData";
import styles from "../../css/Portfolio.module.css";
import { Button } from "react-bootstrap";
import PortfolioTable from "./PortfolioTable";

export default function Portfolio({ date }) {
	const [portfolioData, setPortfolioData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getPortfolioData();
			const filteredData = data.records.filter((record) => {
				const txDate = new Date(record.fields.txDate);
				return txDate <= date;
			});
			const arrData = aggregateData(filteredData);
			console.log(arrData);
			setPortfolioData(arrData);
		};
		fetchData();
	}, [date]);

	return (
		<>
			<div className={styles["portfolio-container"]}>
				<div className={styles["table-container"]}>
					<Button variant="primary" as={Link} to="/portfolio/add">
						Add New
					</Button>
					<Button variant="danger" as={Link} to="/portfolio/remove">
						Remove
					</Button>
					<PortfolioTable portfolioData={portfolioData} date={date} />
				</div>
				<div className={styles["pie-chart-container"]}>
					<PortfolioPieChart data={portfolioData} />
				</div>
			</div>
		</>
	);
}
