import { useEffect, useState } from "react";
import { deletePortfolioData, getPortfolioData } from "../../utils/airtableApi";
import { ProgressBar, Table } from "react-bootstrap";

export default function TransactionHistory({ date }) {
	const [data, setData] = useState([]);
	const [sortByColumn, setSortByColumn] = useState(null);
	const [loading, setLoading] = useState(true);
	const [sortOrder, setSortOrder] = useState("asc");

	useEffect(() => {
		const fetchData = async () => {
			const data = await getPortfolioData();
			const initialData = data.records;
			setData(initialData);
			setLoading(false);
		};
		fetchData();
	}, []);

	//* Was having trouble making a seamless sort toggle, majority of code from chatGPT (sort method still abit hard to wrap my head around)
	const toggleSort = (column) => {
		if (sortByColumn === column) {
			const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
			const sortedData = [...data].sort((a, b) =>
				a.fields[column] > b.fields[column]
					? newSortOrder === "asc"
						? 1
						: -1
					: newSortOrder === "asc"
					? -1
					: 1,
			);
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

	const handleDelete = async (id) => {
		const response = await deletePortfolioData(id);
		if (response) {
			const updatedData = data.filter((tx) => tx.id !== id);
			setData(updatedData);
		}
	};

	if (loading) {
		return <ProgressBar animated now={60} />;
	}

	return (
		<Table striped bordered hover className="text-center">
			<thead>
				<tr>
					<th onClick={() => toggleSort("Ticker")}>Ticker</th>
					<th onClick={() => toggleSort("Price")}>Price</th>
					<th onClick={() => toggleSort("Quantity")}>Quantity</th>
					<th onClick={() => toggleSort("txDate")}>Transaction Date</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{data
					.filter((tx) => new Date(tx.fields.txDate) <= date)
					.map((tx) => (
						<tr key={tx.id}>
							<td>{tx.fields.Ticker}</td>
							<td>{tx.fields.Price}</td>
							<td>{tx.fields.Quantity}</td>
							<td>{tx.fields.txDate}</td>
							<td>
								<input type="checkbox" onClick={() => handleDelete(tx.id)} />
							</td>
						</tr>
					))}
			</tbody>
		</Table>
	);
}
