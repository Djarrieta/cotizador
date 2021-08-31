import { CurrentTeamModel } from "../models/CurrentTeamModel";

export const getSingleTeamService = (
	teamId: string
): Promise<CurrentTeamModel> => {
	return new Promise((resolve, reject) => {
		resolve({
			name: "Other team comming from service",
			teamId: "uid",
			pictureURL: "url",
			members:[ { email: "email@member1", role: "admin" , uid:"uid"}],
		});
	});
};
