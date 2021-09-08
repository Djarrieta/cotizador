import { CurrentUserModel } from "../models/CurrentUserModel";
import { ResponseUserModel } from "../models/ResponseUserModel";

export const editSingleUserService = (
	user: CurrentUserModel
): Promise<ResponseUserModel> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				alert: { type: "success", text: "Usuario editado con éxito." },
				currentUser: {
					name: "userName",
					uid: "uid",
					whatsapp: "whatsapp",
					pictureURL: "url",
					defaultTeam: "team",
				},
			});
		}, 5000);
	});
};
