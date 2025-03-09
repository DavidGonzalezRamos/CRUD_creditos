import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CrearCredito from "./components/CrearCredito";
import ListarCredito from "./components/ListarCredito";
import EditarCredito from "./components/EditarCredito";
import EliminarCredito from "./components/EliminarCredito";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/crear" element={<CrearCredito />} />
        <Route path="/creditos" element={<ListarCredito />} />
        <Route path="/editar/:id" element={<EditarCredito />} />
        <Route path="/eliminar/:id" element={<EliminarCredito />} />
      </Routes>
    </Router>
  );
}

export default App;
