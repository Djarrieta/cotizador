import { firebaseAuth, firebaseDB } from "../../../config/firebase";
import { CurrentUserModel } from "../models/CurrentUserModel";
import { ResponseUserModel } from "../models/ResponseUserModel";
const alertCases = {
	"auth/invalid-email": "El formato del correo no es válido.",
	"auth/user-not-found": "El usuario ingresado no existe.",
	"auth/wrong-password": "Contraseña incorrecta.",
};

export const signInService = async (
	email: string,
	password: string
): Promise<ResponseUserModel> => {
	let currentUser: CurrentUserModel = {};
	return firebaseAuth
		.signInWithEmailAndPassword(email, password)
		.then((response) => {
			return firebaseDB.collection("users").doc(response.user.uid).get();
		})
		.then((response) => {
			currentUser = response.data();
			if (!currentUser.defaultTeam) {
				return undefined;
			}
			return firebaseDB.collection("teams").doc(currentUser.defaultTeam).get();
		})
		.then((response) => {
			let finalResponse = {
				alert: {
					type: "success",
					text: "Has ingresado satisfactoriomante.",
				},
				currentUser,
			};

			if (response) {
				console.log("currentTeam", response.data());
			}

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