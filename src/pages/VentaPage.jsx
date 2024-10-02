import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../contexts/SharedData";
import remove from "../assets/remove.png";
import FormProdVenta from "../components/FormProdVenta";
import FormServVenta from "../components/FormServVenta";
import axios from "axios";

const VentaPage = () => {
  const [showPF, setShowPF] = useState(false);
  const [showSF, setShowSF] = useState(false);
  const [pvs, setPvs] = useState();
  const [svs, setSvs] = useState();
  const { clientes, productos, setProductos, servicios, setServicios } =
    useContext(DataContext);
  const [clienteSelected, setClienteSelected] = useState(0);
  const [nit, setNit] = useState("");
  const [isFacturado, setFacturado] = useState(false);
  const [razonSocial, setRazonSocial] = useState("");

  const handleFacturado = (evt) => {
    setFacturado(evt.target.checked);
  };

  const handleChangeClient = (evt) => {
    setClienteSelected(evt.target.value);
    const cliente = clientes.find((c) => c.id == evt.target.value);
    if (cliente) {
      setNit(cliente.documento);
      setRazonSocial(cliente.nombre);
    }
  };

  const removeProductFromCart = (p) => {
    const list = productos.filter((e) => e.producto.id != p.producto.id);
    setProductos(list);
  };

  const removeServicioFromCart = (p) => {
    const list = servicios.filter((e) => e.servicio.id != p.servicio.id);
    setServicios(list);
  };

  const showFormProdVenta = (producto) => {
    setPvs(producto);
    setShowPF(true);
  };

  const showFormServVenta = (servicio) => {
    setSvs(servicio);
    setShowSF(true);
  };

  const handleSaveVenta = async () => {
    const cliente = clientes.find((c) => c.id == clienteSelected);

    const venta = {
      cliente,
      productos,
      servicios,
      factura: isFacturado
        ? {
            nit,
            razonSocial,
          }
        : undefined,
    };

    await axios
      .post("http://localhost:8080/api/venta", venta)
      .then((obj) => {
        console.log(obj);
        alert("Venta Realizada");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
      });
  };

  return (
    <div className="container-flex">
      <h2>Procesar Venta</h2>
      <div className="container-row">
        <label className="label-fixed" htmlFor="cliente">
          Cliente
        </label>
        <select
          id="cliente"
          value={clienteSelected}
          onChange={handleChangeClient}
        >
          <option value={0}></option>
          {clientes.map((cliente, key) => (
            <option value={cliente.id} key={key}>
              {cliente.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="container-row">
        <label htmlFor="total-venta" className="label-fixed">
          Total
        </label>
        <input
          type="number"
          id="total-venta"
          value={
            productos.reduce(
              (acumulado, current) =>
                Number(acumulado) +
                Number(current.cantidad) * Number(current.precio) -
                Number(current.descuento),
              0
            ) +
            servicios.reduce(
              (acumulado, current) =>
                Number(acumulado) +
                Number(current.precio) -
                Number(current.descuento),
              0
            )
          }
          disabled={true}
        />
      </div>

      <div className="container-row">
        <label htmlFor="factura" className="label-fixed">
          Con factura
        </label>
        <input
          type="checkbox"
          name=""
          id="factura"
          checked={isFacturado}
          onChange={handleFacturado}
          style={{ width: 10, marginRight: 190 }}
        />
      </div>
      {isFacturado && (
        <>
          <div className="container-row">
            <label htmlFor="nit" className="label-fixed">
              Nit
            </label>
            <input
              type="number"
              id="nit"
              value={nit}
              onChange={(evt) => setNit(evt.target.value)}
            />
          </div>
          <div className="container-row">
            <label htmlFor="social" className="label-fixed">
              Razon Social
            </label>
            <input
              type="texto"
              id="social"
              value={razonSocial}
              onChange={(evt) => setRazonSocial(evt.target.value)}
            />
          </div>
        </>
      )}
      <table>
        <thead>
          <tr>
            <th>Nro</th>
            <th className="full-width">Nombre Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Desc Tot</th>
            <th>Total</th>
            <th>Ajustar</th>
            <th>Quitar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{p.producto.nombre}</td>
              <td>{p.precio}</td>
              <td>{p.cantidad}</td>
              <td>{p.descuento}</td>
              <td className="bold">{p.precio * p.cantidad - p.descuento}</td>
              <td>
                <button onClick={() => showFormProdVenta(p)}>Editar</button>
              </td>
              <td>
                <button onClick={() => removeProductFromCart(p)}>
                  <img src={remove} alt="remove" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th scope="row">Sub Total</th>
            <th>
              {productos.reduce(
                (acumulado, current) =>
                  Number(acumulado) +
                  Number(current.cantidad) * Number(current.precio) -
                  Number(current.descuento),
                0
              )}
            </th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>

      <table>
        <thead>
          <tr>
            <th>Nro</th>
            <th className="full-width">Nombre Servicio</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Total</th>
            <th>Ajustar</th>
            <th>Quitar</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((s, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{s.servicio.nombre}</td>
              <td>{s.precio}</td>
              <td>{s.descuento}</td>
              <td>{s.precio - s.descuento}</td>
              <td>
                <button onClick={() => showFormServVenta(s)}>Editar</button>
              </td>
              <td>
                <button onClick={() => removeServicioFromCart(s)}>
                  <img src={remove} alt="remove" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th scope="row">Sub Total</th>
            <th>
              {servicios.reduce(
                (acumulado, current) =>
                  Number(acumulado) +
                  Number(current.precio) -
                  Number(current.descuento),
                0
              )}
            </th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      <button onClick={handleSaveVenta}>Realizar Venta</button>
      {showPF && <FormProdVenta setViewModal={setShowPF} producto={pvs} />}
      {showSF && <FormServVenta setViewModal={setShowSF} servicio={svs} />}
    </div>
  );
};

export default VentaPage;
