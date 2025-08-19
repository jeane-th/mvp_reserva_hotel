import React, { useState } from 'react'

const roomsData = [
  { id: 1, number: "101", type: "Single", price: 50, capacity: 1, active: true },
  { id: 2, number: "102", type: "Double", price: 80, capacity: 2, active: true },
  { id: 3, number: "103", type: "Suite", price: 150, capacity: 4, active: true },
  { id: 4, number: "201", type: "Single", price: 50, capacity: 1, active: true },
  { id: 5, number: "202", type: "Double", price: 80, capacity: 2, active: true },
  { id: 6, number: "203", type: "Suite", price: 150, capacity: 4, active: true },
  { id: 7, number: "301", type: "Single", price: 50, capacity: 1, active: true },
  { id: 8, number: "302", type: "Double", price: 80, capacity: 2, active: true },
  { id: 9, number: "303", type: "Suite", price: 150, capacity: 4, active: true },
  { id: 10, number: "401", type: "Single", price: 50, capacity: 1, active: true },
  { id: 11, number: "402", type: "Double", price: 80, capacity: 2, active: true },
  { id: 12, number: "403", type: "Suite", price: 150, capacity: 4, active: true },
];


export const Reserva = () => {

 const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [step, setStep] = useState("search"); // search | results | reserve | summary | confirm
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "" });
  const [reservaFinal, setReservaFinal] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  // 🔹 Agrupamos habitaciones por tipo
  const roomTypes = Array.from(
    new Set(roomsData.map((room) => room.type))
  ).map((type) => {
    const roomsOfType = roomsData.filter((r) => r.type === type && r.active);
    return {
      type,
      price: roomsOfType[0]?.price || 0,
      capacity: roomsOfType[0]?.capacity || 0,
      stock: roomsOfType.length,
    };
  });

  // 🔹 Agregar una habitación de cierto tipo (asigna la primera libre)
  const addRoom = (type) => {
    const available = roomsData.find(
      (r) =>
        r.type === type &&
        r.active &&
        !selectedRooms.some((sel) => sel.id === r.id)
    );

    if (!available) {
      alert("No hay más habitaciones disponibles de este tipo");
      return;
    }

    setSelectedRooms([...selectedRooms, available]);
  };

  // 🔹 Quitar una habitación (libera ese número específico)
  const removeRoom = (room) => {
    const idx = selectedRooms.findIndex((r) => r.id === room.id);
    if (idx !== -1) {
      const newSelection = [...selectedRooms];
      newSelection.splice(idx, 1);
      setSelectedRooms(newSelection);
    }
  };

  // 🔹 Confirmar finalmente la reserva
  const confirmarReserva = () => {
    const nuevasReservas = selectedRooms.map((room) => ({
      id: reservas.length + Math.random(),
      roomId: room.id,
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      checkIn,
      checkOut,
    }));

    setReservas([...reservas, ...nuevasReservas]);
    setReservaFinal({ ...formData, checkIn, checkOut, rooms: selectedRooms });
    setStep("confirm");
  };

  // 🔹 Resetear todo
  const cancelarTodo = () => {
    setCheckIn("");
    setCheckOut("");
    setStep("search");
    setSelectedRooms([]);
    setReservas([]);
    setFormData({ nombre: "", email: "", telefono: "" });
    setReservaFinal(null);
  };

  // 🔹 Calcular total
  const total = selectedRooms.reduce((acc, room) => acc + room.price, 0);

  return (
    <>
      <h2>Reservar una habitación</h2>
      <p>Aquí irá el formulario de reserva.</p>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Reservas Hotel Demo</h1>

      {step === "search" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOut && e.target.value > checkOut) {
                setCheckOut("");
              }
            }}
          />
          <input
            type="date"
            value={checkOut}
            min={checkIn || today}
            onChange={(e) => setCheckOut(e.target.value)}
          />
          <button
            onClick={() => setStep("results")}
            disabled={!checkIn || !checkOut}
          >
            Buscar
          </button>
        </div>
      )}

      {step === "results" && (
        <div style={{ display: "flex", gap: "20px" }}>
          {/* 🔹 Listado de tipos de habitaciones */}
          <div style={{ flex: 2 }}>
            <h2>Habitaciones disponibles</h2>
            {roomTypes.length === 0 && <p>No hay disponibilidad</p>}
            {roomTypes.map((room) => {
              const alreadySelected = selectedRooms.filter(
                (r) => r.type === room.type
              ).length;
              const remaining = room.stock - alreadySelected;

              return (
                <div
                  key={room.type}
                  style={{
                    border: "1px solid #ccc",
                    margin: "5px",
                    padding: "10px",
                  }}
                >
                  <p>
                    <b>Tipo:</b> {room.type}
                  </p>
                  <p>
                    <b>Precio:</b> ${room.price}
                  </p>
                  <p>
                    <b>Capacidad:</b> {room.capacity}
                  </p>
                  <p>
                    <b>Disponibles:</b> {remaining}
                  </p>
                  <button
                    onClick={() => addRoom(room.type)}
                    disabled={remaining <= 0}
                  >
                    Añadir
                  </button>
                </div>
              );
            })}
          </div>

          {/* 🔹 Carrito */}
          <div style={{ flex: 1, border: "2px solid #000", padding: "10px" }}>
            <h3>🛒 Habitaciones seleccionadas</h3>
            {selectedRooms.length === 0 && <p>No hay habitaciones aún</p>}
            <ul>
              {selectedRooms.map((room, idx) => (
                <li key={idx}>
                  {room.number} - {room.type} (${room.price})
                  <button
                    onClick={() => removeRoom(room)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            {selectedRooms.length > 0 && (
              <>
                <p>
                  <b>Total:</b> ${total}
                </p>
                <button
                  onClick={() => setStep("reserve")}
                  style={{ marginTop: "10px" }}
                >
                  Continuar con la reserva
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {step === "reserve" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h2>Datos de la Reserva</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={(e) =>
              setFormData({ ...formData, telefono: e.target.value })
            }
          />
          <button onClick={() => setStep("summary")}>Continuar</button>
        </div>
      )}

      {step === "summary" && (
        <div style={{ border: "1px solid #000", padding: "20px", marginTop: "20px" }}>
          <h2>📋 Resumen de Reserva</h2>
          <p><b>Nombre:</b> {formData.nombre}</p>
          <p><b>Email:</b> {formData.email}</p>
          <p><b>Teléfono:</b> {formData.telefono}</p>
          <p><b>Check-In:</b> {checkIn}</p>
          <p><b>Check-Out:</b> {checkOut}</p>

          <h3>Habitaciones seleccionadas:</h3>
          <ul>
            {selectedRooms.map((room, idx) => (
              <li key={idx}>
                Habitación {room.number} ({room.type}) – ${room.price}
              </li>
            ))}
          </ul>

          <p><b>Total:</b> ${total}</p>

          <button onClick={confirmarReserva} style={{ background: "green", color: "white" }}>
            ✅ Confirmar
          </button>
          <button
            onClick={cancelarTodo}
            style={{ marginLeft: "10px", background: "red", color: "white" }}
          >
            ❌ Cancelar
          </button>
        </div>
      )}

      {step === "confirm" && reservaFinal && (
        <div style={{ border: "1px solid #000", padding: "20px", marginTop: "20px" }}>
          <h2>🎉 Reserva Confirmada</h2>
          <p><b>Nombre:</b> {reservaFinal.nombre}</p>
          <p><b>Email:</b> {reservaFinal.email}</p>
          <p><b>Teléfono:</b> {reservaFinal.telefono}</p>
          <p><b>Check-In:</b> {reservaFinal.checkIn}</p>
          <p><b>Check-Out:</b> {reservaFinal.checkOut}</p>

          <h3>Habitaciones reservadas:</h3>
          <ul>
            {reservaFinal.rooms.map((room, idx) => (
              <li key={idx}>
                Habitación {room.number} ({room.type}) – ${room.price}
              </li>
            ))}
          </ul>

          <p><b>Total:</b> ${reservaFinal.rooms.reduce((acc, r) => acc + r.price, 0)}</p>

          <button onClick={() => window.print()}>🖨️ Imprimir / Guardar como PDF</button>
        </div>
      )}
    </div>
    </>
  )
}
