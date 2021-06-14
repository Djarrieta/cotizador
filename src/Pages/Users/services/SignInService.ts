import { firebaseAuth, firebaseDB } from "../../../config/firebase";
import AlertModel from "../../App/models/AlertModel";
import CurrentUserModel from "../models/CurrentUserModel";

const  signInService = (
	email: string,
	password: string
): Promise<{
	alert: AlertModel;
	data?: CurrentUserModel;
}> => {
	return firebaseAuth
		.signInWithEmailAndPassword(email, password)
		.then((response) => {
			return firebaseDB
				.collection("users")
				.doc(response.user.uid)
				.get()
				.then((response) => {
					return {
						alert: {
							type: "success",
							text: "Haz ingresado satisfactoriomante.",
						},
						data: { ...response.data() },
					};
				});
		})
		.catch((error) => {
			switch (error.code) {
				case "auth/invalid-email":
					return {alert:{type:"error",text:"El formato del correo no es válido."}}
				case "auth/user-not-found":
					return {
						alert: { type: "error", text: "El usuario ingresado no existe." },
					};
				case "auth/wrong-password":
					return { alert: { type: "error", text: "Contraseña incorrecta." } };
				default:
					return {
						alert: {
							type: "error",
							text: "Hubo un problema, intenta nuevamente.",
						},
					};
			}
		});
};

export default signInService