import axios from "axios";
import React, { useEffect, useState } from "react";
import FormServicio from "../components/FormServicio";
import FormCliente from "../components/FormCliente";

const urlBase = "http://localhost:8080/api/cliente";
const newCliente = {
  id: 0,
  nombre: "",
  code: "",
  documento: "",
  tipoDocumento: "",
  email: "",
};

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [select, setSelect] = useState(newCliente);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    cargarClientes();
  }, [refresh]);

  const cargarClientes = async () => {
    const resultado = await axios.get(urlBase);
    setClientes(resultado.data);
  };

  const showFormCliente = (fabricante) => {
    setSelect(fabricante);
    setModal(true);
  };

  return (
    <div className="container">
      <h2>Gestión de Clientes</h2>
      <input
        type="text"
        placeholder="Filtrar Nombre Cliente"
        value={filter}
        onChange={(evt) => setFilter(evt.target.value)}
      />
      <button onClick={() => showFormCliente(newCliente)}>Agregar</button>
      <table>
        <thead>
          <tr>
            <th>Nro</th>
            <th>Código</th>
            <th className="full-width">Nombre</th>
            <th>Documento</th>
            <th>Email</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {clientes
            .filter((f) =>
              f.nombre.toLowerCase().includes(filter.toLowerCase())
            )
            .map((cliente, key) => {
              return (
                <tr key={key}>
                  <td>{cliente.id}</td>
                  <td>{cliente.code}</td>
                  <td className="column-name full-width">{cliente.nombre}</td>
                  <td>{cliente.tipoDocumento + ": " + cliente.documento}</td>
                  <td>{cliente.email}</td>
                  <td>
                    <button onClick={() => showFormCliente(cliente)}>
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {modal && (
        <FormCliente
          cliente={select}
          setViewModal={setModal}
          refresh={setRefresh}
        />
      )}
    </div>
  );
};

export default ClientesPage;
