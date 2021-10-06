import firebase from "firebase/app";
import { firebaseDB } from "../../../config/firebase";
import { ResponseTeamModel } from "../models/ResponseTeamModel";
export const addTeamMemberService = (
	teamId: string,
	newMember: {
		email: string;
		role: string;
	}
): Promise<ResponseTeamModel> => {
	return firebaseDB
		.collection("teams")
		.doc(teamId)
		.update({ members: firebase.firestore.FieldValue.arrayUnion(newMember) })
		.then(() => {
			return { alert: { type: "success", text: "Miembro agregado con éxito" } };
		});
};
