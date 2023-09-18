import { Link } from "react-router-dom";

export default function SideBar() {
	return (
		<nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
			<div className="position-sticky">
				<ul className="nav flex-column">
					<li className="nav-item">
						<a className="nav-link active" href="#">
							Dashboard
						</a>
					</li>
					<li className="nav-item">
						{/* <a className="nav-link" href="#">
							Portfolio
						</a> */}
						<Link to="/portfolio">Portfolio</Link>
					</li>
					{/* Add more sidebar links as needed */}
				</ul>
			</div>
		</nav>
	);
}
