import { useState } from "react";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Reserva } from "./pages/Reserva";
import { Habitaciones } from "./pages/Habitaciones";
import { Galeria } from "./pages/Galeria";

function App() {
  const [pagina, setPagina] = useState("home"); // definimos un estado llamado "pagina" y empieza con valor "home"
  let contenido; 

  if (pagina === "home") { // Logica: si el valor de pagina es home renderiza el contenido "home", sino renderiza "reserva"
    contenido = <Home setPagina={setPagina} />; 
  }  if (pagina === "reserva")
    contenido = <Reserva setPagina={setPagina} />; 
      if (pagina === "habitaciones")
    contenido = <Habitaciones setPagina={setPagina} />; 
   else if (pagina === "galeria") {
    contenido = <Galeria />;
  }

  return (
    <>
      <Header setPagina={setPagina} /> {/* Enviamos la setPagina al Header */}
      {contenido} {/*Aqui dependiento del valor que tome la variable "contenido" se rederiza "Home" o "Reserva" */}
    </>
  );
}

export default App;
