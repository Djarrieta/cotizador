import { CurrentUserModel } from "../models/CurrentUserModel";

export const getSingleUserService = (
	uid: string
): Promise<CurrentUserModel> => {
	return new Promise((resolve, reject) => {
		resolve({
			name: "userName",
			uid: "uid",
			whatsapp: "whatsapp",
			pictureURL: "url",
			defaultTeam: "team",
		});
	});
};
