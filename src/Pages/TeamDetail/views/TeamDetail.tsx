import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context } from "../../../App/components/ContextProvider";
import VerificationDataModel from "../../../App/models/VerificationDataModel";
import ROLES from "../../../constants/ROLES";
import Button from "../../../GlobalComponents/Button";
import FieldSelect from "../../../GlobalComponents/FieldSelect";
import FieldText from "../../../GlobalComponents/FieldText";
import IconTeam from "../../../GlobalComponents/icons/IconTeam";
import IconUser from "../../../GlobalComponents/icons/IconUser";
import Section from "../../../GlobalComponents/Section";
import Table from "../../../GlobalComponents/Table";
import TableItem from "../../../GlobalComponents/TableItem";
import { verifyDataInfo } from "../../../utils/verifyDataInfo";
import { CurrentTeamModel } from "../models/CurrentTeamModel";
import { editSingleTeamService } from "../services/editSingleTeamService";
import { getSingleTeamService } from "../services/getSingleTeamService";

const TeamDetail = () => {
	const { teamId } = useParams<{ teamId: string }>();
	const { setLoading, currentTeam, setAlert } = useContext(Context);

	const [data, setData] = useState<CurrentTeamModel>({
		teamId: "",
		name: "",
		pictureURL: "",
		members: [],
	});
	const [newMember, setNewMember] = useState<{ email: string; role: string }>({
		email: "",
		role: "Comercial",
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
		getSingleTeamService(teamId).then((response) => setData(response));
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

	return (
		<>
			<Section name="Equipo ">
				<div className="flex flex-col-reverse my-6 sm:flex-row">
					<div className="w-full px-6 pb-2 my-3s sm:w-1/2">
						<FieldText label="ID" value={data.teamId} disabled={true} />
						<FieldText
							label="Nombre"
							value={data.name}
							handleFuntion={(e) => setData({ ...data, name: e.target.value })}
						/>

						<Button name="Editar" handleFunction={saveTeamData} />
						<div className="w-1/2 text-left">
							<Button
								name="Archivar"
								handleFunction={() => {}}
								secondary={true}
							/>
						</div>
					</div>
					<div className="flex flex-col justify-center w-full px-6 pb-2 my-3 sm:w-1/2 max-h-60">
						{data.pictureURL ? (
							<img src={data.pictureURL} alt="profile" />
						) : (
							<IconTeam />
						)}
						<Button
							name="Editar foto"
							handleFunction={changePictureURL}
							secondary={true}
						/>
					</div>
				</div>
			</Section>
			<Section
				name="Miembros"
				button={true}
				buttonName="Invitar"
				handleFunction={() => console.log("hola")}
			>
				<Table>
					<TableItem>
						<div className="flex w-full px-2 py-4 mb-3 border rounded-lg">
							<FieldText
								label="Email"
								value={newMember.email}
								handleFuntion={(event) => console.log(event.target.value)}
							/>
							<FieldSelect
								label="Role"
								options={ROLES}
								selectedValue={newMember.role}
								handleChange={(event) => console.log(event.target.value)}
							/>
							<div>
								<Button name="Guardar" handleFunction={() => {}} />
								<Button name="Cancelar" handleFunction={() => {}} />
							</div>
						</div>
					</TableItem>

					{data.members.map((member) => {
						return (
							<TableItem key={member.email}>
								<IconUser />
								<span>{member.email}</span>
								<FieldSelect
									selectedValue={member.role}
									options={ROLES}
									handleChange={(event) =>
										handleRoleChange(member.uid, event.target.value)
									}
								/>
							</TableItem>
						);
					})}
				</Table>
			</Section>
		</>
	);
};

export default TeamDetail;
