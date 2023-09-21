import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getNewsData from "../../utils/newsApi";
import formatDate from "../../helper/formatDate";
import { Button, Card, CardGroup } from "react-bootstrap";

export default function News({ date }) {
	const { ticker } = useParams();
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchNews = async () => {
			const formattedDate = formatDate(date);
			const data = await getNewsData(ticker, formattedDate);
			setData(data);
			console.log(data);
		};
		fetchNews();
	}, [ticker, date]);

	return (
		<>
			<h2>News for {ticker}</h2>
			<CardGroup>
				{data?.map((news) => (
					<Card style={{ width: "18rem" }} key={news.uuid}>
						<Card.Img variant="top" src={news.image_url} />
						<Card.Body>
							<Card.Title>{news.title}</Card.Title>
							<Card.Text>{news.description}</Card.Text>
							<a href={news.url} target="_blank" rel="noopener noreferrer">
								<Button variant="primary">Go to Article</Button>
							</a>
						</Card.Body>
					</Card>
				))}
			</CardGroup>
		</>
	);
}
