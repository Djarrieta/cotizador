import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Context } from "../../../GlobalComponents/ContextProvider";
import VerificationDataModel from "../../App/models/VerificationDataModel";
import { verifyDataInfo } from "../../../utils/verifyDataInfo";
import { CurrentUserModel } from "../models/CurrentUserModel";
import { editSingleUserService } from "../services/editSingleUserService";
import { getSingleUserService } from "../services/getSingleUserService";
import { signOutService } from "../services/SignOutService";

const useProfile = () => {
	const history = useHistory();
	const { uid } = useParams<{ uid: string }>();
	const { setLoading, currentUser, setAlert, setCurrentUser } =
		useContext(Context);

	const [data, setData] = useState<CurrentUserModel>({
		uid: "",
		name: "",
		email: "",
		whatsapp: "",
		pictureURL: "",
		teams: [],
	});

	const verificationData: VerificationDataModel[] = [
		{
			condition: !data.uid,
			text: "No hay id de usuario. Actualiza la página.",
		},
		{
			condition: !data.name,
			text: "El nombre no puede estar vacío.",
		},
		{
			condition: !data.email,
			text: "Email no puede estar vacío.",
		},
		{
			condition: !data.whatsapp,
			text: "Especifica un número con whatsapp no puede estar vacío.",
		},
	];

	useEffect(() => {
		if (currentUser?.uid === uid) {
			setData(currentUser);
			return;
		}
		getSingleUserService(uid).then((response) => setData(response.currentUser));
	}, [uid, currentUser]);

	const saveUserData = () => {
		setLoading(true);
		const infoVerified = verifyDataInfo(
			verificationData,
			"Has actualizado la información de usuario."
		);
		if (!infoVerified.ok) {
			setAlert({ text: infoVerified.text, type: "error" });
			setLoading(false);
			return;
		}

		editSingleUserService(data).then((response) => {
			setAlert(response.alert);
			if (response.alert.type === "success") {
				setCurrentUser(response.currentUser);
			}
			setLoading(false);
		});
	};

	const changePictureURL = () => {
		console.log("cambia foto");
	};

	const signOut = () => {
		setLoading(true);
		signOutService().then((response) => {
			setCurrentUser(undefined);
			setAlert(response.alert);
			setLoading(false);
			history.push("/ingreso");
		});
	};

	return {
		data,
		setData,
		saveUserData,
		changePictureURL,
		signOut,
		history,
	};
};

export default useProfile;
