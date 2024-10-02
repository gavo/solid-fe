import React, { useState } from "react";
import close from "../assets/close.png";
import axios from "axios";

const urlBase = "http://localhost:8080/api/servicio";

const FormServicio = ({ setViewModal, servicio, refresh }) => {
  const [nombre, setNombre] = useState(servicio?.nombre || "");
  const [codigo, setCodigo] = useState(servicio?.codigo || "");
  const [precio, setPrecio] = useState(servicio?.precio || 0);

  const actionSubmit = async (evt) => {
    evt.preventDefault();

    const newServicio = {
      id: servicio?.id || undefined,
      codigo,
      nombre,
      precio,
    };

    if (servicio.id === 0) {
      await axios
        .post(urlBase, newServicio)
        .then((msj) => {
          alert("servicio Registrado Exitosamente");
          setViewModal(false);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } else {
      await axios
        .put(urlBase + "/" + servicio.id, newServicio)
        .then((msj) => {
          alert("Servicio Actualizado Exitosamente");
          setViewModal(false);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
    refresh();
    setViewModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-children">
        <img
          src={close}
          alt="close"
          className="close-icon"
          onClick={() => setViewModal(false)}
        />
        <h3>{servicio.id === 0 ? "Registrar" : "Actualizar"} Servicio</h3>
        <form className="form-generic" onSubmit={(evt) => actionSubmit(evt)}>
          <div className="form-row">
            <label htmlFor="nombre">Nombre: </label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={(evt) => setNombre(evt.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="codigo">Código: </label>
            <input
              type="text"
              id="codigo"
              placeholder="Código"
              value={codigo}
              onChange={(evt) => setCodigo(evt.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              placeholder="Precio"
              value={precio}
              onChange={(evt) => setPrecio(evt.target.value)}
            />
          </div>
          <input
            type="submit"
            value={servicio.id === 0 ? "Registrar" : "Actualizar"}
            className="mt-8"
          />
        </form>
      </div>
    </div>
  );
};

export default FormServicio;
