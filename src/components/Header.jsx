import React from "react";
import { Navbar } from "./Navbar";

export const Header = ({setPagina}) => { // el props recibe la funcion setPagina y segun los botones podra tomar los valores de "home" o "reserva"
  return (
    <header>
      <h1>Hotel App</h1>
      <Navbar setPagina={setPagina}></Navbar>
    </header>
  );
};
