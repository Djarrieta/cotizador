import { ResponseTeamModel } from "../models/ResponseTeamModel";
export const addTeamMemberService = (
	teamId: string,
	newMember: {
		email: string;
		role: string;
	}
): Promise<ResponseTeamModel> => {
	return new Promise((resolve, reject) => {
		resolve({
			alert: { text: "Miembro agregado con éxito", type: "success" },
			data: {
				name: "Other team comming from service",
				teamId: "uid",
				pictureURL: "url",
				members: [{ email: "email@member1", role: "admin", uid: "uid" }],
			},
		});
	});
};
