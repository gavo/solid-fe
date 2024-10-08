import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import FrontPage from "./pages/FrontPage";
import ProductsPage from "./pages/ProductsPage";
import FabricantePage from "./pages/FabricantePage";
import ProveedorPage from "./pages/ProveedorPage";
import GrupoProductoPage from "./pages/GrupoProductoPage";
import Footer from "./components/Footer";
import ServiciosPage from "./pages/ServiciosPage";
import ClientesPage from "./pages/ClientesPage";
import ErrorPage from "./pages/ErrorPage";
import SharedDataProvider from "./contexts/SharedData";
import VentaPage from "./pages/VentaPage";

function App() {
  return (
    <>
      <SharedDataProvider>
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/fabricantes" element={<FabricantePage />} />
            <Route path="/proveedores" element={<ProveedorPage />} />
            <Route path="/grupo-productos" element={<GrupoProductoPage />} />
            <Route path="/servicios" element={<ServiciosPage />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/venta" element={<VentaPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </SharedDataProvider>
    </>
  );
}

export default App;
