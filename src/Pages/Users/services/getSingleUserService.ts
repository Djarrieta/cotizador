import { firebaseDB } from "../../../config/firebase";
import { ResponseModel } from "../../App/models/ResponseModel";
import { ResponseUserModel } from "../models/ResponseUserModel";

export const getSingleUserService = (
	uid: string
): Promise<ResponseUserModel> => {
	return firebaseDB
		.collection("users")
		.doc(uid)
		.get()
		.then((response) => {
			return {
				alert: { type: "success", text: "" },
				data:	{			currentUser: response.data()},
			} as ResponseModel;
		})
		.catch((error) => {
			console.error(error);
			return {
				alert: { type: "error", text: "Hubo un problema, intenta nuevamente." },
			};
		});
};
