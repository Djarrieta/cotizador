import { firebaseAuth } from "../../../config/firebase";
import { ResponseUserModel } from "../models/ResponseUserModel";

export const updatePasswordService = (
	newPassword: string
): Promise<ResponseUserModel> => {
	return firebaseAuth.currentUser
		.updatePassword(newPassword)
		.then(() => {
			return {
				alert: {
					type: "success",
					text: "Se ha actualizado la contraseña con éxito.",
				},
			};
		})
		.catch((error) => {
			console.error(error.code);
			return {
				alert: {
					type: "error",
					text: "Hubo un problema, intenta nuevamente.",
				},
			};
		});
};
