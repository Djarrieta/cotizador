import { firebaseAuth } from "../../../config/firebase";

const updatePasswordService = (newPassword) => {
	firebaseAuth.currentUser
		.updatePassword(newPassword)
		.then(() => {
			return {
				type: "success",
				text: "Se ha actualizado la contraseña con éxito.",
			};
		})
		.catch((error) => {
			console.error(error.code);
			return {
				type: "error",
				text: "Hubo un problema, intenta nuevamente.",
			};
		});
};
export default updatePasswordService;
