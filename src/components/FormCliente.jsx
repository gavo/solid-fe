import React, { useState } from "react";
import close from "../assets/close.png";
import axios from "axios";

const urlBase = import.meta.env.VITE_API_URL + "/cliente";

const FormCliente = ({ setViewModal, cliente, refresh }) => {
	const [nombre, setNombre] = useState(cliente?.nombre || "");
	const [code, setCode] = useState(cliente?.code || "");
	const [documento, setDocumento] = useState(cliente?.documento || "");
	const [tipoDocumento, setTipoDocumento] = useState(
		cliente?.tipoDocumento || "CI"
	);
	const [email, setEmail] = useState(cliente?.email || "");

	function validateEmail(email) {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	}

	const dataIsValid = () => {
		if (nombre.length <= 0) {
			alert("Debe Indicar un Nombre");
			const inputNombre = document.getElementById("form-cliente-nombre");
			inputNombre.focus();
		}
		if (code.length <= 0) {
			alert("Debe indicar un Codigo");
			const inputCode = document.getElementById("form-cliente-code");
			inputCode.focus();
		}
		if (documento.length <= 0) {
			alert("Debe indicar un numero de documento");
			const inputDocumento = document.getElementById(
				"form-cliente-documento"
			);
			inputDocumento.focus();
		}
		if (!validateEmail(email)) {
			alert("Debe indicar un correo electrónico valido");
			const inputEmail = document.getElementById("form-cliente-email");
			inputEmail.focus();
		}
		return true;
	};

	const actionSubmit = async (evt) => {
		evt.preventDefault();
		if (dataIsValid()) {
			const newCliente = {
				id: cliente?.id || undefined,
				nombre,
				code,
				documento,
				tipoDocumento,
				email,
			};

			if (cliente.id === 0) {
				await axios
					.post(urlBase, newCliente)
					.then((msj) => {
						alert("cliente Registrado Exitosamente");
						setViewModal(false);
					})
					.catch((error) => {
						alert(error.response.data);
					});
			} else {
				await axios
					.put(urlBase + "/" + cliente.id, newCliente)
					.then((msj) => {
						alert("cliente Actualizado Exitosamente");
						setViewModal(false);
					})
					.catch((error) => {
						console.log(error);

						alert(error.response.data);
					});
			}
			refresh();
			setViewModal(false);
		}
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
				<h3>{cliente.id === 0 ? "Registrar" : "Actualizar"} cliente</h3>
				<form
					className="form-generic"
					onSubmit={(evt) => actionSubmit(evt)}
				>
					<div className="form-row">
						<label htmlFor="form-cliente-code">Código: </label>
						<input
							type="text"
							id="form-cliente-code"
							placeholder="Código"
							value={code}
							onChange={(evt) => setCode(evt.target.value)}
						/>
					</div>
					<div className="form-row">
						<label htmlFor="form-cliente-nombre">Nombre: </label>
						<input
							type="text"
							id="form-cliente-nombre"
							placeholder="Nombre"
							value={nombre}
							onChange={(evt) => setNombre(evt.target.value)}
						/>
					</div>
					<div className="form-row">
						<label htmlFor="form-cliente-tipo-documento">
							Tipo de Documento
						</label>
						<select
							id="form-cliente-tipo-documento"
							value={tipoDocumento}
							onChange={(evt) => setTipoDocumento(evt.target.value)}
						>
							<option value="CI">CI</option>
							<option value="NIT">NIT</option>
						</select>
					</div>
					<div className="form-row">
						<label htmlFor="form-cliente-documento">documento</label>
						<input
							type="text"
							id="form-cliente-documento"
							placeholder="documento"
							value={documento}
							onChange={(evt) => setDocumento(evt.target.value)}
						/>
					</div>
					<div className="form-row">
						<label htmlFor="form-cliente-email">Correo Electrónico</label>
						<input
							type="email"
							id="form-cliente-email"
							placeholder="email"
							autoComplete="off"
							value={email}
							onChange={(evt) => setEmail(evt.target.value)}
						/>
					</div>
					<input
						type="submit"
						id="form-cliente-submit"
						value={cliente.id === 0 ? "Registrar" : "Actualizar"}
						className="mt-8"
					/>
				</form>
			</div>
		</div>
	);
};

export default FormCliente;
