import { firebaseDB } from "../../../config/firebase";
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
				currentUser: response.data(),
			};
		})
		.catch((error) => {
			console.error(error);
			return {
				alert: { type: "error", text: "Hubo un problema, intenta nuevamente." },
			};
		});
};
