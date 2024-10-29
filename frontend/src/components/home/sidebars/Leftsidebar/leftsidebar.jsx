import { NavLink } from "react-router-dom";
import "./Leftsidebar.css";
import { Stack } from "react-bootstrap";
import { BuildingStorefrontIcon, HomeIcon, UserIcon, UserPlusIcon } from "@heroicons/react/24/outline";

export const Leftsidebar = () => {
	return (
		<Stack gap={4} className="container-left-sidebar d-flex justify-content-evenly w-100 ">
			<NavLink to="/">
				<HomeIcon
					style={{
						width: "24px",
						height: "24px",
						margin: "0 10px",
					}}
				/>
				Home
			</NavLink>
			<NavLink to="/solicitudes">
				<UserPlusIcon
					style={{
						width: "24px",
						height: "24px",
						margin: "0 10px",
					}}
				/>
				Solicitudes
			</NavLink>
			<NavLink to="/comidas">
				<BuildingStorefrontIcon
					style={{
						width: "24px",
						height: "24px",
						margin: "0 10px",
					}}
				/>
				Lista de comidas
			</NavLink>
			<NavLink>
				<UserIcon
					style={{
						width: "24px",
						height: "24px",
						margin: "0 10px",
					}}
				/>
				Perfil
			</NavLink>
		</Stack>
	);
};
