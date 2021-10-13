import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Context } from "../../../App/components/ContextProvider";
import VerificationDataModel from "../../../App/models/VerificationDataModel";
import { verifyDataInfo } from "../../../utils/verifyDataInfo";
import { CurrentTeamModel } from "../models/CurrentTeamModel";
import { Roles } from "../models/Roles";
import { createTeamService } from "../services/createTeamService";

export const useNewTeam = () => {
	const { setLoading, setAlert, currentUser, setCurrentUser } =
		useContext(Context);
	const history = useHistory();

	const [data, setData] = useState<CurrentTeamModel>({
		teamId: "",
		name: "",
		pictureURL: "",
		members: [],
	});

	const verificationData: VerificationDataModel[] = [
		{
			condition: !data.teamId,
			text: "No hay id de equipo.",
		},
		{
			condition: !data.name,
			text: "Coloca un nombre válido.",
		},
	];

	const saveNewTeamData = async () => {
		setLoading(true);
		const infoVerified = verifyDataInfo(
			verificationData,
			"Has actualizado la información de equipo."
		);
		if (!infoVerified.ok) {
			setAlert({ text: infoVerified.text, type: "error" });
			setLoading(false);
			return;
		}

		createTeamService({
			...data,
			members: [
				{
					email: currentUser.email,
					role: Roles.Admin,
					uid: currentUser.uid,
				},
			],
		}).then((response) => {
			setCurrentUser({
				...currentUser,
				defaultTeam: data.teamId,
				teams: [{ teamId: data.teamId, role: Roles.Admin }],
			});
			history.push(`/equipo/${data.teamId}`);

			setAlert(response.alert);
			setLoading(false);
			history.push("/");
		});
	};

	return {
		data,
		setData,
		saveNewTeamData,
		history,
	};
};
