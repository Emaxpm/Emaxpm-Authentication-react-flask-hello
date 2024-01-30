// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { Context } from "../store/appContext";


// export const Navbar = () => {
// 	const { store, actions } = useContext(Context);
// 	return (
// 		<nav className="navbar navbar-light bg-light container-nav">


// 			<img className="logo" src="https://avatars.sched.co/5/cb/8689106/avatar.jpg?9cc" />

// 			{store.currentUser ?
// 				<button type="button" className="btn btn-dark dark-bu dark-button">Cerrar sesion</button>

// 				:

// 				<div>

// 					<Link to="/demo" className="px-3">

// 						<button type="button" className="btn btn-dark dark-bu">Inicia sesion</button>

// 					</Link>

// 					<Link to="/home" >

// 						<button type="button" className="btn btn-dark dark-bu dark-button ">Crear cuenta</button>

// 					</Link>

// 				</div>
// 			}

// 		</nav>
// 	);
// };

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const success = await actions.logout(); // Asegúrate de que la función logout esté disponible en tus acciones

			if (success) {
				navigate('/demo');
			} else {
				console.error('No se pudo cerrar sesión.');
			}
		} catch (error) {
			console.error('Error durante el cierre de sesión:', error);
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

