import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";

function EliminarCredito() {
  const [creditos, setCreditos] = useState([]);

  useEffect(() => {
    fetchCreditos();
  }, []);

  const fetchCreditos = async () => {
    try {
      const response = await axiosInstance.get("/creditos");
      setCreditos(response.data);
    } catch (error) {
      console.error(error);
      alert("Error al obtener los créditos");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este crédito?")) {
      return;
    }

    try {
      const response = await axiosInstance.delete(`/creditos/${id}`);
      alert(response.data.mensaje);
      setCreditos(creditos.filter((credito) => credito.id !== id)); // Elimina el crédito de la lista
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el crédito");
    }
  };

  return (
    <div>
      <h2>Eliminar Créditos</h2>
      <ul>
        {creditos.map((credito) => (
          <li key={credito.id}>
            {credito.cliente} - ${credito.monto} - {credito.tasa_interes}% -{" "}
            {credito.plazo} meses
            <button
              onClick={() => handleDelete(credito.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EliminarCredito;
