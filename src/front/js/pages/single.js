import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<>

			{store.currentUser ?

				<div className="jumbotron">
					<h2 className="display-4">Si ves a rigo es porque estas logueado </h2>
					<img src={rigoImageUrl} />
					<hr className="my-4" />
				</div>

				:

				<>

					<div className="cont-off">

						<h2>Logueate para ver mas opciones de contenido</h2>

						<div className="butons">

							<Link to="/home">

								<button type="button" className="btn btn-primary singup">Create una cuenta</button>

							</Link>

							<Link to="/demo">

								<button type="button" className="btn btn-primary singup">Inicia sesion</button>

							</Link>

						</div>

					</div>

				</>

			}

		</>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
