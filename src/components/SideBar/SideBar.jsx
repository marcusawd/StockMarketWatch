import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function SideBar() {
	return (
		<Nav>
			{/* <Nav.Item>
				<Link to="/" className="nav-link">
					Dashboard
				</Link>
			</Nav.Item> */}
			<Nav.Item>
				<Link to="/" className="nav-link">
					Portfolio
				</Link>
			</Nav.Item>
			<Nav.Item>
				<Link to="/transaction-history" className="nav-link">
					Transaction History
				</Link>
			</Nav.Item>
		</Nav>
	);
}
