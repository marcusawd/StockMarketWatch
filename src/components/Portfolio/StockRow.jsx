export default function StockRow({ ticker, price, quantity }) {
	return (
		<tr>
			<th>{ticker}</th>
			<td>{price}</td>
			<td>{quantity}</td>
		</tr>
	);
}
