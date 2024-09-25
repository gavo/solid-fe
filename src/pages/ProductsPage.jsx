import axios from "axios";
import React, { useEffect, useState } from "react";
import FormProduct from "../components/FormProduct";

const urlBase = "http://localhost:8080/api/producto";
const newProduct = {
  id: 0,
  nombre: "",
  nombreExtranjero: "",
  peso: 0,
  codBarra: "",
  um: "",
  precioLista: 1,
  grupoProducto: null,
  proveedor: null,
  fabricante: null,
  alternante: null,
};

const ProductsPage = () => {
  const [productos, setProductos] = useState([]);
  const [select, setSelect] = useState(newProduct);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    cargarProductos();
  }, [refresh]);

  const cargarProductos = async () => {
    const resultado = await axios.get(urlBase);
    setProductos([...resultado.data]);
  };

  const showFormProducto = (producto) => {
    setSelect(producto);
    setModal(true);
  };

  return (
    <div className="big-container">
      <h2>Lista de Productos</h2>
      <input
        type="text"
        placeholder="Filtrar nombre Producto"
        value={filter}
        onChange={(evt) => setFilter(evt.target.value)}
      />
      <button onClick={(evt) => showFormProducto(newProduct)}>Agregar</button>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Nombre Extranjero</th>
            <th>Cod Barra</th>
            <th>Precio Lista</th>
            <th>Peso</th>
            <th>UM</th>
            <th>Fabricante</th>
            <th>Proveedor</th>
            <th>Alternante</th>
            <th>Grupo</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {productos
            .filter((p) =>
              p.nombre.toLowerCase().includes(filter.toLowerCase())
            )
            .map((producto, key) => {
              return (
                <tr key={key}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.nombreExtranjero}</td>
                  <td>{producto.codBarra}</td>
                  <td>{producto.precioLista}</td>
                  <td>{producto.peso}</td>
                  <td>{producto.um}</td>
                  <td>{producto.fabricante?.nombre}</td>
                  <td>{producto.proveedor?.nombre}</td>
                  <td>{producto.alternante?.nombre}</td>
                  <td>{producto.grupoProducto?.nombre}</td>
                  <td>
                    <button onClick={() => showFormProducto(producto)}>
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {modal && (
        <FormProduct
          setViewModal={setModal}
          producto={select}
          refresh={() => setRefresh((v) => !v)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
