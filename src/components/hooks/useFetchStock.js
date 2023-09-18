// import { useEffect, useState } from "react";
// import formatDate from "../../helper/formatDate";
// import { getEODData } from "../../utils/stockApi";

// export default function useFetchStockData(ticker, date) {
// 	const [stockData, setStockData] = useState([]);
// 	useEffect(() => {
// 		const fetchStockData = async () => {
// 			const formattedDate = formatDate(date);
// 			const data = await getEODData(formattedDate, ticker);
// 			setStockData(data);
// 		};
// 		fetchStockData();
// 	}, [ticker, date]);
// 	console.log(stockData);

// 	return stockData;
// }
