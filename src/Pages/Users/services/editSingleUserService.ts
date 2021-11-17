import { firebaseDB } from "../../../config/firebase";
import { ResponseModel } from "../../App/models/ResponseModel";
import { CurrentUserModel } from "../models/CurrentUserModel";

export const editSingleUserService = (
	user: CurrentUserModel
): Promise<ResponseModel> => {
	return firebaseDB
		.collection("users")
		.doc(user.uid)
		.update(user)
		.then(() => {
			return {
				alert: {
					type: "success",
					text: "Has actualizado la información con éxito.",
				},
				data: user,
			} as ResponseModel;
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
