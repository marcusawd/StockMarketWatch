import { useEffect, useState } from "react";
import { getPortfolioData } from "../../utils/airtableApi";
import sortedDate from "../../helper/sortData";

export default function TransactionHistory() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getPortfolioData();
			const unorderedArr = data.records;
			const sortedArr = sortedDate(unorderedArr);
			console.log(sortedArr);
			setData(sortedArr);
		};
		fetchData();
	}, []);

	return <h1>{JSON.stringify(data)}</h1>;
}
