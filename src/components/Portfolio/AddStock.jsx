import { useState, useRef } from "react";
import debounce from "lodash/debounce";
import { getEODData, getStockTicker } from "../../utils/stockApi";
import StockChart from "./Graphs/StockChart";
import formatDate from "../../helper/formatDate";
import { makeNewTransaction } from "../../utils/airtableService";
import { useNavigate } from "react-router-dom";

export default function AddStock({ date }) {
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [selectedTicker, setSelectedTicker] = useState("");
	const [showDetails, setShowDetails] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [stockData, setStockData] = useState([]);
	const navigate = useNavigate();
	const delayFetchRef = useRef(null);

	//* Was having so much trouble getting debounce to only run once, found out that it was because function keeps re-rendering so had to useRef. Credit to chatGPT
	if (!delayFetchRef.current) {
		delayFetchRef.current = debounce(async (text) => {
			const data = await getStockTicker(text);
			console.log(data);
			setSearchResults(data);
		}, 500);
	}

	const handleInput = (event) => {
		const input = event.target.value;
		setSearchText(input);
		delayFetchRef.current(input);
	};

	const handleSelectedTicker = async (ticker) => {
		const formattedDate = formatDate(date);
		const data = await getEODData(formattedDate, ticker);
		setStockData(data);
		setSelectedTicker(ticker);
		setShowDetails(true);
	};
	const handleSubmit = () => {
		console.log(`Purchase ${quantity} shares of ${selectedTicker}`);
		makeNewTransaction(selectedTicker, stockData[0].close, Number(quantity));
		navigate("/portfolio");
	};

	return (
		<div className="input-group">
			<input
				type="text"
				placeholder="Search for Stock"
				value={searchText}
				onChange={handleInput}
				className="form-control"
			/>
			<div className="dropdown">
				<ul className="dropdown-menu">
					{searchResults.map((result, index) => (
						<li
							className="dropdown-item"
							key={index}
							onClick={() => handleSelectedTicker(result.symbol)}>
							{result.symbol}
						</li>
					))}
				</ul>
			</div>
			{showDetails && (
				<>
					<h2>{`${selectedTicker}: ${stockData[0].close}`}</h2>
					<div>
						<input
							type="number"
							placeholder="Quantity"
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
						/>
						<button onClick={handleSubmit}>Buy</button>
					</div>
					<div>
						<StockChart data={stockData} />
					</div>
				</>
			)}
		</div>
	);
}
