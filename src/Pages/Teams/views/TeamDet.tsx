import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import Button from "../../../GlobalComponents/Button";
import Container from "../../../GlobalComponents/Container";
import { firebaseDate, firebaseDB } from "../../../config/firebase";
import MemberLine from "../components/MemberLine";
import Section from "../../../GlobalComponents/Section";

const TeamDet = (props: any) => {
	const { id } = useParams<{ id: string }>();
	const { currentUser } = props;
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [newMember, setNewMember] = useState<{
		email: string;
		role: string;
		opened: boolean;
	}>({ email: "", role: "Basic", opened: false });
	const [problems, setProblems] = useState("");
	const [data, setData] = useState<{
		teamId: string;
		name: string;
		members: object[];
		pictureURL: string;
	}>({
		teamId: "",
		name: "",
		members: [],
		pictureURL:
			"https://firebasestorage.googleapis.com/v0/b/cotizador-2db51.appspot.com/o/assets%2FTeam.png?alt=media&token=61ff4ed2-1307-4b3a-8826-a407b3301d95",
	});
	const saveTeamData = () => {
		setProblems("");
		if (!data.name) {
			setProblems("Nombre inválido");
		} else if (!data.teamId) {
			setProblems("ID del equipo no válido.");
		}
		if (problems) {
			return;
		}
		if (id === "0") {
			firebaseDB
				.collection("teams")
				.doc(data.teamId)
				.set({
					...data,
					members: [{ email: currentUser.email, role: "Admin" }],
					created: firebaseDate,
					updated: firebaseDate,
				})
				.then(() => {
					history.push(data.teamId);
				})
				.catch((e) => console.error(e));
		} else {
			console.log("update");
		}
	};
	const addNewMember = () => {
		console.log(newMember);
	};
	useEffect(() => {
		setLoading(true);
		if (id !== "0") {
			console.log("cargando nuevos datos");
			firebaseDB
				.collection("teams")
				.doc(id)
				.get()
				.then((team: any) => {
					setLoading(false);
					if (team.exists) {
						setData(team.data());
					}
				})
				.catch((e) => {
					setLoading(false);
					console.error(e);
				});
		} else {
			setLoading(false);
		}
	}, []);

	return (
		<div>
			<Container>
				<Section name={"Equipo " + (id === "0" ? "Nuevo" : data.teamId)}>
					<div className="flex flex-col-reverse sm:flex-row">
						<div className="w-full px-6 pb-2 my-3 sm:w-1/2">
							{/* ID */}
							<div className="flex flex-col mb-2">
								<label className="text-xs capitalize">ID</label>
								<input
									className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
									value={data.teamId
										.replace(" ", "")
										.replace("/", "")
										.replace("?", "")
										.toLowerCase()}
									maxLength={10}
									onChange={(e) => setData({ ...data, teamId: e.target.value })}
								/>
							</div>
							{/* Name */}
							<div className="flex flex-col mb-2">
								<label className="text-xs capitalize">Nombre</label>
								<input
									className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
									value={data.name}
									onChange={(e) => setData({ ...data, name: e.target.value })}
								/>
							</div>
							<span className="text-error">{problems}</span>
							<Button name="Guardar" handleFunction={saveTeamData} />
						</div>
						<div className="w-full px-6 pb-2 my-3 sm:w-1/2">
							<img src={data.pictureURL} alt="profile" />
							{/* <Button name="✏️" handleFunction={changePictureURL} /> */}
						</div>
					</div>
				</Section>

				<Section
					name="Miembros"
					button={true}
					handleFunction={() => {
						setNewMember({ ...newMember, opened: true });
					}}
				>
					<div className="flex flex-col items-center justify-around w-full py-1">
						{newMember.opened && (
							<MemberLine
								inputValue={newMember.email}
								roleValue={newMember.role}
								handleInputChange={(e: any) => {
									setNewMember({ ...newMember, email: e.target.value });
								}}
								handleRoleChange={(e: any) => {
									setNewMember({ ...newMember, role: e.target.value });
								}}
								handleTrash={() => {
									setNewMember({ ...newMember, opened: false });
								}}
								handleConfirm={addNewMember}
							/>
						)}
						{data.members.map((member: any, n) => {
							return (
								<MemberLine
									key={n}
									inputValue={member.email}
									roleValue={member.role}
									handleRoleChange={(e: any) => {
										console.log(data);
										console.log(e.target.value);
									}}
									handleInputChange={() => {}}
								/>
							);
						})}
					</div>
				</Section>
				<Section name="Opciones">
					<div className="flex justify-around w-full my-4">
						<Link to="/equipos" className="text-realced">
							Volver a Equipos
						</Link>
						<Link to={"/perfil/"} className="text-realced">
							Ver mi perfil
						</Link>
						<Link to="/" className="text-realced">
							Inicio
						</Link>
					</div>
				</Section>
				<Section name="Actividad"></Section>
			</Container>
		</div>
	);
};
export default TeamDet;
