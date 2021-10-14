import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Context } from "../../../GlobalComponents/ContextProvider";
import VerificationDataModel from "../../App/models/VerificationDataModel";
import Button from "../../../GlobalComponents/Button";
import FieldText from "../../../GlobalComponents/FieldText";
import Section from "../../../GlobalComponents/Section";
import { verifyDataInfo } from "../../../utils/verifyDataInfo";
import { addTeamMemberService } from "../services/addTeamMemberService";

const NewMember = () => {
	const { setLoading, setAlert } = useContext(Context);
	const { teamId } = useParams<{ teamId: string }>();
	const [newMember, setNewMember] = useState<{ email: string; role: string }>({
		email: "",
		role: "Comercial",
	});
	const history = useHistory();
	const saveNewMember = () => {
		setLoading(true);
		const verificationData: VerificationDataModel[] = [
			{
				condition: !teamId,
				text: "No hay id de equipo. Actualiza la página.",
			},
			{
				condition: !newMember.email,
				text: "Coloca un email válido.",
			},
			{
				condition: !newMember.role,
				text: "Coloca un role válido.",
			},
		];

		const infoVerified = verifyDataInfo(
			verificationData,
			"Has agregado un nuevo miembro."
		);

		if (!infoVerified.ok) {
			setAlert({ text: infoVerified.text, type: "error" });
			setLoading(false);
			return;
		}
		addTeamMemberService(teamId, newMember).then((response) => {
			setAlert({ text: infoVerified.text, type: "success" });
			history.push("/equipo/" + teamId);
			setLoading(false);
		});
	};
	return (
		<Section name={teamId + " nuevo miembro"}>
			<div>
				<FieldText
					label="Email"
					value={newMember.email}
					onChange={(event) =>
						setNewMember({ ...newMember, email: event.target.value })
					}
				/>
{/* 				<FieldSelect
					label="Role"
					options={ROLES}
					selectedValue={newMember.role}
					handleChange={(event) =>
						setNewMember({ ...newMember, role: event.target.value })
					}
				/> */}
				<Button name="Guardar" handleFunction={saveNewMember} />
				<Button
					name="Cancelar"
					handleFunction={() => history.push("/equipo/" + teamId)}
					secondary={true}
				/>
			</div>
		</Section>
	);
};
export default NewMember;
