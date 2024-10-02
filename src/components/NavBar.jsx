import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <ul className="menu">
        <li>
          <NavLink to="/" id="nav-home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/venta" id="nav-venta">
            Venta
          </NavLink>
        </li>
        <li>
          <NavLink to="/fabricantes" id="nav-fabricante">
            Fabricantes
          </NavLink>
        </li>
        <li>
          <NavLink to="/proveedores" id="nav-proveedor">
            Proveedores
          </NavLink>
        </li>
        <li>
          <NavLink to="/productos" id="nav-producto">
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink to="/servicios" id="nav-servicio">
            Servicios
          </NavLink>
        </li>
        <li>
          <NavLink to="/grupo-productos" id="nav-grupo-producto">
            Grupo de Productos
          </NavLink>
        </li>
        <li>
          <NavLink to="/clientes" id="nav-cliente">
            Clientes
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default NavBar;
