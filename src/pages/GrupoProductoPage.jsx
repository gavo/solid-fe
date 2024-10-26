import axios from "axios";
import React, { useEffect, useState } from "react";
import { SimpleObjectForm } from "../components/SimpleObjectForm";

const urlBase = import.meta.env.VITE_API_URL + "/grupo-producto";
const newGrupoProducto = { id: 0, nombre: "" };

const GrupoProductoPage = () => {
	const [grupoProductos, setGrupoProductos] = useState([]);
	const [select, setSelect] = useState(newGrupoProducto);
	const [filter, setFilter] = useState("");
	const [modal, setModal] = useState(false);
	const [refresh, setRefresh] = useState(false);

	const submitGrupoProductos = async (id, nGrupoProducto) => {
		if (!nGrupoProducto) {
			alert("Debe asignar un nombre para el grupo de productos");
			return;
		}

		const grupoProducto = { nombre: nGrupoProducto };

		if (id) {
			await axios
				.put(urlBase + "/" + id, grupoProducto)
				.then((msj) => {
					alert("Grupo de Productos actualizado exitosamente");
				})
				.catch((error) => {
					alert(error.response.data);
				});
		} else {
			await axios
				.post(urlBase, grupoProducto)
				.then((msj) => {
					alert("Grupo de Productos Registrado exitosamente");
				})
				.catch((error) => {
					alert(error.response.data);
				});
		}
		setModal(false);
		setRefresh((v) => !v);
	};

	useEffect(() => {
		cargarGrupoProductos();
	}, [refresh]);

	const cargarGrupoProductos = async () => {
		const resultado = await axios.get(urlBase);
		setGrupoProductos(resultado.data);
	};

	const showFormGrupoProducto = (grupoProductos) => {
		setSelect(grupoProductos);
		setModal(true);
	};

	return (
		<div className="container">
			<h2>Lista de Grupo de Productos</h2>
			<input
				type="text"
				placeholder="Filtrar Nombre de Grupo"
				value={filter}
				onChange={(evt) => setFilter(evt.target.value)}
				id="filtro-grupo-productos"
			/>
			<button onClick={(evt) => showFormGrupoProducto(newGrupoProducto)}>
				Agregar
			</button>
			<table>
				<thead>
					<tr>
						<th>Nro</th>
						<th className="full-width">Nombre</th>
						<th>Editar</th>
					</tr>
				</thead>
				<tbody>
					{grupoProductos
						.filter((g) =>
							g.nombre.toLowerCase().includes(filter.toLowerCase())
						)
						.map((grupoProductos, key) => {
							return (
								<tr key={key}>
									<td>{grupoProductos.id}</td>
									<td className="column-name full-width">
										{grupoProductos.nombre}
									</td>
									<td>
										<button
											onClick={() =>
												showFormGrupoProducto(grupoProductos)
											}
										>
											Editar
										</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
			{modal && (
				<SimpleObjectForm
					idObject={select.id}
					parameterName="Nombre"
					parameterValue={select.nombre}
					title={
						(select.id ? "Actualizar" : "Registrar") +
						" Grupo de Productos"
					}
					setViewModal={setModal}
					saveValue={submitGrupoProductos}
				/>
			)}
		</div>
	);
};

export default GrupoProductoPage;
