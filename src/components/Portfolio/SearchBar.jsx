import { useState } from "react";
import debounce from "../../helper/Debounce";
import { getStockTicker } from "../../utils/stockApi";

export default function SearchBar() {
	const [searchText, setSearchText] = useState("");

	const handleInput = (event) => {
		const input = event.target.value;
		console.log(input);
		setSearchText(input);
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Search for Stock"
				value={searchText}
				onChange={handleInput}
			/>
		</div>
	);
}
