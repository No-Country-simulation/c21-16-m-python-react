import { Link } from "react-router-dom";
import { Button, Container, Dropdown, Image, Navbar } from "react-bootstrap";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useAuth, useGetProfile, useSignout } from "@/features/auth";
import user from "../../multimedia/SVGs/USER.svg";
import LOGO from "../../multimedia/generales/LOGO.png";
import "./Header.css";
export const Header = () => {
	const { isAuthenticated, isPending } = useAuth();
	const profile = useGetProfile();
	const signout = useSignout();
	const handleSignout = () => {
		signout.mutate(null);
	};

	return (
		<Navbar
			fixed="top"
			expand="lg"
			className="bg-body-tertiary border-bottom header-main"
			style={{ padding: "0", height: "6vh", zIndex: "10000" }}
		>
			<Container as="header">
				<Navbar.Brand
					as={Link}
					style={{ width: "15%", padding: "0", margin: "0" }}
					className="d-flex justify-content-evenly align-items-center header-brand"
				>
					<img src={LOGO} style={{ height: "9vh", width: "auto" }} />
					Post Plate
				</Navbar.Brand>
				{isPending ? (
					"Loading..."
				) : isAuthenticated ? (
					<>
						<Navbar.Toggle />
						<Navbar.Collapse className="justify-content-end">
							<Dropdown>
								<Dropdown.Toggle className="d-flex d-flex justify-content-center align-items-center">
									{profile.isPending ? (
										<p className="m-0">...</p>
									) : profile.isError ? (
										<ExclamationTriangleIcon style={{ width: "20px", height: "20px" }} className="text-white" />
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
									<Dropdown.ItemText as="div">
										<p className="lh-1 m-0 fw-bold">
											{profile.data?.first_name} {profile.data?.last_name}
										</p>
										<small className="lh-1 text-muted">@{profile.data?.username}</small>
									</Dropdown.ItemText>
									<Dropdown.Divider />
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
					<Button
						variant="link"
						as={Link}
						to="/auth/login"
						style={{ textDecoration: "none", color: "orangered", display: "flex" }}
						className="login-btn"
					>
						<img src={user} />
						Iniciar Sesión
					</Button>
				)}
			</Container>
		</Navbar>
	);
};
