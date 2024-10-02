import React, { useState } from "react";
import close from "../assets/close.png";
import axios from "axios";

const urlBase = "http://localhost:8080/api/servicio";

const FormProdVenta = ({ setViewModal, producto }) => {
  const [cantidad, setCantidad] = useState(producto?.cantidad || "");
  const [descuento, setDescuento] = useState(producto?.descuento || 0);

  const handleSubmit = (evt) => {
    producto.cantidad = cantidad;
    producto.descuento = descuento;

    evt.preventDefault();
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
        <h3>Producto a Vender</h3>
        <form className="form-generic" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="nombre">Nombre: </label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre"
              value={producto?.producto?.nombre}
              disabled={true}
            />
          </div>
          <div className="form-row">
            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              placeholder="Precio"
              value={producto?.precio}
              disabled={true}
            />
          </div>
          <div className="form-row">
            <label htmlFor="cantidad">Cantidad: </label>
            <input
              type="text"
              id="cantidad"
              placeholder="Código"
              value={cantidad}
              onChange={(evt) => setCantidad(evt.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="descuento">Descuento</label>
            <input
              type="number"
              id="descuento"
              placeholder="Precio"
              value={descuento}
              onChange={(evt) => setDescuento(evt.target.value)}
            />
          </div>
          <input type="submit" value="Aceptar" className="mt-8" />
        </form>
      </div>
    </div>
  );
};

export default FormProdVenta;
