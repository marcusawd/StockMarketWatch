import { useState, useRef } from "react";
import debounce from "lodash/debounce";
import { getStockTicker } from "../../utils/stockApi";
import "./SearchBar.css";

export default function SearchBar() {
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState([]);
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
		console.log(input);
		setSearchText(input);
		delayFetchRef.current(input);
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Search for Stock"
				value={searchText}
				onChange={handleInput}
			/>
			<div className="dropdown">
				<ul className="dropdown-list">
					{searchResults.map((result, index) => (
						<li key={index}>{result.symbol}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
