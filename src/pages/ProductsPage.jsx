import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import FormProduct from "../components/FormProduct";
import { DataContext } from "../contexts/SharedData";
import cartIcon from "../assets/cart-icon.png";

const urlBase = "http://localhost:8080/api/producto";
const newProduct = {
  id: 0,
  nombre: "",
  nombreExtranjero: "",
  peso: 1,
  codBarra: "",
  um: "",
  precio: 1,
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
  const data = useContext(DataContext);

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

  const isProdForSale = (selected) => {
    if (data.productos.length == 0) return true;
    return (
      data.productos.reduce(
        (resp, current) => resp + (selected.id === current.producto.id ? 1 : 0),
        0
      ) === 0
    );
  };

  const addToCart = (p) => {
    const toBuy = { cantidad: 1, precio: p.precio, descuento: 0, producto: p };
    data.setProductos((e) => [...e, toBuy]);
  };

  return (
    <div className="big-container">
      <h2>Lista de Productos</h2>
      <input
        type="text"
        placeholder="Filtrar nombre Producto"
        value={filter}
        onChange={(evt) => setFilter(evt.target.value)}
        id="filter-producto"
      />
      <button onClick={(evt) => showFormProducto(newProduct)}>Agregar</button>
      <table>
        <thead>
          <tr>
            <th>Cod Barra</th>
            <th className="full-width">Nombre</th>
            <th>Nombre Extranjero</th>
            <th>Fabricante</th>
            <th>Proveedor</th>
            <th>Peso</th>
            <th>Precio</th>
            <th>Editar</th>
            <th>Carro</th>
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
                  <td>{producto.codBarra}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.nombreExtranjero}</td>
                  <td>{producto.fabricante?.nombre}</td>
                  <td>{producto.proveedor?.nombre}</td>
                  <td>{producto.peso + " " + producto.um}</td>
                  <td className="bold">{producto.precio}</td>
                  <td>
                    <button onClick={() => showFormProducto(producto)}>
                      Editar
                    </button>
                  </td>
                  <td>
                    {isProdForSale(producto) ? (
                      <button
                        onClick={() => addToCart(producto)}
                        id={"prod-cart-" + key}
                      >
                        <img src={cartIcon} alt="Icon" />
                      </button>
                    ) : (
                      <></>
                    )}
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
