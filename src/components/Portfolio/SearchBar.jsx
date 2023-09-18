import { useState, useRef } from "react";
import debounce from "lodash/debounce";
import { getStockTicker } from "../../utils/stockApi";

export default function SearchBar({ addTicker }) {
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
							onClick={() => addTicker(result.symbol)}>
							{result.symbol}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
