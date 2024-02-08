import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handlerlogInNewUser = async () => {
		try {
			let newLogIn = {
				email: email,
				password: password,
			};

			const result = await actions.logIn(newLogIn);

			console.log("Resultado de actions.logIn:", result);

			if (result.access_token) {
				localStorage.setItem("token", result.access_token);
				console.log("Usuario logueado:", result.fullName);
				actions.privateRoute();
				navigate("/");
			}
		} catch (e) {
			console.log("Mostrando SweetAlert");
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Ocurrió un error al iniciar sesión',
			});

		}
	};

	return (
		<div className="container">
			<div className="right-log">
				<h2 className="title-log">Inicia sesión</h2>
				<form>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">Email :</label>
						<input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">Contraseña :</label>
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
					</div>
				</form>
				<div className="butons">
					<button type="button" onClick={handlerlogInNewUser} className="btn btn-primary singup">Iniciar sesión</button>
					<Link to="/home">
						<button className="btn btn-primary singup">Crear cuenta</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

