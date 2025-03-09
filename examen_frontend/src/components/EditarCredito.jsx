import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axios";
import { toast, ToastContainer } from "react-toastify"; // Importar Toastify
import "react-toastify/dist/ReactToastify.css"; // Importar los estilos de Toastify

function EditarCredito() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState("");
  const [monto, setMonto] = useState("");
  const [tasaInteres, setTasaInteres] = useState("");
  const [plazo, setPlazo] = useState("");

  useEffect(() => {
    const fetchCredito = async () => {
      try {
        const response = await axiosInstance.get(`/creditos/${id}`);
        setCliente(response.data.cliente);
        setMonto(response.data.monto);
        setTasaInteres(response.data.tasa_interes);
        setPlazo(response.data.plazo);
      } catch (error) {
        console.error(error);
        toast.error("Error al obtener el crédito"); // Usar Toastify
      }
    };

    fetchCredito();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/creditos/${id}`, {
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
      toast.error("Error al actualizar el crédito");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Editar Crédito</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Cliente
          </label>
          <input
            type="text"
            placeholder="Cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Monto
          </label>
          <input
            type="number"
            placeholder="Monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tasa de Interés
          </label>
          <input
            type="number"
            placeholder="Tasa de Interés"
            value={tasaInteres}
            onChange={(e) => setTasaInteres(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Plazo
          </label>
          <input
            type="number"
            placeholder="Plazo"
            value={plazo}
            onChange={(e) => setPlazo(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Actualizar Crédito
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default EditarCredito;
