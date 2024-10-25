import React from "react";
import "./Tarjetas.css";
import Tarjeta from "./tarjeta";
import comida from "../../../multimedia/comidas/plato-tarjeta.webp";
import personas from "../../../multimedia/generales/personas-tarjeta.webp";
import social from "../../../multimedia/generales/publicaciones-tarjeta.webp";

export const Tarjetas = () => {
	const datosTarjetas = [
		{
			img: comida,
			titulo: "Encuentra Tu Plato Favorito",
			parrafo: "¿Listo para descubrir tu plato favorito? Publica tus recomendaciones y explora nuevos sabores.",
			fondo: "#FF7A45",
			boton: "Ver comidas",
			botonColor: "#0b5ed7",
			clase: "tarjeta-tarjetas",
			bordes: "15px",
		},
		{
			img: personas,
			titulo: "Sabores de la Gente",
			parrafo: "Únete y comparte tus sabores. Descubre los gustos de otros y conéctate con amantes de la comida.",
			fondo: "#31B77E",
			boton: "Conocer personas",
			botonColor: "#0b5ed7",
			clase: "tarjeta-tarjetas",
			bordes: "15px",
		},
		{
			img: social,
			titulo: "Comparte tus Sabores",
			parrafo:
				"Conéctate y comparte tus pasiones culinarias. Publica tus gustos y conoce a personas con intereses similares.",
			fondo: "#333740",
			boton: "Ver publicaciones",
			botonColor: "#0b5ed7",
			clase: "tarjeta-tarjetas",
			bordes: "15px",
		},
	];
	return (
		<div className="container-tarjetas">
			{datosTarjetas.map((objeto, index) => (
				<Tarjeta datos={objeto} key={index} className="tarjeta-map" />
			))}
		</div>
	);
};
