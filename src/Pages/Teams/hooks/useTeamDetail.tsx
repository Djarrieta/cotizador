import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Context } from "../../../App/components/ContextProvider";
import VerificationDataModel from "../../../App/models/VerificationDataModel";
import { verifyDataInfo } from "../../../utils/verifyDataInfo";
import { CurrentTeamModel } from "../models/CurrentTeamModel";
import { Roles } from "../models/Roles";
import { editSingleTeamService } from "../services/editSingleTeamService";
import { getSingleTeamService } from "../services/getSingleTeamService";

export const useTeamDetail = () => {
	const { teamId } = useParams<{ teamId: string }>();
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

	useEffect(() => {
		setLoading(true);
		getSingleTeamService(teamId).then((response) => {
			const teamData: CurrentTeamModel = response.data;
			setData(teamData);
			setLoading(false);
		});
	}, [teamId, setLoading]);

	const saveTeamData = async () => {
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

		const newMemberData =
			data.members.length === 0
				? {
						...data,
						members: [
							{
								email: currentUser.email,
								role: Roles.Admin,
								uid: currentUser.uid,
							},
						],
				  }
				: data;

		editSingleTeamService(newMemberData).then((response) => {
			const newTeams =
				!currentUser.teams || currentUser.teams.length === 0
					? [{ teamId: data.teamId, role: Roles.Admin }]
					: [...currentUser.teams, { teamId: data.teamId, role: Roles.Admin }];

			setCurrentUser({
				...currentUser,
				defaultTeam: data.teamId,
				teams: newTeams,
			});

			setAlert(response.alert);
			setLoading(false);
			history.push("/");
		});
	};

	const changePictureURL = () => {
		console.log("cambia foto");
	};
	const handleRoleChange = (selectedUid: string, newRole: Roles) => {
		setLoading(true);
		const editedMembers = data.members.map((member) => {
			if (member.uid === selectedUid) {
				return { uid: member.uid, role: newRole, email: member.email };
			} else {
				return member;
			}
		});

		if (
			editedMembers.filter((member) => member.role === Roles.Admin).length < 1
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
	return {
		teamId,
		data,
		setData,
		saveTeamData,
		changePictureURL,
		handleRoleChange,
		history,
	};
};
