import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Context } from "../../../GlobalComponents/ContextProvider";
import VerificationDataModel from "../../App/models/VerificationDataModel";
import { verifyDataInfo } from "../../../utils/verifyDataInfo";
import { CurrentTeamModel } from "../models/CurrentTeamModel";
import { Roles } from "../models/Roles";
import { editSingleTeamService } from "../services/editSingleTeamService";
import { getSingleTeamService } from "../services/getSingleTeamService";
import { editRoleMemberService } from "../services/editRoleMemberService";

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
	useEffect(() => {}, [data]);

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
					? [{ teamId: data.teamId, role: Roles.Admin as Roles }]
					: [
							...currentUser.teams,
							{ teamId: data.teamId, role: Roles.Admin as Roles },
					  ];

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
		setAlert({ type: "error", text: "En construcción..." });
	};
	const handleRoleChange = (selectedUid: string, newRole: Roles) => {
		setLoading(true);
		const newMemberList = data.members.map((el) => {
			return el.uid === selectedUid ? { ...el, role: newRole } : el;
		});
		editRoleMemberService(data.teamId, newMemberList).then((response) => {
			setAlert(response.alert);
			setLoading(false);
			setData({
				...data,
				members: newMemberList,
			});
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
