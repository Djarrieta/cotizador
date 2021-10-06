import { firebaseDB } from "../../../config/firebase";
import { ResponseTeamModel } from "../models/ResponseTeamModel";

export const getSingleTeamService = (
	teamId: string
): Promise<ResponseTeamModel> => {
	return firebaseDB
		.collection("teams")
		.doc(teamId)
		.get()
		.then((response) => {
			console.log(response)
			return {
				alert: { type: "success", text: "hola" },
			};
		});
};
