import { ResponseModel } from "../../../App/models/ResponseModel";
import { firebaseDB } from "../../../config/firebase";
import { CurrentTeamModel } from "../models/CurrentTeamModel";

export const createTeamService = (
	team: CurrentTeamModel
): Promise<ResponseModel> => {
	
	const batch = firebaseDB.batch();
	batch.set(firebaseDB.collection("teams").doc(team.teamId), team);
	batch.update(firebaseDB.collection("users").doc(team.members[0].uid), {
		defaultTeam: team.teamId,
	});

	return batch
		.commit()
		.then(() => {
			return {
				alert: { type: "success", text: "Equipo editado con éxito." },
				data: { currentTeam: team },
			};
		})
		.catch((error) => {
			console.error(error);
			return {
				alert: { type: "error", text: "Hubo un problema." },
			};
		});
};
