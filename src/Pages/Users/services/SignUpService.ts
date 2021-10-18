import { firebaseAuth, firebaseDB } from "../../../config/firebase";
import { ResponseModel } from "../../App/models/ResponseModel";
import { CurrentUserModel } from "../models/CurrentUserModel";
const alertCases = {
	"auth/email-already-in-use":
		"Este email ya está en uso, intenta con otro o recupera tu contraseña.",
	"auth/weak-password": "Usa una contraseña más difícil de adivinar.",
	"auth/invalid-email": "El formato del correo no es válido.",
};
export const signUpService = (
	newUser: CurrentUserModel
): Promise<ResponseModel> => {
	let { password, confirmation, ...finalUser } = newUser;

	return firebaseAuth
		.createUserWithEmailAndPassword(newUser.email, newUser.password)
		.then((response) => {
			finalUser = { ...finalUser, uid: response.user.uid };
			return firebaseDB
				.collection("users")
				.doc(response.user.uid)
				.set(finalUser);
		})
		.then(() => {
			return {
				alert: {
					type: "success",
					text: "Haz creado tu cuenta satisfactoriomante.",
				},
				data: { currentUser: finalUser },
			} as ResponseModel;
		})
		.catch((error) => {
			console.error(error);
			return {
				alert: {
					type: "error",
					text:
						alertCases[error.code] || "Hubo un problema, intenta nuevamente.",
				},
			};
		});
};
