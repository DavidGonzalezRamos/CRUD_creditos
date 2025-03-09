import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ListarCredito() {
  const [creditos, setCreditos] = useState([]);
  const navigate = useNavigate(); // Para la redirección

  useEffect(() => {
    const fetchCreditos = async () => {
      try {
        const response = await axiosInstance.get("/creditos");
        setCreditos(response.data);
      } catch (error) {
        console.error(error);
        alert("Error al obtener los créditos");
      }
    };

    fetchCreditos();
  }, []);

  // Función para eliminar un crédito
  const handleEliminarCredito = async (id) => {
    try {
      const response = await axiosInstance.delete(`/creditos/${id}`);
      toast.success(response.data.mensaje);
      setCreditos(creditos.filter((credito) => credito.id !== id)); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar el crédito");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Lista de Créditos
      </h2>

      {/* Botón para regresar al Dashboard */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Regresar al Dashboard
      </button>

      {/* Lista de Créditos */}
      <ul className="space-y-4">
        {creditos.map((credito) => (
          <li
            key={credito.id}
            className="p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
          >
            <div className="flex justify-between">
              <span className="font-semibold">{credito.cliente}</span>
              <span className="text-gray-500">-${credito.monto}</span>
            </div>
            <div className="text-sm text-gray-700">
              Tasa de Interés: {credito.tasa_interes}% | Plazo: {credito.plazo}{" "}
              meses
            </div>

            {/* Botón para editar el crédito */}
            <button
              onClick={() => navigate(`/editar/${credito.id}`)}
              className="mt-2 mr-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Editar
            </button>

            {/* Botón para eliminar el crédito */}
            <button
              onClick={() => handleEliminarCredito(credito.id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}

export default ListarCredito;
