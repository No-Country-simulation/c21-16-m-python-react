import React from "react";
import "./Perfil.css";

export const Perfil = () => {
  return (
    <div className="container-perfil">
      <section className="box-usuario">
        <article className=" card-usuario">
          <div className="container-img-perfil">
            <div id="perfil-img"></div>
          </div>
          <strong id="perfil-usuario">@user</strong>
          <h2 id="perfil-nombre">Benja Moreno</h2>
          <div className="perfil-emojis">
          🍇🍇🍇
          </div>
          <button className="editar-perfil">editar perfil</button>
          <p id="perfil-descripcion">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eos
            sint porro vel ab quisquam maxime culpa voluptatum, placeat dolor.
          </p>
        </article>
        <article className="item-perfil tus-gustos">
          <h5 className="container-titulo">Tus gustos</h5>
          <div className="info-articulos"></div>
        </article>
        <article className="item-perfil tus-amigos">
          <h5 className="container-titulo">Tus amigos</h5>
          <div className="info-articulos info-amigos">
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
          </div>
        </article>
        <article className="item-perfil actividad">
          <h5 className="container-titulo">Actividad</h5>
          <div className="info-articulos"></div>
        </article>
      </section>
    </div>
  );
};
