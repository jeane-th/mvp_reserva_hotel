import React from 'react'

export const Navbar = ({setPagina}) => {
    return (
        <>
            <nav>
                <button onClick={() => setPagina("home")}>Inicio</button> {/* actualiza el estado de pagina a "home"*/}
                <button onClick={() => setPagina("reserva")}>Reservar</button>{/* actualiza el estado de pagina a "reserva"*/}
                <button onClick={() => setPagina("habitaciones")}>Habitaciones</button>
                <button onClick={() => setPagina("galeria")}>Galeria</button>
            </nav>
        </>
    )
}
