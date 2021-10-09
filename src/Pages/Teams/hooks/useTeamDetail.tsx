import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Context } from "../../../App/components/ContextProvider";
import VerificationDataModel from "../../../App/models/VerificationDataModel";
import { verifyDataInfo } from "../../../utils/verifyDataInfo";
import { CurrentTeamModel } from "../models/CurrentTeamModel";
import { editSingleTeamService } from "../services/editSingleTeamService";
import { getSingleTeamService } from "../services/getSingleTeamService";

export const useTeamDetail = () => {
	const { teamId } = useParams<{ teamId: string }>();
	const { setLoading, currentTeam, setAlert } = useContext(Context);
  const history=useHistory()

	const [data, setData] = useState<CurrentTeamModel>({
		teamId: "",
		name: "",
		pictureURL: "",
		members: [],
	});

	const verificationData: VerificationDataModel[] = [
		{
			condition: !data.teamId,
			text: "No hay id de equipo. Actualiza la página.",
		},
		{
			condition: !data.name,
			text: "Coloca un nombre válido.",
		},
		{
			condition: data.members.length === 0,
			text: "Debe haber por lo menos un miembro",
		},
	];

	useEffect(() => {
		if (currentTeam && teamId === currentTeam.teamId) {
			setData(currentTeam);
			return;
		}
		if (teamId !== "nuevo") {
			getSingleTeamService(teamId).then((response) => setData(response));
		}
	}, [teamId, currentTeam]);

	const saveTeamData = () => {
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

		editSingleTeamService(data).then((response) => {
			setAlert(response.alert);
			setLoading(false);
		});
	};

	const changePictureURL = () => {
		console.log("cambia foto");
	};
	const handleRoleChange = (selectedUid: string, newRole: string) => {
		setLoading(true);
		const editedMembers = data.members.map((member) => {
			if (member.uid === selectedUid) {
				return { uid: member.uid, role: newRole, email: member.email };
			} else {
				return member;
			}
		});

		if (editedMembers.filter((member) => member.role === "Admin").length < 1) {
			setAlert({
				type: "error",
				text: "Debe haber por lo menos un Admin",
			});
			setLoading(false);
			return;
		}

		setData({ ...data, members: editedMembers });
		editSingleTeamService(data).then((response) => {
			setAlert(response.alert);
			setLoading(false);
		});
	};
	return { teamId, data, setData, saveTeamData, changePictureURL, handleRoleChange ,history};
};
