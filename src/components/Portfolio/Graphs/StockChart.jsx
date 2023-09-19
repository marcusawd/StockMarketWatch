import {
	Bar,
	BarChart,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"; //https://recharts.org/en-US/examples/SimpleLineChart
import formatDate from "../../../helper/formatDate";

export default function StockChart({ data }) {
	const reversedData = [...data].reverse();
	const minYValue = Math.round(
		Math.min(...reversedData.map((item) => item.close)),
	);

	const maxYValue = Math.ceil(
		Math.max(...reversedData.map((item) => item.close)),
	);
	const buffer = Math.round(0.1 * (maxYValue - minYValue));

	const yDomain = [minYValue - buffer, maxYValue];

	return (
		<div>
			<h2>Stock Price and Volume Graph</h2>
			<LineChart width={800} height={400} data={reversedData}>
				<XAxis
					dataKey="date"
					tickFormatter={(date) => formatDate(new Date(date))}
				/>
				<YAxis domain={yDomain} />
				<Tooltip />
				<Line type="monotone" dataKey="close" stroke="#8884d8" />
			</LineChart>
			<BarChart width={800} height={150} data={reversedData}>
				<XAxis
					dataKey="date"
					tickFormatter={(date) => formatDate(new Date(date))}
				/>
				<YAxis />
				<Bar dataKey="volume" fill="#82ca9d" />
			</BarChart>
		</div>
	);
}
