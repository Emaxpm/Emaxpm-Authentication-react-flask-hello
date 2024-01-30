import React, { useContext, useState, } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [fullName, setFullName] = useState("")
	const [userName, setUserName] = useState("")
	const [country, setCountry] = useState("")
	const [phone, setPhone] = useState("")
	const [address, setAddress] = useState("")

	const navigate = useNavigate()

	const creatNewUser = async () => {

		try {

			if (email == "" || password == "" || fullName == "" || userName == "" || country == "" || phone == "" || address == "") {
				return alert("all fields are requierd")
			}

			let newUser = {
				email: email,
				password: password,
				fullName: fullName,
				userName: userName,
				country: country,
				phone: phone,
				address: address,

			}
			const result = await actions.sign(newUser)
			console.log(result)
			// await actions.test()
			navigate("/demo")

		} catch (error) {
			console.log(error)
		}

	}

	return (

		<>

			<div className="container-signUp mt-5">

				<div className="left">

					<h2><i className="fa-solid fa-earth-americas fa-xl mt-5 mx-3" style={{ color: "#6fe1cb" }}></i></h2>

					<div className="body-l">

						<h3 className="title-l">Plan your activities and control your progress online </h3>

						<img src="https://img.freepik.com/vector-premium/cohete-fuera-caja-lanzamiento-transbordador-espacial-al-cielo-expulsado-circulo-concepto-negocio-inicio-creativo-icono-cohete-ilustracion-vectorial-arte-papel_34950-476.jpg" alt="rochet img" />

					</div>

				</div>

				<div className="form-container right">

					<h2 className="title-r">Crear cuenta</h2>

					<form className="row g-3 form-r">
						<div className="col-md-12">
							<label htmlFor="inputAddress" className="form-label labels">FULL NAME :</label>
							<input type="text" className="form-control inputs" id="inputAddress" value={fullName} onChange={(e) => setFullName(e.target.value)} />
						</div>
						<div className="col-md-12">
							<label htmlFor="inputCity" className="form-label labels">USER NAME :</label>
							<input type="text" className="form-control inputs" id="inputCity" value={userName} onChange={(e) => setUserName(e.target.value)} />
						</div>
						<div className="col-md-12">
							<label htmlFor="inputEmail4" className="form-label labels">E-MAIL :</label>
							<input type="email" className="form-control inputs" id="inputEmail4" value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
						<div className="col-md-12">
							<label htmlFor="inputPassword4" className="form-label labels">PASSWORD :</label>
							<input type="password" className="form-control inputs" id="inputPassword4" value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>
						<div className="col-md-12">
							<label htmlFor="inputC" className="form-label labels">COUNTRY :</label>
							<input type="text" className="form-control inputs" id="inputC" value={country} onChange={(e) => setCountry(e.target.value)} />
						</div>
						<div className="col-md-12">
							<label htmlFor="inputCi" className="form-label labels">PHONE :</label>
							<input type="number" className="form-control inputs" id="inputCi" value={phone} onChange={(e) => setPhone(e.target.value)} />
						</div>
						<div className="col-md-12">
							<label htmlFor="inpu" className="form-label labels">ADDRESS :</label>
							<input type="text" className="form-control inputs" id="inpu" value={address} onChange={(e) => setAddress(e.target.value)} />
						</div>
						{/*<div className="col-md-4">

							<label htmlFor="inputZip" className="form-label labels">DATE :</label>
							<input type="date" className="form-control inputs inp-date" id="inputZip" value={date} onChange={(e) => setDate(e.target.value)} />
						</div>*/}
						<div className="form-check mt-5">
							<input className="form-check-input inputs" type="checkbox" value="" id="flexCheckDefault" />
							<label className="form-check-label labels" htmlFor="flexCheckDefault">
								Accept terms and conditions?
							</label>
						</div>
						<div className="butons">
							
								<Link to="/demo">
									<button className="btn btn-primary singup">iniciar sesion</button>
								</Link>

								<button type="button" className="btn btn-primary singup" onClick={creatNewUser}>Crear cuenta</button>
		
						</div>
					</form>



				</div>

			</div>

		</>
	);
};
