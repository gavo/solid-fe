import React, { useEffect, useState } from "react";
import close from "../assets/close.png";
import axios from "axios";

const urlBase = import.meta.env.VITE_API_URL;

const FormProduct = ({ setViewModal, producto, refresh }) => {
	const [nombre, setNombre] = useState(producto.nombre);
	const [nombreExtranjero, setNombreExtranjero] = useState(
		producto.nombreExtranjero
	);
	const [peso, setPeso] = useState(producto.peso);
	const [codBarra, setCodBarra] = useState(producto.codBarra);
	const [um, setUm] = useState(producto.um);
	const [precio, setPrecio] = useState(producto.precio);
	const [productos, setProductos] = useState([]);
	const [relatedSelected, setRelatedSelected] = useState(
		producto.alternante?.id || 0
	);
	const [fabricantes, setFabricantes] = useState([]);
	const [fabricanteSelected, setFabricanteSelected] = useState(
		producto.fabricante?.id || 0
	);
	const [proveedores, setProveedores] = useState([]);
	const [proveedorSelected, setProveedorSelected] = useState(
		producto.proveedor?.id || 0
	);
	const [grupos, setGrupos] = useState([]);
	const [grupoSelected, setGrupoSelected] = useState(
		producto.grupoProducto?.id || 0
	);
	useEffect(() => {
		loadFabricantes();
		loadProductos();
		loadProveedores();
		loadGrupos();
	}, []);

	const loadProductos = async () => {
		const response = await axios.get(urlBase + "/producto");
		setProductos([
			{ label: "", value: 0 },
			...response.data
				.sort((a, b) => a.nombre.localeCompare(b.nombre))
				.map((a) => ({ label: a.nombre, value: a.id })),
		]);
	};

	const loadFabricantes = async () => {
		const response = await axios.get(urlBase + "/fabricante");
		setFabricantes([
			{ label: "", value: 0 },
			...response.data
				.sort((a, b) => a.nombre.localeCompare(b.nombre))
				.map((f) => ({ label: f.nombre, value: f.id })),
		]);
	};

	const loadProveedores = async () => {
		const response = await axios.get(urlBase + "/proveedor");
		setProveedores([
			{ label: "", value: 0 },
			...response.data
				.sort((a, b) => a.nombre.localeCompare(b.nombre))
				.map((p) => ({ label: p.nombre, value: p.id })),
		]);
	};

	const loadGrupos = async () => {
		const response = await axios.get(urlBase + "/grupo-producto");
		setGrupos([
			{ label: "", value: 0 },
			...response.data
				.sort((a, b) => a.nombre.localeCompare(b.nombre))
				.map((g) => ({ label: g.nombre, value: g.id })),
		]);
	};

	const actionSubmit = async (evt) => {
		evt.preventDefault();

		const newProduct = {
			id: producto?.id || undefined,
			nombre,
			nombreExtranjero,
			peso,
			codBarra,
			um,
			precio,
			alternante: relatedSelected ? { id: relatedSelected } : undefined,
			grupoProducto: grupoSelected ? { id: grupoSelected } : undefined,
			proveedor: proveedorSelected
				? {
						id: proveedorSelected,
				  }
				: undefined,
			fabricante: fabricanteSelected
				? {
						id: fabricanteSelected,
				  }
				: undefined,
		};

		if (producto.id === 0) {
			await axios
				.post(urlBase + "/producto", newProduct)
				.then((msj) => {
					alert("Producto Registrado Exitosamente");
					setViewModal(false);
				})
				.catch((error) => {
					alert(error.response.data);
				});
		} else {
			await axios
				.put(urlBase + "/producto/" + producto.id, newProduct)
				.then((msj) => {
					alert("Producto Actualizado Exitosamente");
					setViewModal(false);
				})
				.catch((error) => {
					alert(error.response.data);
				});
		}
		refresh();
		setViewModal(false);
	};

	return (
		<div className="modal">
			<div className="modal-children">
				<img
					src={close}
					alt="close"
					className="close-icon"
					onClick={() => setViewModal(false)}
				/>
				<h3>{producto.id === 0 ? "Registrar" : "Actualizar"} producto</h3>
				<form
					className="form-generic"
					onSubmit={(evt) => actionSubmit(evt)}
				>
					<div className="form-row">
						<label htmlFor="nombre">Nombre: </label>
						<input
							type="text"
							id="nombre"
							placeholder="Nombre"
							value={nombre}
							onChange={(evt) => setNombre(evt.target.value)}
						/>
					</div>
					<div className="form-row">
						<label htmlFor="nombre_ext">Nombre Extranjero: </label>
						<input
							type="text"
							id="nombre_ext"
							placeholder="Nombre Extranjero"
							value={nombreExtranjero}
							onChange={(evt) => setNombreExtranjero(evt.target.value)}
						/>
					</div>
					<div className="form-row">
						<label htmlFor="cod-barra">Codigo de barra</label>
						<input
							type="text"
							id="cod-barra"
							placeholder="Codigo de Barra"
							value={codBarra}
							onChange={(evt) => setCodBarra(evt.target.value)}
						/>
					</div>
					<div className="form-row">
						<label htmlFor="precio">Precio</label>
						<input
							type="number"
							id="precio"
							placeholder="Precio"
							value={precio}
							onChange={(evt) => setPrecio(evt.target.value)}
						/>
					</div>
					<div className="form-row">
						<label htmlFor="peso">Peso</label>
						<input
							type="number"
							id="peso"
							placeholder="Peso"
							value={peso}
							onChange={(evt) => setPeso(evt.target.value)}
						/>
					</div>
					<div className="form-row">
						<label htmlFor="um">Unidad de Medida</label>
						<input
							type="text"
							id="um"
							placeholder="Unidad de Medida"
							value={um}
							onChange={(evt) => setUm(evt.target.value)}
						/>
					</div>
					<div className="form-row">
						<label htmlFor="alternativo">Alternativo</label>
						<select
							id="alternativo"
							value={relatedSelected}
							onChange={(e) =>
								setRelatedSelected(Number(e.target.value))
							}
						>
							{productos.map((p, k) => (
								<option key={"pr" + k} value={p.value}>
									{p.label}
								</option>
							))}
						</select>
					</div>
					<div className="form-row">
						<label htmlFor="fabricante">Fabricante</label>
						<select
							id="fabricante"
							value={fabricanteSelected}
							onChange={(e) =>
								setFabricanteSelected(Number(e.target.value))
							}
						>
							{fabricantes.map((f, k) => (
								<option key={"f" + k} value={f.value}>
									{f.label}
								</option>
							))}
						</select>
					</div>
					<div className="form-row">
						<label htmlFor="proveedor">Proveedor</label>
						<select
							id="proveedor"
							value={proveedorSelected}
							onChange={(e) =>
								setProveedorSelected(Number(e.target.value))
							}
						>
							{proveedores.map((p, k) => (
								<option key={"pv" + k} value={p.value}>
									{p.label}
								</option>
							))}
						</select>
					</div>
					<div className="form-row">
						<label htmlFor="grupo">Grupo</label>
						<select
							id="grupo"
							value={grupoSelected}
							onChange={(e) => {
								setGrupoSelected(Number(e.target.value));
							}}
						>
							{grupos.map((g, k) => (
								<option key={"g" + k} value={g.value}>
									{g.label}
								</option>
							))}
						</select>
					</div>
					<input
						type="submit"
						value={producto.id === 0 ? "Registrar" : "Actualizar"}
						className="mt-8"
					/>
				</form>
			</div>
		</div>
	);
};

export default FormProduct;
