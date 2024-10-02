import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import FormCliente from "../components/FormCliente";
import { DataContext } from "../contexts/SharedData";

const newCliente = {
  id: 0,
  nombre: "",
  code: "",
  documento: "",
  tipoDocumento: "",
  email: "",
};

const ClientesPage = () => {
  const { clientes, reloadClientes } = useContext(DataContext);
  const [select, setSelect] = useState(newCliente);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("");

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
        id="filter-cliente"
      />
      <button
        onClick={() => showFormCliente(newCliente)}
        id="btn-cliente-page-add"
      >
        Agregar
      </button>
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
          refresh={reloadClientes}
        />
      )}
    </div>
  );
};

export default ClientesPage;
