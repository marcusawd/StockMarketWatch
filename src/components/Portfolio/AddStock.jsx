import { useState, useRef, useEffect } from "react";
import debounce from "lodash/debounce";
import { getEODData, getStockTicker } from "../../utils/stockApi";
import StockChart from "./Graphs/StockChart";
import formatDate from "../../helper/formatDate";
import { makeNewTransaction } from "../../utils/airtableService";
import { useNavigate } from "react-router-dom";
import { Dropdown, FormControl } from "react-bootstrap";
import styles from "../../css/AddStock.module.css";

export default function AddStock({ date, updateAirtableData }) {
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [selectedTicker, setSelectedTicker] = useState("");
	const [showDetails, setShowDetails] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [stockData, setStockData] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const navigate = useNavigate();
	const delayFetchRef = useRef(null);

	//* Was having so much trouble getting debounce to only run once, found out that it was because function keeps re-rendering so had to useRef. Credit to chatGPT
	if (!delayFetchRef.current) {
		delayFetchRef.current = debounce(async (text) => {
			const data = await getStockTicker(text);
			console.log(data);
			setSearchResults(data);
			setShowDropdown(true);
		}, 500);
	}

	useEffect(() => {
		if (selectedTicker) {
			const fetchData = async () => {
				const formattedDate = formatDate(date);
				const data = await getEODData(formattedDate, selectedTicker);
				setStockData(data);
				setShowDetails(true);
			};
			fetchData();
		}
	}, [date, selectedTicker]);

	const handleInput = (event) => {
		const input = event.target.value;
		setSearchText(input);
		delayFetchRef.current(input);
	};

	const handleSelectedTicker = async (ticker) => {
		setSelectedTicker(ticker);
		setSearchText(ticker);

		setShowDropdown(false);
	};

	const handleSubmit = async () => {
		console.log(`Purchase ${quantity} shares of ${selectedTicker}`);
		const newData = await makeNewTransaction(
			selectedTicker,
			stockData[0]?.close,
			Number(quantity),
			formatDate(date),
		);
		updateAirtableData(newData);
		navigate("/");
	};

	return (
		<>
			<FormControl
				type="text"
				placeholder="Search for Stock"
				value={searchText}
				onChange={handleInput}
				style={{ textAlign: "center" }}
			/>
			<Dropdown show={showDropdown}>
				<Dropdown.Menu className={styles["dropdown-menu"]}>
					{searchResults?.map((result, index) => (
						<Dropdown.Item
							key={index}
							onClick={() => handleSelectedTicker(result.symbol)}>
							{result.symbol}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>

			{showDetails && stockData.length > 0 && (
				<div className={styles["details-container"]}>
					<br />
					<h3>{`${selectedTicker}: ${stockData[0]?.close}`}</h3>
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
				</div>
			)}
		</>
	);
}
