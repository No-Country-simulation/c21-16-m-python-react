import { Outlet } from "react-router-dom";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { useAuth } from "@/features/auth";
import { Header } from "./components/header";
import Hero from "@/components/homepage/hero";
import { Tarjetas } from "@/components/homepage/tarjetas/tarjetas";
import { Unete } from "@/components/homepage/unete/unete";
import { Leftsidebar } from "@/components/home/sidebars/Leftsidebar/leftsidebar";

export const Layout = () => {
	const { isAuthenticated, isPending } = useAuth();
	return (
		<Stack className="h-100">
			<Header />
			{isPending ? (
				<div className="flex-grow-1 d-flex justify-content-center items-content-center text-center">Loading...</div>
			) : isAuthenticated ? (
				<Container className="h-100" style={{ paddingTop: "6vh", border: "solid black 1px" }}>
					<Row className="h-100 w-100">
						<Col xs={4} className="border-end">
							<Leftsidebar />
						</Col>
						<Col xs={5}>
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
