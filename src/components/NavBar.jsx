import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <ul className="menu">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/fabricantes">Fabricantes</NavLink>
        </li>
        <li>
          <NavLink to="/proveedores">Proveedores</NavLink>
        </li>
        <li>
          <NavLink to="/productos">Productos</NavLink>
        </li>
        <li>
          <NavLink to="/servicios">Servicios</NavLink>
        </li>
        <li>
          <NavLink to="/grupo-productos">Grupo de Productos</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default NavBar;
