import { useEffect, useState } from "react";
import { getPortfolioData } from "../../utils/airtableApi";
import { Table } from "react-bootstrap";

export default function TransactionHistory() {
	const [data, setData] = useState([]);
	const [sortByColumn, setSortByColumn] = useState(null);
	const [sortOrder, setSortOrder] = useState("asc");

	useEffect(() => {
		const fetchData = async () => {
			const data = await getPortfolioData();
			const initialData = data.records;
			setData(initialData);
		};
		fetchData();
	}, []);

	const toggleSort = (column) => {
		if (sortByColumn === column) {
			const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
			const sortedData =
				newSortOrder === "asc" ? [...data] : [...data].reverse();
			setSortOrder(newSortOrder);
			setData(sortedData);
		} else {
			const sortedData = [...data].sort((a, b) =>
				a.fields[column] > b.fields[column] ? 1 : -1,
			);
			setData(sortedData);
			setSortByColumn(column);
			setSortOrder("asc");
		}
	};

	return (
		<Table striped bordered hover className="text-center">
			<thead>
				<tr>
					<th onClick={() => toggleSort("Ticker")}>Ticker</th>
					<th onClick={() => toggleSort("Price")}>Price</th>
					<th onClick={() => toggleSort("Quantity")}>Quantity</th>
					<th onClick={() => toggleSort("txDate")}>Transaction Date</th>
				</tr>
			</thead>
			<tbody>
				{data.map((tx) => (
					<tr key={tx.id}>
						<td>{tx.fields.Ticker}</td>
						<td>{tx.fields.Price}</td>
						<td>{tx.fields.Quantity}</td>
						<td>{tx.fields.txDate}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}
