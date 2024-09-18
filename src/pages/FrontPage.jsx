import React from "react";
import task from "../assets/task.jpg";

const FrontPage = () => {
  return (
    <>
      <h1>Principios Solid</h1>
      <p>
        Desarrollar una aplicación Escritorio/Web para poder registrar los datos
        maestro de un producto. Donde los campos mínimos son lo definido en la
        clase base de ejemplo Aplicar programación en capas. Aplicar los
        principios SOLID. Deben realizar una presentación donde mencione en que
        parte utilizaron los principios SOLID y exponer.
      </p>
      <img alt="tarea" src={task} />
    </>
  );
};

export default FrontPage;
