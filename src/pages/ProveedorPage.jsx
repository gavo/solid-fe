import axios from "axios";
import React, { useEffect, useState } from "react";
import { SimpleObjectForm } from "../components/SimpleObjectForm";

const urlBase = "http://localhost:8080/api/proveedor";
const newProveedor = { id: 0, nombre: "" };

const ProveedorPage = () => {
  const [proveedores, setProveedores] = useState([]);
  const [select, setSelect] = useState(newProveedor);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [refresh, setRefresh] = useState(false);

  const submitProveedor = async (id, nProveedor) => {
    const proveedor = { nombre: nProveedor };
    if (id === 0) {
      await axios
        .post(urlBase, proveedor)
        .then((msj) => {
          alert("Proveedor Registrado exitosamente");
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } else {
      proveedor.id = id;
      await axios
        .put(urlBase + "/" + id, proveedor)
        .then((msj) => {
          alert("Proveedor actualizado exitosamente");
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
    setModal(false);
    setRefresh((v) => !v);
  };

  useEffect(() => {
    cargarProveedores();
  }, [refresh]);

  const cargarProveedores = async () => {
    const resultado = await axios.get(urlBase);
    setProveedores(resultado.data);
  };

  const showFormProveedor = (proveedor) => {
    setSelect(proveedor);
    setModal(true);
  };

  return (
    <div className="container">
      <h2>Lista de Proveedores</h2>
      <input
        type="text"
        placeholder="Filtrar nombre Proveedor"
        value={filter}
        onChange={(evt) => setFilter(evt.target.value)}
      />
      <button onClick={(evt) => showFormProveedor(newProveedor)}>
        Agregar
      </button>
      <table>
        <thead>
          <tr>
            <th>Nro</th>
            <th className="full-width">Nombre</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {proveedores
            .filter((p) =>
              p.nombre.toLowerCase().includes(filter.toLowerCase())
            )
            .map((proveedor, key) => {
              return (
                <tr key={key}>
                  <td>{proveedor.id}</td>
                  <td className="column-name full-width">{proveedor.nombre}</td>
                  <td>
                    <button onClick={() => showFormProveedor(proveedor)}>
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {modal && (
        <SimpleObjectForm
          title={(select.id == 0 ? "Registrar" : "Actualizar") + " Proveedor"}
          setViewModal={setModal}
          saveValue={submitProveedor}
          parameterName="Nombre"
          parameterValue={select.nombre}
          idObject={select.id}
        />
      )}
    </div>
  );
};

export default ProveedorPage;
