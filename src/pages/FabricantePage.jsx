import axios from "axios";
import React, { useEffect, useState } from "react";
import { SimpleObjectForm } from "../components/SimpleObjectForm";

const urlBase = "http://localhost:8080/api/fabricante";
const newFabricante = { id: 0, nombre: "" };

const FabricantePage = () => {
  const [fabricantes, setFabricantes] = useState([]);
  const [select, setSelect] = useState(newFabricante);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [refresh, setRefresh] = useState(false);

  const submitFabricante = async (id, nFabricante) => {
    if (!nFabricante) {
      alert("Debe especificar el nombre del fabricante");
      return;
    }
    const fabricante = { nombre: nFabricante };
    if (id) {
      fabricante.id = id;
      await axios
        .put(urlBase + "/" + id, fabricante)
        .then((obj) => {
          alert("Fabricante " + obj.data.nombre + " actualizado exitosamente");
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } else {
      await axios
        .post(urlBase, fabricante)
        .then((obj) => {
          alert("Fabricante " + obj.data.nombre + " Registrado exitosamente");
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
    setModal(false);
    setRefresh((v) => !v);
  };

  useEffect(() => {
    cargarFabricantes();
  }, [refresh]);

  const cargarFabricantes = async () => {
    const resultado = await axios.get(urlBase);
    setFabricantes(resultado.data);
  };

  const showFormFabricante = (fabricante) => {
    setSelect(fabricante);
    setModal(true);
  };

  return (
    <div className="container">
      <h2>Lista de Fabricantes</h2>
      <input
        type="text"
        placeholder="Filtrar nombre Fabricante"
        value={filter}
        onChange={(evt) => setFilter(evt.target.value)}
      />
      <button onClick={() => showFormFabricante(newFabricante)}>Agregar</button>
      <table>
        <thead>
          <tr>
            <th>Nro</th>
            <th className="full-width">Nombre</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {fabricantes
            .filter((f) =>
              f.nombre.toLowerCase().includes(filter.toLowerCase())
            )
            .map((fabricante, key) => {
              return (
                <tr key={key}>
                  <td>{fabricante.id}</td>
                  <td className="column-name full-width">
                    {fabricante.nombre}
                  </td>
                  <td>
                    <button onClick={() => showFormFabricante(fabricante)}>
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
          title={(select.id == 0 ? "Registrar" : "Actualizar") + " Fabricante"}
          setViewModal={setModal}
          saveValue={submitFabricante}
          parameterName="Nombre"
          parameterValue={select.nombre}
          idObject={select.id}
        />
      )}
    </div>
  );
};

export default FabricantePage;
