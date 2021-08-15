//import { firebaseAuth } from "../../../config/firebase";

import { ResponseUserModel } from "../models/ResponseUserModel";

export const updatePasswordService = (
	newPassword: string
): Promise<ResponseUserModel> => {
	return new Promise((resolve, reject) => {
		resolve({
			alert: {
				type: "success",
				text: "Se ha modificado la contraseña satisfactoriamente.",
			},
		});
	});
	/* firebaseAuth.currentUser
		.updatePassword(newPassword)
		.then(() => {
			return {
				type: "success",
				text: "Se ha actualizado la contraseña con éxito.",
			};
		})
		.catch((error) => {
			console.error(error.code);
			return {
				type: "error",
				text: "Hubo un problema, intenta nuevamente.",
			};
		}); */
};
