import ReactDatePicker from "react-datepicker"; //*https://www.npmjs.com/package//react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import PortfolioTable from "./components/Portfolio/PortfolioTable";
import { useState } from "react";

function App() {
	const [selectedDate, setSelectedDate] = useState(new Date());

	return (
		<>
			<div className="header">
				<h1>US Equities Tracker</h1>
				<ReactDatePicker
					showIcon
					onChange={(date) => setSelectedDate(date)}
					selected={selectedDate}
					dateFormat="yyyy/MM/dd"
				/>
			</div>
			<PortfolioTable date={selectedDate} />
		</>
	);
}

export default App;
