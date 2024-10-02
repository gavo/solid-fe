import React, { useState } from "react";
import close from "../assets/close.png";

const FormServVenta = ({ setViewModal, servicio }) => {
  const [observaciones, setObservaciones] = useState(
    servicio?.observaciones || ""
  );
  const [descuento, setDescuento] = useState(servicio?.descuento || 0);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    servicio.descuento = descuento;
    servicio.observaciones = observaciones;
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
        <h3>Servicio a Realizar</h3>
        <form className="form-generic" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="nombre">Nombre: </label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre"
              value={servicio?.servicio?.nombre}
              disabled={true}
            />
          </div>
          <div className="form-row">
            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              placeholder="Precio"
              value={servicio?.precio}
              disabled={true}
            />
          </div>
          <div className="form-row">
            <label htmlFor="observaciones">Observaciones: </label>
            <textarea
              id="observaciones"
              name="observaciones"
              rows="4"
              cols="24"
              placeholder="Observaciones"
              value={observaciones}
              onChange={(evt) => setObservaciones(evt.target.value)}
            ></textarea>
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

export default FormServVenta;
