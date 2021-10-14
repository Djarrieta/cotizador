import { ResponseModel } from "../../../App/models/ResponseModel";
import { firebaseDB } from "../../../config/firebase";

export const getSingleTeamService = (
	teamId: string
): Promise<ResponseModel> => {
	return firebaseDB
		.collection("teams")
		.doc(teamId)
		.get()
		.then((respose) => {
			return { alert: { type: "success", text: "" }, data: respose.data() };
		});
};
