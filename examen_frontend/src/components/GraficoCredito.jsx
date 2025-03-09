import React, { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";

function GraficoCredito() {
  const [grafico, setGrafico] = useState("");

  useEffect(() => {
    const fetchGrafico = async () => {
      try {
        const response = await axiosInstance.get("/grafico/creditos");
        setGrafico(response.data.grafico); // El gráfico base64
      } catch (error) {
        console.error("Error al obtener el gráfico", error);
      }
    };

    fetchGrafico();
  }, []);

  return (
    <div>
      <h2>Total de Créditos Otorgados</h2>
      <img src={`data:image/png;base64,${grafico}`} alt="Gráfico de Créditos" />
    </div>
  );
}

export default GraficoCredito;
