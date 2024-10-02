import axios from "axios";
import React, { useEffect, useState } from "react";
import FormServicio from "../components/FormServicio";

const urlBase = "http://localhost:8080/api/servicio";
const newServicio = { id: 0, nombre: "", precio: 0, codigo: "" };

const ServicioPage = () => {
  const [servicios, setServicios] = useState([]);
  const [select, setSelect] = useState(newServicio);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    cargarServicios();
  }, [refresh]);

  const cargarServicios = async () => {
    const resultado = await axios.get(urlBase);
    setServicios(resultado.data);
  };

  const showFormFabricante = (fabricante) => {
    setSelect(fabricante);
    setModal(true);
  };

  return (
    <div className="container">
      <h2>Lista de Servicios</h2>
      <input
        type="text"
        placeholder="Filtrar nombre Servicios"
        value={filter}
        onChange={(evt) => setFilter(evt.target.value)}
      />
      <button onClick={() => showFormFabricante(newServicio)}>Agregar</button>
      <table>
        <thead>
          <tr>
            <th>Nro</th>
            <th>Código</th>
            <th className="full-width">Nombre</th>
            <th>Precio</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {servicios
            .filter((f) =>
              f.nombre.toLowerCase().includes(filter.toLowerCase())
            )
            .map((servicio, key) => {
              return (
                <tr key={key}>
                  <td>{servicio.id}</td>
                  <td>{"codigo"}</td>
                  <td className="column-name full-width">{servicio.nombre}</td>
                  <td>{servicio.precio}</td>
                  <td>
                    <button onClick={() => showFormFabricante(servicio)}>
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {modal && (
        <FormServicio
          servicio={select}
          setViewModal={setModal}
          refresh={setRefresh}
        />
      )}
    </div>
  );
};

export default ServicioPage;
