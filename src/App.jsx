import ReactDatePicker from "react-datepicker"; //*https://www.npmjs.com/package//react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import PortfolioTable from "./components/Portfolio/PortfolioTable";
import SideBar from "./components/SideBar/SideBar";
import AddStock from "./components/Portfolio/AddStock";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import TransactionHistory from "./components/TransactionHistory/TransactionHistory";
import styles from "./css/App.module.css";

function App() {
	const [selectedDate, setSelectedDate] = useState(new Date());

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
							/>
						</div>
					</header>
					<Routes>
						<Route path="/portfolio/*">
							<Route index element={<PortfolioTable date={selectedDate} />} />
							<Route path="add" element={<AddStock date={selectedDate} />} />
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
