import axios from "axios";
import React, { useEffect, useState } from "react";

const urlBase = "http://localhost:8080/api/grupo-productos";
const GrupoProductoPage = () => {
  const [nombre, setNombre] = useState("");
  const [grupoProductos, setGrupoProductos] = useState([]);
  const [newF, setNewF] = useState(false);
  const submitNewGrupoProductos = async (evt) => {
    evt.preventDefault();
    const fabricante = { nombre };
    await axios.post(urlBase, fabricante);
    alert("Grupo de Productos Registrado exitosamente");
    setNewF((v) => !v);
  };

  useEffect(() => {
    cargarGrupoProductos();
  }, [newF]);

  const cargarGrupoProductos = async () => {
    const resultado = await axios.get(urlBase);
    setGrupoProductos(resultado.data);
  };

  return (
    <div className="container">
      <h2>Lista de Grupo de Productos</h2>
      <input
        type="text"
        placeholder="Nuevo Grupo de Productos"
        value={nombre}
        onChange={(evt) => setNombre(evt.target.value)}
      />
      <button onClick={(evt) => submitNewGrupoProductos(evt)}>Agregar</button>
      <table>
        <thead>
          <tr>
            <th>Nro</th>
            <th className="full-width">Nombre</th>
          </tr>
        </thead>
        <tbody>
          {grupoProductos.map((grupoProductos, key) => {
            return (
              <tr key={key}>
                <td>{grupoProductos.id}</td>
                <td className="column-name full-width">
                  {grupoProductos.nombre}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GrupoProductoPage;
