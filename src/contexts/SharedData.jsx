import React, { createContext, useState } from "react";

export const DataContext = createContext(null);

const SharedDataProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [total, setTotal] = useState(0);
  const [cliente, setCliente] = useState(undefined);

  return (
    <DataContext.Provider
      value={[
        productos,
        setProductos,
        servicios,
        setServicios,
        total,
        setTotal,
        cliente,
        setCliente,
      ]}
    >
      {children}
    </DataContext.Provider>
  );
};

export default SharedDataProvider;
