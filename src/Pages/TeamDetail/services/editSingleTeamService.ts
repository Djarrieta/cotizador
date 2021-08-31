import { CurrentTeamModel } from "../models/CurrentTeamModel";
import { ResponseTeamModel } from "../models/ResponseTeamModel";

export const editSingleTeamService = (
	team: CurrentTeamModel
): Promise<ResponseTeamModel> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				alert: { type: "success", text: "Equipo editado con éxito." },
				data: team,
			});
		}, 1000);
	});
};
