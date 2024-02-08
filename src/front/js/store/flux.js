const apiUrl = process.env.BACKEND_URL + "/api"
const getState = ({ getStore, getActions, setStore }) => {
	
	return {
		store: {
			loggedUserId: null,
			currentUser: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			sign: async (newUser) => {
				console.log(newUser);

				try {
					let response = await fetch(apiUrl + "/sign", {
						method: "POST",
						body: JSON.stringify(newUser),
						headers: {
							"Content-Type": "application/json",
						}
					});

					const data = await response.json();
					console.log("respuesta al intentar un new user:", data);

				} catch (error) {
					console.log("Error:", error);
				}
			},

			privateRoute: async () => {
				try {

					const options = {
						method: "Get",
						headers: {
							Authorization: 'Bearer ' + localStorage.getItem("token")

						}
					};
					const response = await fetch(apiUrl + "/private", options)
					console.log(response)
					const res = await response.json()
					console.log(res)
					if (response.ok) {
						setStore({ currentUser: res })
						return null
					}
					setStore({ currentUser: false })


				} catch (error) {
					console.error(error)
					setStore({ currentUser: false })

				}
			},

			logIn: async (newLogIn) => {
				try {
					let result = await fetch(apiUrl + "/login", {
						method: "POST",
						body: JSON.stringify(newLogIn),
						headers: {
							"Content-Type": "application/json"
						}
					});

					const data = await result.json();
					console.log("respuesta al intentar iniciar sesion:", data);
					localStorage.setItem("token", data.token);
					setStore({ loggedUserId: data.id });
					return data;
				} catch (e) {
					console.log(e);
				}
			},

			logout: async () => {
				try {
					const actions = getActions()
					localStorage.removeItem('token');
					setStore({ loggedUserId: null });
					actions.privateRoute()
					return true;
				} catch (error) {
					console.error('Error during logout:', error);
					return false;
				}
			},
		}
	};
};

export default getState;
