import { Link, Outlet } from "react-router-dom";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { useAuth, useGetProfile } from "@/features/auth";
import { Header } from "./components/header";
import Hero from "@/components/homepage/hero";
import { Tarjetas } from "@/components/homepage/tarjetas/tarjetas";
import { Unete } from "@/components/homepage/unete/unete";

export const Layout = () => {
	const { isAuthenticated, isPending } = useAuth();
	const profile = useGetProfile();

	return (
		<Stack className="h-100">
			<Header />
			{isPending ? (
				<div className="flex-grow-1 d-flex justify-content-center items-content-center text-center">Loading...</div>
			) : isAuthenticated ? (
				<Container className="h-100">
					<Row className="h-100">
						<Col xs={3} className="border-end">
							<Stack gap={1}>
								<Link to={`/${profile.data?.username}/requests`}>Requests</Link>
								<Link to={`/${profile.data?.username}/friends`}>Friends</Link>
							</Stack>
						</Col>
						<Col xs={6}>
							<Outlet />
						</Col>
						<Col xs={3} className="border-start">
							#TODO: Right Aside
						</Col>
					</Row>
				</Container>
			) : (
				<Stack>
					<Hero />
					<Tarjetas />
					<Unete />
				</Stack>
			)}
		</Stack>
	);
};
