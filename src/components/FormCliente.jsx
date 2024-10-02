import React, { useEffect, useState } from "react";
import close from "../assets/close.png";
import axios from "axios";

const urlBase = "http://localhost:8080/api/cliente";

const FormCliente = ({ setViewModal, cliente, refresh }) => {
  const [nombre, setNombre] = useState(cliente?.nombre || "");
  const [code, setCode] = useState(cliente?.code || "");
  const [documento, setDocumento] = useState(cliente?.documento || "");
  const [tipoDocumento, setTipoDocumento] = useState(
    cliente?.tipoDocumento || "CI"
  );
  const [email, setEmail] = useState(cliente?.email || "");

  const actionSubmit = async (evt) => {
    evt.preventDefault();

    const newCliente = {
      id: cliente?.id || undefined,
      nombre,
      code,
      documento,
      tipoDocumento,
      email,
    };

    if (cliente.id === 0) {
      await axios
        .post(urlBase, newCliente)
        .then((msj) => {
          alert("cliente Registrado Exitosamente");
          setViewModal(false);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } else {
      await axios
        .put(urlBase + "/" + cliente.id, newCliente)
        .then((msj) => {
          alert("cliente Actualizado Exitosamente");
          setViewModal(false);
        })
        .catch((error) => {
          console.log(error);

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
        <h3>{cliente.id === 0 ? "Registrar" : "Actualizar"} cliente</h3>
        <form className="form-generic" onSubmit={(evt) => actionSubmit(evt)}>
          <div className="form-row">
            <label htmlFor="code">Código: </label>
            <input
              type="text"
              id="code"
              placeholder="Código"
              value={code}
              onChange={(evt) => setCode(evt.target.value)}
            />
          </div>
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
            <label htmlFor="tipo-documento">Tipo de Documento</label>
            <select
              id="tipo-documento"
              value={tipoDocumento}
              onChange={(evt) => setTipoDocumento(evt.target.value)}
            >
              <option value="CI">CI</option>
              <option value="NIT">NIT</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="documento">documento</label>
            <input
              type="text"
              id="documento"
              placeholder="documento"
              value={documento}
              onChange={(evt) => setDocumento(evt.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="email"
              autocomplete="off"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </div>
          <input
            type="submit"
            value={cliente.id === 0 ? "Registrar" : "Actualizar"}
            className="mt-8"
          />
        </form>
      </div>
    </div>
  );
};

export default FormCliente;
