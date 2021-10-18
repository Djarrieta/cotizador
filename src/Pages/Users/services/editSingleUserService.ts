import { firebaseDB } from "../../../config/firebase";
import { ResponseModel } from "../../App/models/ResponseModel";
import { CurrentUserModel } from "../models/CurrentUserModel";


export const editSingleUserService = (
	user: CurrentUserModel
): Promise<ResponseModel> => {
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
			}  as ResponseModel;;
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
