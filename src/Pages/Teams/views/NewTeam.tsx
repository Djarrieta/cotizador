import { useContext } from "react";
import { useHistory } from "react-router";
import Button from "../../../GlobalComponents/Button";
import { Context } from "../../../GlobalComponents/ContextProvider";
import FieldText from "../../../GlobalComponents/FieldText";
import Section from "../../../GlobalComponents/Section";
import { useNewTeam } from "../hooks/useNewTeam";

const NewTeam = () => {
	const { data, setData, saveNewTeamData } = useNewTeam();
	const history = useHistory();
	const { currentUser } = useContext(Context);
	return (
		<>
			<Section name="Crear Nuevo Equipo">
				<div className="flex flex-col-reverse my-6 sm:flex-row">
					<div className="w-full px-6 pb-2 my-3s sm:w-1/2">
						<FieldText
							label="ID"
							value={data.teamId}
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
							label="Nombre completo"
							value={data.name}
							onChange={(e) => setData({ ...data, name: e.target.value })}
							onEnter={saveNewTeamData}
						/>
						<Button name="Guardar" handleFunction={saveNewTeamData} />
						<Button
							name="Cancelar"
							handleFunction={() => history.push("/perfil/" + currentUser.uid)}
							secondary={true}
						/>
					</div>
				</div>
			</Section>
		</>
	);
};

export default NewTeam;
