import { ResponseModel } from "../../../App/models/ResponseModel";
import { firebaseDB } from "../../../config/firebase";
import { CurrentTeamModel } from "../models/CurrentTeamModel";

export const editSingleTeamService = (
	team: CurrentTeamModel
): Promise<ResponseModel> => {
	return firebaseDB
		.collection("teams")
		.doc(team.teamId)
		.set(team)
		.then(() => {
			return {
				alert: { type: "success", text: "Equipo editado con éxito." },
				data: { currentTeam: team },
			};
		}).catch(error=>{
			console.error(error)
			return {
				alert: { type: "error", text: "Hubo un problema." }
			}
		});
};
