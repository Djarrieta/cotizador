import Button from "../../../GlobalComponents/Button";
import FieldSelect from "../../../GlobalComponents/FieldSelect";
import FieldText from "../../../GlobalComponents/FieldText";
import IconTeam from "../../../GlobalComponents/icons/IconTeam";
import IconUser from "../../../GlobalComponents/icons/IconUser";
import Section from "../../../GlobalComponents/Section";
import Table from "../../../GlobalComponents/Table";
import TableData from "../../../GlobalComponents/TableData";
import TableRow from "../../../GlobalComponents/TableRow";
import { useTeamDetail } from "../hooks/useTeamDetail";
import { Roles } from "../models/Roles";

const TeamDetail = () => {
	const {
		teamId,
		data,
		setData,
		saveTeamData,
		changePictureURL,
		handleRoleChange,
		history,
	} = useTeamDetail();

	return (
		<>
			<Section name="Equipo">
				<div className="flex flex-col-reverse my-6 sm:flex-row">
					<div className="w-full px-6 pb-2 my-3s sm:w-1/2">
						<FieldText
							label="ID"
							value={data.teamId}
							disabled={teamId !== "nuevo"}
							maxlength={10}
							onChange={(event) =>
								event.target.value.match(/^[A-Za-z]*$/) &&
								setData({
									...data,
									teamId: event.target.value.toLowerCase(),
								})
							}
						/>
						<FieldText
							label="Nombre"
							value={data.name}
							onChange={(e) => setData({ ...data, name: e.target.value })}
							onEnter={saveTeamData}
						/>
						<Button name="Guardar" handleFunction={saveTeamData} />
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
				handleFunction={() => history.push("/" + teamId + "/nuevo-miembro")}
			>
				<Table>
					{data.members.map((member) => {
						return (
							<TableRow keyValue={member.email}>
								<TableData>
									<IconUser />
								</TableData>
								<TableData>
									<span>{member.email}</span>
								</TableData>
								<TableData>
									<FieldSelect
										selectedValue={Roles[member.role]}
										options={Object.keys(Roles).map((role) => Roles[role])}
										handleChange={(event) =>
											handleRoleChange(member.uid, Roles[event.target.value])
										}
									/>
								</TableData>
							</TableRow>
						);
					})}
				</Table>
			</Section>
		</>
	);
};

export default TeamDetail;
