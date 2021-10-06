import { firebaseAuth, firebaseDB } from "../../../config/firebase";
import { CurrentUserModel } from "../models/CurrentUserModel";
import { ResponseUserModel } from "../models/ResponseUserModel";
const alertCases = {
	"auth/email-already-in-use":
		"Este email ya está en uso, intenta con otro o recupera tu contraseña.",
	"auth/weak-password": "Usa una contraseña más difícil de adivinar.",
	"auth/invalid-email": "El formato del correo no es válido.",
};
export const signUpService = (
	newUser: CurrentUserModel
): Promise<ResponseUserModel> => {
	let { password, confirmation, ...finalUser } = newUser;
	console.log("it is inside the service");
	return firebaseAuth
		.createUserWithEmailAndPassword(newUser.email, newUser.password)
		.then((response) => {
			finalUser = { ...finalUser, uid: response.user.uid };
			console.log("finalUser auth", finalUser);
			return firebaseDB.collection("users").doc(finalUser.uid).set(finalUser);
		})
		.then((response) => {
			console.log("firestore response", response);
			return {
				alert: {
					type: "success",
					text: "Haz creado tu cuenta satisfactoriomante.",
				},
				currentUser: finalUser,
			};
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
