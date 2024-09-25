import React, { useRef } from "react";
import close from "../assets/close.png";

export const SimpleObjectForm = ({
  title,
  idObject,
  parameterName,
  parameterValue,
  setViewModal,
  saveValue,
}) => {
  const inputRef = useRef(null);

  const save = (evt) => {
    saveValue(idObject, inputRef.current.value);
    console.log("update");
    evt.preventDefault();
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
        <h3>{title}</h3>
        <form className="form-simple-object" onSubmit={(evt) => save(evt)}>
          <div className="parameter-simple-object">
            <label htmlFor="pValue">{parameterName}</label>
            <input
              id="pValue"
              type="text"
              defaultValue={parameterValue}
              ref={inputRef}
            />
          </div>
          <input type="submit" value="Aceptar" />
        </form>
      </div>
    </div>
  );
};
