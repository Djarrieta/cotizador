import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../App/components/ContextProvider";
import VerificationDataModel from "../../../App/models/VerificationDataModel";
import ROLES from "../../../constants/ROLES";
import { verifyDataInfo } from "../../../utils/verifyDataInfo";
import { CurrentTeamModel } from "../models/CurrentTeamModel";
import { editSingleTeamService } from "../services/editSingleTeamService";
import { getSingleTeamService } from "../services/getSingleTeamService";

export const useTeamDetail = () => {
	const { setLoading, currentTeam, setAlert, currentUser } =
		useContext(Context);
	const { teamId } = useParams<{ teamId: string }>();

	const [data, setData] = useState<CurrentTeamModel>({
		teamId: "",
		name: "",
		pictureURL: "",
		members: [],
	});
	const verificationData: VerificationDataModel[] = [
		{
			condition: !data.teamId,
			text: "Coloca un ID de equipo válido.",
		},
    {
			condition: data.teamId.length<3,
			text: "Coloca un ID de equipo más largo.",
		},
		{
			condition: !data.name,
			text: "Coloca un nombre válido.",
		},
		{
			condition: data.members.length === 0 && teamId !== "nuevo",
			text: "Debe haber por lo menos un miembro",
		},
	];
	const saveTeamData = () => {
		setLoading(true);
		const infoVerified = verifyDataInfo(
			verificationData,
			"Has guardado la información de equipo."
		);
		if (!infoVerified.ok) {
			setAlert({ text: infoVerified.text, type: "error" });
			setLoading(false);
			return;
		}

		if (teamId === "nuevo") {
			setData({
				...data,
				members: [
					{ uid: currentUser.uid, email: currentUser.email, role: ROLES.Admin },
				],
			});
		}

		editSingleTeamService(data).then((response) => {
			console.log(response);
			setAlert(response.alert);
			setLoading(false);
		});
	};

	const changePictureURL = () => {
		console.log("cambia foto");
	};
	const handleRoleChange = (selectedUid: string, newRole: ROLES) => {
		setLoading(true);
		const editedMembers = data.members.map((member) => {
			if (member.uid === selectedUid) {
				return { uid: member.uid, role: newRole, email: member.email };
			} else {
				return member;
			}
		});

		if (
			editedMembers.filter((member) => member.role === ROLES.Admin).length < 1
		) {
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

	useEffect(() => {
		if (currentTeam && teamId === currentTeam.teamId) {
			setData(currentTeam);
			return;
		}
		if (teamId === "nuevo") {
			return;
		}
		getSingleTeamService(teamId).then((response) => console.log(response));
	}, [teamId, currentTeam]);
	return {
		teamId,
		data,
		setData,
		saveTeamData,
		changePictureURL,
		handleRoleChange,
	};
};
