import { Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Solicitudes.css";
import foto from "../multimedia/comidas/social-food.webp";

export const Solicitudes = () => {
	// ---------------backend------------
	// api backend
	// ---------------backend------------

	const solicitudes = [{ id: "", img: foto, nombre: "Ramon", user: "@user5000", enlace: "#" }];
	const aceptarSoli = () => {
		alert("aceptaste");
	};
	const rechazarSoli = () => {
		alert("rechazaste");
	};
	return (
		<Stack gap={3} className="h-100 w-100" style={{ backgroundColor: "rgba(255, 68, 0, 0.3)" }}>
			{solicitudes.map((solicitud, index) => (
				<div className="p-2 solicitud-entrante" key={index}>
					<img src={solicitud.img} className="flex-2" />
					<div className="flex-2">
						<h6>{solicitud.nombre}</h6>
						<strong maxLe>{solicitud.user}</strong>
					</div>
					<Button variant="light" size="sm" style={{ color: "orangered" }}>
						aceptar
					</Button>{" "}
					<Button variant="light" size="sm" style={{ color: "orangered" }}>
						rechazar
					</Button>{" "}
					<Button variant="primary" size="sm">
						Ver Perfil
					</Button>
					{/* <Button as={Link} className="ver-perfil">
						Ver perfil
					</Button>
					<Button onClick={() => aceptarSoli()}>Aceptar</Button>
					<Button onClick={() => rechazarSoli()}>Rechazar</Button> */}
				</div>
			))}
		</Stack>
	);
};
