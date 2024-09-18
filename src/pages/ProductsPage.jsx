import axios from "axios";
import React, { useEffect, useState } from "react";

const urlBase = "http://localhost:8080/api/producto";
const ProductsPage = () => {
  const [productos, setProductos] = useState([]);
  const [newF, setNewF] = useState(false);

  useEffect(() => {
    cargarProductos();
  }, [newF]);

  const cargarProductos = async () => {
    const resultado = await axios.get(urlBase);
    setProductos(resultado.data);
  };

  return (
    <div className="big-container">
      <h2>Lista de Productos</h2>

      <button onClick={(evt) => console.log("Nuevo producto")}>Agregar</button>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th className="">Nombre</th>
            <th className="">Nombre Extranjero</th>
            <th className="">Cod Barra</th>
            <th className="">Precio Lista</th>
            <th className="">Peso</th>
            <th className="">UM</th>
            <th className="">Fabricante</th>
            <th className="">Proveedor</th>
            <th className="">Alternante</th>
            <th className="">Grupo</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, key) => {
            console.log(producto);

            return (
              <tr key={key}>
                <td>{producto.id}</td>
                <td className="">{producto.nombre}</td>
                <td className="">{producto.nombreExtranjero}</td>
                <td className="">{producto.codBarra}</td>
                <td className="">{producto.precioLista}</td>
                <td className="">{producto.peso}</td>
                <td className="">{producto.um}</td>
                <td className="">{producto.fabricante?.nombre}</td>
                <td className="">{producto.proveedor?.nombre}</td>
                <td className="">{producto.alternante?.nombre}</td>
                <td className="">{producto.grupoProducto?.nombre}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
