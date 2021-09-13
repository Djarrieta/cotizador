import { firebaseDB } from "../../../config/firebase";
import { CurrentTeamModel } from "../models/CurrentTeamModel";
import { ResponseTeamModel } from "../models/ResponseTeamModel";

export const editSingleTeamService = (
	team: CurrentTeamModel
): Promise<ResponseTeamModel> => {
	return firebaseDB
		.collection("teams")
		.doc(team.teamId)
		.set(team)
		.then((response) => {
			console.log(response)
			return {
				alert: { text: "Equipo guardado", type: "success" },
				currentTeam: response,
			};
		})
		.catch((error) => {
			console.error(error.code);
			return {
				alert: {
					type: "error",
					text: "Hubo un problema y no se guardó la información.",
				},
			};
		});
};
