import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Cookies from "universal-cookie";
import { Context } from "../../../App/components/ContextProvider";
import VerificationDataModel from "../../../App/models/VerificationDataModel";
import Button from "../../../GlobalComponents/Button";
import IconUser from "../../../GlobalComponents/icons/IconUser";
import Section from "../../../GlobalComponents/Section";
import FieldText from "../../../GlobalComponents/FieldText";
import Table from "../../../GlobalComponents/Table";
import TableItem from "../../../GlobalComponents/TableItem";
import { verifyDataInfo } from "../../../utils/verifyDataInfo";
import { CurrentUserModel } from "../models/CurrentUserModel";
import { editSingleUserService } from "../services/editSingleUserService";
import { Link } from "react-router-dom";

import IconTeam from "../../../GlobalComponents/icons/IconTeam";
import IconMore from "../../../GlobalComponents/icons/IconMore";
import { signOutService } from "../services/SignOutService";
import { getSingleUserService } from "../services/getSingleUserService";

const cookie = new Cookies();

const Profile = () => {
	const history = useHistory();
	const { uid } = useParams<{ uid: string }>();
	const { setLoading, currentUser, setAlert, setCurrentUser, setCurrentTeam } =
		useContext(Context);

	const [data, setData] = useState<CurrentUserModel>({
		uid: "",
		name: "",
		email: "",
		whatsapp: "",
		pictureURL: "",
		teams: [],
	});

	const verificationData: VerificationDataModel[] = [
		{
			condition: !data.uid,
			text: "No hay id de usuario. Actualiza la página.",
		},
		{
			condition: !data.name,
			text: "El nombre no puede estar vacío.",
		},
		{
			condition: !data.email,
			text: "Email no puede estar vacío.",
		},
		{
			condition: !data.whatsapp,
			text: "Especifica un número con whatsapp no puede estar vacío.",
		},
	];

	useEffect(() => {
		if (currentUser?.uid === uid) {
			setData(currentUser);
			return;
		}
		getSingleUserService(uid).then((response) => setData(response.currentUser));
	}, [uid, currentUser]);

	const saveUserData = () => {
		setLoading(true);
		const infoVerified = verifyDataInfo(
			verificationData,
			"Has actualizado la información de usuario."
		);
		if (!infoVerified.ok) {
			setAlert({ text: infoVerified.text, type: "error" });
			setLoading(false);
			return;
		}

		editSingleUserService(data).then((response) => {
			setAlert(response.alert);
			setLoading(false);
		});
	};

	const changePictureURL = () => {
		console.log("cambia foto");
	};

	const signOut = () => {
		setLoading(true);
		signOutService().then((response) => {
			cookie.remove("currentUser");
			cookie.remove("currentTeam");
			setCurrentUser(undefined);
			setCurrentTeam(undefined);
			setAlert(response.alert);
			setLoading(false);
			history.push("/ingreso");
		});
	};

	return (
		<>
			<Section name="Perfil">
				<div className="flex flex-col-reverse my-6 sm:flex-row">
					<div className="w-full px-6 pb-2 my-3s sm:w-1/2">
						<FieldText label="ID" value={data.uid} disabled={true} />
						<FieldText
							label="Nombre"
							value={data.name}
							handleFuntion={(e) => setData({ ...data, name: e.target.value })}
						/>
						<FieldText
							label="Correo"
							value={data.email}
							handleFuntion={(e) => setData({ ...data, email: e.target.value })}
						/>
						<FieldText
							label="Whatsapp"
							value={data.whatsapp}
							handleFuntion={(e) => {
								console.log(e.type);
								setData({ ...data, whatsapp: e.target.value });
							}}
						/>
						<Button name="Editar" handleFunction={saveUserData} />
						<div className="w-1/2 text-left">
							<Button
								name="Cerrar sesión"
								handleFunction={signOut}
								secondary={true}
							/>
							<Button
								name="Cambiar contraseña"
								handleFunction={() => history.push("/cambiar-contraseña")}
								secondary={true}
							/>
						</div>
					</div>
					<div className="flex flex-col justify-center w-full px-6 pb-2 my-3 sm:w-1/2 max-h-60">
						{data.pictureURL ? (
							<img src={data.pictureURL} alt="profile" />
						) : (
							<IconUser />
						)}
						<Button
							name="Editar foto"
							handleFunction={changePictureURL}
							secondary={true}
						/>
					</div>
				</div>
			</Section>

			<Section name="Equipos">
				<Table>
					{currentUser.teams ? (
						currentUser.teams.map((team) => {
							return (
								<TableItem key={team.teamId}>
									<div className="flex justify-between w-full h-10">
										<IconTeam />
										<span>{team.teamId}</span>
										<span>{team.role}</span>
										<Link to={`/equipo/${team.teamId}`} className="h-full">
											<IconMore />
										</Link>
									</div>
								</TableItem>
							);
						})
					) : (
						<tr className="flex items-center justify-center w-full ">
							<p>
								No tienes ningún equipo. <span>Crea tu primer equipo</span>
							</p>
						</tr>
					)}
				</Table>
			</Section>
		</>
	);
};

export default Profile;
