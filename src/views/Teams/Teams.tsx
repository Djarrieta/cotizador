import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Section from "../../components/Section";
import { firebaseDB } from "../../config/firebase/firebase";
import IMember from "../../config/interfase/IMember";
import ITeam from "../../config/interfase/ITeam";

const Teams = (props: any) => {
	const history = useHistory();
	const { currentUser } = props;
	const [teams, setTeams] = useState<Array<object>>([]);
	const addTeam = () => {
		history.push("/equipo/0");
	};
	useEffect(() => {
		firebaseDB
			.collection("teams")
			.get()
			.then((results) => {
				const myTeams: ITeam[] = [];

				results.forEach((r: any) => {
					const team: ITeam = r.data();
					team.members.forEach((member: IMember) => {
						if (member.email === currentUser.email) {
							myTeams.push(team);
							return;
						}
					});
				});
				setTeams(myTeams);
			});
	}, []);
	return (
		<Container>
			<Section name="TUS EQUIPOS" button={true} handleFunction={addTeam}>
				<div className="prueba">
					{teams.map((team: any, n: number) => {
						return (
							<div
								className="flex items-center justify-between w-full py-2 mx-2 border-b hover:bg-primary-light border-primary-light"
								key={n}
							>
								<img className="h-6" src={team.pictureURL} alt="Team" />
								<span>{team.teamId}</span>
								<span>Miembros: {team.members.length} </span>
								<div className="flex">
									<svg
										onClick={() => {
											history.push("/equipo/" + team.teamId);
										}}
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6 mx-2 cursor-pointer text-realced"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</div>
							</div>
						);
					})}
				</div>
			</Section>
			<Section name="Opciones">
				<div className="flex justify-around w-full my-4">
					<Link to={"/perfil/" + currentUser.uid} className="text-realced">
						Ir a Perfil
					</Link>

					<Link to="/" className="text-realced">
						Inicio
					</Link>
				</div>
			</Section>
		</Container>
	);
};
export default Teams;
