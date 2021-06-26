import { firebaseAuth } from "../../../config/firebase";

const signOutService = () => {
	return firebaseAuth
		.signOut()
		.then(() => {
			return {
				alert: {
					type: "success",
					text: "Haz cerrado sesión satisfactoriomante.",
				},
			};
		})
		.catch((e) => {
			console.error(e);
			return {
				alert: {
					type: "error",
					text: "Hubo un problema al cerrar sesión.  Intenta nuevamente",
				},
			};
		});
};
export default signOutService;
