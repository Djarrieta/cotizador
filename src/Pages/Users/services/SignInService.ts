import { firebaseAuth, firebaseDB } from "../../../config/firebase";
import { ResponseModel } from "../../App/models/ResponseModel";
import { CurrentUserModel } from "../models/CurrentUserModel";

const alertCases = {
	"auth/invalid-email": "El formato del correo no es válido.",
	"auth/user-not-found": "El usuario ingresado no existe.",
	"auth/wrong-password": "Contraseña incorrecta.",
};

export const signInService = async (
	email: string,
	password: string
): Promise<ResponseModel> => {
	let currentUser: CurrentUserModel = {};
	return firebaseAuth
		.signInWithEmailAndPassword(email, password)
		.then((response) => {
			return firebaseDB.collection("users").doc(response.user.uid).get();
		})
		.then((response) => {
			currentUser = response.data();

			const finalResponse = {
				alert: {
					type: "success",
					text: "Has ingresado satisfactoriomante.",
				},
				data: currentUser,
			} as ResponseModel;
			return finalResponse;
		})
		.catch((error) => {
			console.error(error.code);
			return {
				alert: {
					type: "error",
					text: alertCases[error.code] || "El formato del correo no es válido.",
				},
			};
		});
};
