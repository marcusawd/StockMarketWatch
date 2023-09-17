import ReactDatePicker from "react-datepicker"; //*https://www.npmjs.com/package//react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import PortfolioTable from "./components/Portfolio/PortfolioTable";
import { useState } from "react";
import { getEODData } from "./utils/stockApi";
import formatDate from "./helper/formatDate";

function App() {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChange = async (date) => {
		setSelectedDate(date);
		const formattedDate = formatDate(date);
		const data = await getEODData(formattedDate, "AAPL");
		console.log(data);
	};

	return (
		<>
			<div className="header">
				<h1>US Equities Tracker</h1>
				<ReactDatePicker
					showIcon
					onChange={handleDateChange}
					selected={selectedDate}
					dateFormat="yyyy/MM/dd"
				/>
			</div>
			<PortfolioTable />
		</>
	);
}

export default App;
