import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import FormServicio from "../components/FormServicio";
import { DataContext } from "../contexts/SharedData";
import cartIcon from "../assets/cart-icon.png";

const urlBase = "http://localhost:8080/api/servicio";
const newServicio = { id: 0, nombre: "", precio: 0, codigo: "" };

const ServicioPage = () => {
  const [servicios, setServicios] = useState([]);
  const [select, setSelect] = useState(newServicio);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [refresh, setRefresh] = useState(false);

  const data = useContext(DataContext);

  useEffect(() => {
    cargarServicios();
  }, [refresh]);

  const cargarServicios = async () => {
    const resultado = await axios.get(urlBase);
    setServicios(resultado.data);
  };

  const showFormServicio = (fabricante) => {
    setSelect(fabricante);
    setModal(true);
  };

  const isProdForSale = (selected) => {
    if (data.servicios.length == 0) return true;
    return (
      data.servicios.reduce(
        (resp, current) => resp + (selected.id === current.servicio.id ? 1 : 0),
        0
      ) === 0
    );
  };

  const addToCart = (s) => {
    const toBuy = {
      observaciones: "",
      precio: s.precio,
      descuento: 0,
      servicio: s,
    };
    data.setServicios((e) => [...e, toBuy]);
  };

  return (
    <div className="container">
      <h2>Lista de Servicios</h2>
      <input
        type="text"
        placeholder="Filtrar nombre Servicios"
        value={filter}
        onChange={(evt) => setFilter(evt.target.value)}
        id="filter-servicio"
      />
      <button onClick={() => showFormServicio(newServicio)}>Agregar</button>
      <table>
        <thead>
          <tr>
            <th>Nro</th>
            <th>Código</th>
            <th className="full-width">Nombre</th>
            <th>Precio</th>
            <th>Editar</th>
            <th>Carro</th>
          </tr>
        </thead>
        <tbody>
          {servicios
            .filter((f) =>
              f.nombre.toLowerCase().includes(filter.toLowerCase())
            )
            .map((servicio, key) => {
              return (
                <tr key={key}>
                  <td>{servicio.id}</td>
                  <td>{"codigo"}</td>
                  <td className="column-name full-width">{servicio.nombre}</td>
                  <td className="bold">{servicio.precio}</td>
                  <td>
                    <button onClick={() => showFormServicio(servicio)}>
                      Editar
                    </button>
                  </td>
                  <td>
                    {isProdForSale(servicio) ? (
                      <button onClick={() => addToCart(servicio)}>
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
        <FormServicio
          servicio={select}
          setViewModal={setModal}
          refresh={setRefresh}
        />
      )}
    </div>
  );
};

export default ServicioPage;
