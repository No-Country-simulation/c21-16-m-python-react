import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

export const Layout = () => {
	return (
		<>
			<Container className="h-100">
				<Row className="h-100">
					<Col xs={3} className="border-end">
						#TODO: LeftAside
					</Col>
					<Col xs={6}>
						<Outlet />
					</Col>
					<Col xs={3} className="border-start">
						#TODO: Right Aside
					</Col>
				</Row>
			</Container>
		</>
	);
};
