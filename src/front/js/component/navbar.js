import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from 'sweetalert2';

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const success = await actions.logout();

			if (success) {
				Swal.fire({
					icon: 'success',
					title: 'Cierre de sesión exitoso',
					text: 'Te has desconectado correctamente.',
				}).then(() => {
					navigate('/demo');
				});
			} else {
				console.error('No se pudo cerrar sesión.');
			}
		} catch (error) {
			console.error('Error durante el cierre de sesión:', error);
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Ocurrió un error durante el cierre de sesión.',
			});
		}
	};

	return (
		<nav className="navbar navbar-light bg-light container-nav">

			<Link to="/">

				<img className="logo" src="https://avatars.sched.co/5/cb/8689106/avatar.jpg?9cc" />

			</Link>

			{store.currentUser ? (
				<button type="button" className="btn btn-dark dark-bu dark-button" onClick={handleLogout}>
					Cerrar sesión
				</button>
			) : (
				<div>
					<Link to="/demo" className="px-3">
						<button type="button" className="btn btn-dark dark-bu">
							Inicia sesión
						</button>
					</Link>

					<Link to="/home">
						<button type="button" className="btn btn-dark dark-bu dark-button">
							Crea cuenta
						</button>
					</Link>
				</div>
			)}
		</nav>
	);
};

