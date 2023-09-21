import ReactDatePicker from "react-datepicker"; //*https://www.npmjs.com/package//react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import Portfolio from "./components/Portfolio/Portfolio";
import SideBar from "./components/SideBar/SideBar";
import AddStock from "./components/Portfolio/AddStock";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import TransactionHistory from "./components/TransactionHistory/TransactionHistory";
import styles from "./css/App.module.css";
import News from "./components/Portfolio/News";
import { getPortfolioData } from "./utils/airtableApi";

function App() {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [airtableData, setAirtableData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getPortfolioData();
			setAirtableData(data.records);
			console.log(data.records);
		};
		fetchData();
	}, []);

	const updateAirtableData = (data) => setAirtableData([...airtableData, data]);

	return (
		<>
			<div className={styles["app-container"]}>
				<div className={styles["sidebar"]}>
					<SideBar />
				</div>
				<div className={styles["main-content"]}>
					<header className={styles["header"]}>
						<h1 className="h2">US Equities Tracker</h1>
						<div className={styles["date-picker"]}>
							<ReactDatePicker
								showIcon
								onChange={(date) => setSelectedDate(date)}
								selected={selectedDate}
								dateFormat="yyyy/MM/dd"
								maxDate={new Date()}
								minDate={new Date().setFullYear(new Date().getFullYear() - 1)}
							/>
						</div>
					</header>
					<Routes>
						<Route path="/">
							<Route
								index
								element={
									<Portfolio date={selectedDate} airtableData={airtableData} />
								}
							/>
							<Route
								path="add"
								element={
									<AddStock
										date={selectedDate}
										updateAirtableData={updateAirtableData}
									/>
								}
							/>
							<Route
								path="news/:ticker"
								element={<News date={selectedDate} />}
							/>
						</Route>
						<Route
							path="/transaction-history"
							element={<TransactionHistory date={selectedDate} />}
						/>
					</Routes>
				</div>
			</div>
		</>
	);
}

export default App;
