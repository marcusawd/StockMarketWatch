import ReactDatePicker from "react-datepicker"; //*https://www.npmjs.com/package//react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import PortfolioTable from "./components/Portfolio/PortfolioTable";
import { useState } from "react";
import SideBar from "./components/SideBar/SideBar";
import { Route, Routes } from "react-router-dom";

function App() {
	const [selectedDate, setSelectedDate] = useState(new Date());

	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<SideBar />

					<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
						<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
							<h1 className="h2">US Equities Tracker</h1>
							<div className="btn-toolbar mb-2 mb-md-0">
								<ReactDatePicker
									showIcon
									onChange={(date) => setSelectedDate(date)}
									selected={selectedDate}
									dateFormat="yyyy/MM/dd"
								/>
							</div>
						</div>
					</main>
					<Routes>
						<Route
							path="/portfolio"
							element={<PortfolioTable date={selectedDate} />}
						/>
					</Routes>
				</div>
			</div>
		</>
	);
}

export default App;
