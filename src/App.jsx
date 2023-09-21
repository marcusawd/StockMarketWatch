import ReactDatePicker from "react-datepicker"; //*https://www.npmjs.com/package//react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import Portfolio from "./components/Portfolio/Portfolio";
import SideBar from "./components/SideBar/SideBar";
import AddStock from "./components/Portfolio/AddStock";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import TransactionHistory from "./components/TransactionHistory/TransactionHistory";
import styles from "./css/App.module.css";
import RemoveStock from "./components/Portfolio/RemoveStock";
import News from "./components/Portfolio/News";

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
								maxDate={new Date()}
								minDate={new Date().setFullYear(new Date().getFullYear() - 1)}
							/>
						</div>
					</header>
					<Routes>
						<Route path="/">
							<Route index element={<Portfolio date={selectedDate} />} />
							<Route path="add" element={<AddStock date={selectedDate} />} />
							<Route path="remove" element={<RemoveStock />} />
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
