import { firebaseAuth } from "../../../config/firebase";

import { ResponseUserModel } from "../models/ResponseUserModel";

export const signOutService = (): Promise<ResponseUserModel> => {
		return firebaseAuth
		.signOut()
		.then(() => {
			return {
				alert: {
					type: "success",
					text: "Has cerrado sesión satisfactoriomante.",
				},
			};
		})
		.catch((e) => {
			console.error(e);
			return {
				alert: {
					type: "error",
					text: "Hubo un problema al cerrar sesión.  Intenta nuevamente",
				},
			};
		});
};
