import axios from "axios";
import React, { useEffect, useState } from "react";

const urlBase = "http://localhost:8080/api/proveedor";

const ProveedorPage = () => {
  const [nombre, setNombre] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [newF, setNewF] = useState(false);

  const onNewProveedor = async (evt) => {
    evt.preventDefault();
    const proveedor = { nombre };
    await axios.post(urlBase, proveedor);
    alert("Proveedor Registrado exitosamente");
    setNewF((v) => !v);
  };

  useEffect(() => {
    cargarProveedores();
  }, [newF]);

  const cargarProveedores = async () => {
    const resultado = await axios.get(urlBase);
    setProveedores(resultado.data);
  };

  return (
    <div className="container">
      <h2>Lista de Proveedores</h2>
      <input
        type="text"
        placeholder="Nuevo Proveedor"
        value={nombre}
        onChange={(evt) => setNombre(evt.target.value)}
      />
      <button onClick={(evt) => onNewProveedor(evt)}>Agregar</button>
      <table>
        <thead>
          <tr>
            <th>Nro</th>
            <th className="full-width">Nombre</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor, key) => {
            return (
              <tr key={key}>
                <td>{proveedor.id}</td>
                <td className="column-name full-width">{proveedor.nombre}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProveedorPage;
