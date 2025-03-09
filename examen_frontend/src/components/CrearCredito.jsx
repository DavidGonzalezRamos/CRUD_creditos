import React, { useState } from "react";
import axiosInstance from "../axios/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function CrearCredito() {
  const [cliente, setCliente] = useState("");
  const [monto, setMonto] = useState("");
  const [tasaInteres, setTasaInteres] = useState("");
  const [plazo, setPlazo] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/creditos", {
        cliente,
        monto,
        tasa_interes: tasaInteres,
        plazo,
      });
      toast.success(response.data.mensaje);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar el crédito");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Registrar Crédito
      </h2>
      {/* Botón para regresar al Dashboard */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Regresar al Dashboard
      </button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Tasa de Interés"
          value={tasaInteres}
          onChange={(e) => setTasaInteres(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Plazo"
          value={plazo}
          onChange={(e) => setPlazo(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Registrar Crédito
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CrearCredito;
