import axios from "axios";
import React, { useEffect, useState } from "react";

const urlBase = "http://localhost:8080/api/fabricante";

const FabricantePage = () => {
  const [nombre, setNombre] = useState("");
  const [fabricantes, setFabricantes] = useState([]);
  const [newF, setNewF] = useState(false);
  const submitNewFabricante = async (evt) => {
    evt.preventDefault();
    const fabricante = { nombre };
    await axios.post(urlBase, fabricante);
    alert("Fabricante Registrado exitosamente");
    setNewF((v) => !v);
  };

  useEffect(() => {
    cargarFabricantes();
  }, [newF]);

  const cargarFabricantes = async () => {
    const resultado = await axios.get(urlBase);
    setFabricantes(resultado.data);
  };

  return (
    <div className="container">
      <h2>Lista de Fabricantes</h2>
      <input
        type="text"
        placeholder="Nuevo Fabricante"
        value={nombre}
        onChange={(evt) => setNombre(evt.target.value)}
      />
      <button onClick={(evt) => submitNewFabricante(evt)}>Agregar</button>
      <table>
        <thead>
          <tr>
            <th>Nro</th>
            <th className="full-width">Nombre</th>
          </tr>
        </thead>
        <tbody>
          {fabricantes.map((fabricante, key) => {
            return (
              <tr key={key}>
                <td>{fabricante.id}</td>
                <td className="column-name full-width">{fabricante.nombre}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FabricantePage;
