import { firebaseDB } from "../../../config/firebase";
import { ResponseModel } from "../../App/models/ResponseModel";
import { Roles } from "../models/Roles";

export const editRoleMemberService = (
	teamId: string,
	newMembersList: { email: string; role: Roles; uid: string }[]
): Promise<ResponseModel> => {
	return firebaseDB
		.collection("teams")
		.doc(teamId)
		.update({ members: newMembersList })
		.then(() => {
			return {
				alert: { type: "success", text: "Equipo editado con éxito." },
			} as ResponseModel;
		})
		.catch((error) => {
			console.error(error);
			return {
				alert: { type: "error", text: "Hubo un problema." },
			};
		});
};
