import React from 'react'

export const Home = (props) => {
  return (
    <>
      <h2>Bienvenido al Hotel</h2>
      <p>Esta es la página de inicio. Desde aquí puedes ir a hacer tu reserva.</p>
      <button onClick={() => props.setPagina("reserva")}>Reservar</button>{/* actualiza el estado de pagina a "reserva"*/}
    </>
  )
}
