import React from "react";

export const Header = (props) => { // el props recibe la funcion setPagina y segun los botones podra tomar los valores de "home" o "reserva"
  return (
    <header>
      <h1>Hotel App</h1>
      <nav>
        <button onClick={() => props.setPagina("home")}>Inicio</button> {/* actualiza el estado de pagina a "home"*/}
        <button onClick={() => props.setPagina("reserva")}>Reservar</button>{/* actualiza el estado de pagina a "reserva"*/}
        <button onClick={() => props.setPagina("habitaciones")}>Habitaciones</button>
        <button onClick={() => props.setPagina("galeria")}>Galeria</button>
      </nav>
    </header>
  );
};
