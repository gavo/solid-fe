import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

const SharedDataProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [total, setTotal] = useState(0);
  const [clientes, setClientes] = useState([]);

  const [refreshClients, setRefreshClientes] = useState(false);
  const reloadClientes = () => {
    setRefreshClientes((val) => !val);
  };

  useEffect(() => {
    cargarClientes();
  }, [refreshClients]);

  const cargarClientes = async () => {
    const resultado = await axios.get("http://localhost:8080/api/cliente");
    setClientes(resultado.data);
  };

  return (
    <DataContext.Provider
      value={{
        productos,
        setProductos,
        servicios,
        setServicios,
        total,
        setTotal,
        clientes,
        reloadClientes,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default SharedDataProvider;
