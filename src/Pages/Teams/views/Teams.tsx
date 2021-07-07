import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Container from "../../../GlobalComponents/Container";
import { firebaseDB } from "../../../config/firebase";
import IMember from "../models/MemberInterface";
import ITeam from "../models/TeamInterface";
import Section from "../../../GlobalComponents/Section";

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
					{teams.map((team: ITeam, n: number) => {
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
										xmlns="http://www.w3.org/2000/svg"
										className={
											currentUser.defaultTeam &&
											currentUser.defaultTeam === team.teamId
												? "w-8 h-8 mx-2 cursor-pointer text-realced"
												: "w-8 h-8 mx-2 cursor-pointer "
										}
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
									<svg
										onClick={() => {
											history.push("/equipo/" + team.teamId);
										}}
										xmlns="http://www.w3.org/2000/svg"
										className="w-8 h-8 mx-2 cursor-pointer text-realced"
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
