import { useAuth, useGetProfile, useSignout } from "@/features/auth";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button, Container, Dropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Header = () => {
	const { isAuthenticated, isPending } = useAuth();
	const profile = useGetProfile();

	const signout = useSignout();
	const handleSignout = () => {
		signout.mutate(null);
	};

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container as="header">
				<Navbar.Brand as={Link}>PostPlate</Navbar.Brand>
				{isPending ? (
					"Loading..."
				) : isAuthenticated ? (
					<>
						<Navbar.Toggle />
						<Navbar.Collapse className="justify-content-end">
							<Dropdown>
								<Dropdown.Toggle style={{ width: "36px", height: "36px" }} className="rounded-circle">
									{profile.isPending ? (
										<p className="m-0">...</p>
									) : profile.isError ? (
										<div className="w-100 h-100 d-flex justify-content-center align-items-center">
											<ExclamationTriangleIcon style={{ width: "32px", height: "32px" }} className="text-white" />
										</div>
									) : profile.data.images ? (
										<Image src={profile.data.images} roundedCircle fluid className="object-fit-contain border" />
									) : (
										<div className="w-100 h-100 d-flex justify-content-center align-items-center">
											<span className="text-white fs-6 fw-bold">
												{[profile.data.first_name, profile.data.last_name]
													.map((n) => n.charAt(0).toUpperCase())
													.join("")}
											</span>
										</div>
									)}
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item as={Link} to={"/" + profile.data?.username}>
										Perfil
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item as="button" onClick={handleSignout} disabled={signout.isPending}>
										{signout.isPending ? "Cerrando sesión..." : "Cerrar sesión"}
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Navbar.Collapse>
					</>
				) : (
					<Button variant="link" as={Link} to="/auth/login">
						Iniciar Sesión
					</Button>
				)}
			</Container>
		</Navbar>
	);
};
