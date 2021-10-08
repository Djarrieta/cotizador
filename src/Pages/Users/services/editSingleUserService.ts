import { firebaseDB } from "../../../config/firebase";
import { CurrentUserModel } from "../models/CurrentUserModel";
import { ResponseUserModel } from "../models/ResponseUserModel";

export const editSingleUserService = (
	user: CurrentUserModel
): Promise<ResponseUserModel> => {
	return firebaseDB
		.collection("users")
		.doc(user.uid)
		.set(user)
		.then((response) => {
			return {
				alert: {
					type: "success",
					text: "Has actualizado la información con éxito.",
				},
			};
		})
		.catch((error) => {
			console.error(error.code);
			return {
				alert: {
					type: "error",
					text: "Ha habido un problema, intenta nuevamente.",
				},
			};
		});
};
