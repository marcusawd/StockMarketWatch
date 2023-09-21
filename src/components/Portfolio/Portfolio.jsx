import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PortfolioPieChart from "./Graphs/PortfolioPieChart";
import aggregateData from "../../helper/aggregateData";
import styles from "../../css/Portfolio.module.css";
import { Button, ProgressBar } from "react-bootstrap";
import PortfolioTable from "./PortfolioTable";

export default function Portfolio({ date, airtableData }) {
	const [portfolioData, setPortfolioData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = () => {
			console.log(airtableData, "check for changes");
			const filteredData = airtableData?.filter((record) => {
				const txDate = new Date(record?.fields?.txDate);
				return txDate <= date;
			});
			const arrData = aggregateData(filteredData);
			// console.log(arrData);
			setPortfolioData(arrData);
			setTimeout(() => {
				setLoading(false);
			}, 500);
		};
		fetchData();
	}, [date, airtableData]);

	if (loading) {
		return <ProgressBar animated now={60} />;
	}

	return (
		<>
			<div className={styles["portfolio-container"]}>
				<div className={styles["table-container"]}>
					<Button variant="dark" as={Link} to="/add">
						Search for New Stock
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
