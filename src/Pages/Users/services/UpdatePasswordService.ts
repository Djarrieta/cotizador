import { firebaseAuth } from "../../../config/firebase";
import { ResponseModel } from "../../App/models/ResponseModel";

const alertCases = {
	"auth/requires-recent-login":
		"Se requiere haber iniciado sesión recientemente.",
	"auth/weak-password": "Coloca una contraseña más dificil de adivinar.",
};

export const updatePasswordService = (
	newPassword: string
): Promise<ResponseModel> => {
	return firebaseAuth.currentUser
		.updatePassword(newPassword)
		.then(() => {
			return {
				alert: {
					type: "success",
					text: "Se ha actualizado la contraseña con éxito.",
				},
			} as ResponseModel;
		})
		.catch((error) => {
			console.error(error.code);
			return {
				alert: {
					type: "error",
					text:
						alertCases[error.code] || "Hubo un problema, intenta nuevamente.",
				},
			};
		});
};
