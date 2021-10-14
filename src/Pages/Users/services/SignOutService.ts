import { firebaseAuth } from "../../../config/firebase";
import { ResponseModel } from "../../App/models/ResponseModel";

export const signOutService = (): Promise<ResponseModel> => {
	return firebaseAuth
		.signOut()
		.then(() => {
			return {
				alert: {
					type: "success",
					text: "Has cerrado sesión satisfactoriomante.",
				},
			} as ResponseModel;
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
