import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import FrontPage from "./pages/FrontPage";
import ProductsPage from "./pages/ProductsPage";
import FabricantePage from "./pages/FabricantePage";
import ProveedorPage from "./pages/ProveedorPage";
import GrupoProductoPage from "./pages/GrupoProductoPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/fabricantes" element={<FabricantePage />} />
        <Route path="/proveedores" element={<ProveedorPage />} />
        <Route path="/grupo-productos" element={<GrupoProductoPage />} />
      </Routes>
    </>
  );
}

export default App;
