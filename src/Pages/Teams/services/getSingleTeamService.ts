import { CurrentTeamModel } from "../models/CurrentTeamModel";
import { Roles } from "../models/Roles";

export const getSingleTeamService = (
	teamId: string
): Promise<CurrentTeamModel> => {
	return new Promise((resolve, reject) => {
		resolve({
			name: "Other team comming from service",
			teamId: "uid",
			pictureURL: "url",
			members:[ { email: "email@member1", role: Roles.Admin , uid:"uid"}],
		});
	});
};
