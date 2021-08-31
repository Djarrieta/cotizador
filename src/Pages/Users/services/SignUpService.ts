import { CurrentUserModel } from "../models/CurrentUserModel";
import { ResponseUserModel } from "../models/ResponseUserModel";

export const signUpService = (
	newUser: CurrentUserModel
): Promise<ResponseUserModel> => {
	return new Promise((resolve, reject) => {
		resolve({
			alert: { type: "success", text: "Has ingresado" },
			data: {
				currentUser: {
					name: "Dario",
					uid: "uidvalue",
					email: "arrieta.dario@hotmail.com",
					whatsapp: "3008718217",
					defaultTeam: "myTeam",
					teams: [
						{ teamId: "myTeamId", role: "admin" },
						{ teamId: "OtherTeamId", role: "comercial" },
					],
				},
				currentTeam: {
					name: "My Team Name",
					pictureURL: "",
					teamId: "myTeamId",
					members: [{ role: "Admin", email: "asdf@asdf.com" , uid:"uidUp"}],
				},
			},
		});
	});
	/* 	let finalUser={}
	return firebaseAuth
		.createUserWithEmailAndPassword(newUser.email, newUser.password)
		.then((response) => {
			finalUser={
				uid: response.user.uid,
				email: newUser.email,
				pictureURL:
					"https://firebasestorage.googleapis.com/v0/b/cotizador-2db51.appspot.com/o/assets%2FProfile.png?alt=media&token=74b7d3e1-4f26-4a16-b5ac-d8ac0a3a72ca",
				created: firebaseDate,
				updated: firebaseDate,
			}
			return firebaseDB
				.collection("users")
				.doc(response.user.uid)
				.set(finalUser)
				.then(() => {
					return {
						alert: {
							type: "success",
							text: "Haz creado tu cuenta satisfactoriomante.",
						},
						data: finalUser,
					};
				});
		})
		.catch((error) => {
			console.error(error);
			const alertCases = {
				"auth/email-already-in-use":
					"Este email ya está en uso, intenta con otro o recupera tu contraseña.",
			};
			return {
				alert: {
					type: "error",
					text:
						alertCases[error.code] || "Hubo un problema, intenta nuevamente.",
				},
			};
		}); */
};
