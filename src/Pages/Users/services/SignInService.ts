import { ResponseUserModel } from "../models/ResponseUserModel";

export const signInService = (
	email: string,
	password: string
): Promise<ResponseUserModel> => {
	return new Promise((resolve, reject) => {
		resolve({
			alert: { type: "success", text: "Has ingresado" },
			data: {
				name: "Dario",
				uid: "uidvalue",
				email: "arrieta.dario@hotmail.com",
				whatsapp: "3008718217",
			},
		});
	});
	/* 	return firebaseAuth
		.signInWithEmailAndPassword(email, password)
		.then((response) => {
			return firebaseDB
				.collection("users")
				.doc(response.user.uid)
				.get()
				.then((response) => {
					return {
						alert: {
							type: "success",
							text: "Has ingresado satisfactoriomante.",
						},
						data: { ...response.data() },
					};
				});
		})
		.catch((error) => {
			console.error(error.code)
			const alertCases = {
				"auth/invalid-email": "El formato del correo no es válido.",
				"auth/user-not-found": "El usuario ingresado no existe.",
				"auth/wrong-password": "Contraseña incorrecta.",
			};
			return {
				alert: {
					type: "error",
					text: alertCases[error.code] || "El formato del correo no es válido.",
				},
			};
		}); */
};
