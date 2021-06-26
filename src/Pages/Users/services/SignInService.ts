import { firebaseAuth, firebaseDB } from "../../../config/firebase";
import AlertModel from "../../App/models/AlertModel";
import CurrentUserModel from "../models/CurrentUserModel";

const signInService = (
	email: string,
	password: string
): Promise<{
	alert: AlertModel;
	data?: CurrentUserModel;
}> => {
	return firebaseAuth
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
							text: "Haz ingresado satisfactoriomante.",
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
		});
};

export default signInService;
