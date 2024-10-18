import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

export const Layout = () => {
	return (
		<div>
			<header>Header</header>
			<Container>
				<Outlet />
			</Container>
			<footer>Footer</footer>
		</div>
	);
};
