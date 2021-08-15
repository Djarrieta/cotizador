import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Context } from "../../../App/components/ContextProvider";
import Button from "../../../GlobalComponents/Button";
import IconUser from "../../../GlobalComponents/icons/IconUser";
import IconPicture from "../../../GlobalComponents/icons/IconPicture";
import Section from "../../../GlobalComponents/Section";
import TextField from "../../../GlobalComponents/TextField";
import { CurrentUserModel } from "../models/CurrentUserModel";
import { editSingleUserService } from "../services/editSingleUserService";
import { getSingleUserService } from "../services/getSingleUserService";
import { signOutService } from "../services/signOutService";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const cookie = new Cookies();

const Profile = () => {
	const history = useHistory();
	const { id } = useParams<{ id: string }>();
	const { setLoading, currentUser, setAlert, setCurrentUser } =
		useContext(Context);

	const [data, setData] = useState<CurrentUserModel>({
		uid: "",
		name: "",
		email: "",
		whatsapp: "",
		pictureURL: "",
	});
	useEffect(() => {
		if (id === currentUser.uid) {
			setData(currentUser);
			return;
		}
		getSingleUserService(id).then((response) => setData(response));
	}, [id, currentUser]);

	const saveUserData = async () => {
		setLoading(true);
		const response = await editSingleUserService(data);
		setAlert(response.alert);
		setLoading(false);
	};
	const changePictureURL = () => {
		console.log("cambia foto");
	};
	const signOut = async () => {
		setLoading(true);
		const response = await signOutService();
		cookie.remove("currentUser");
		setCurrentUser(undefined);
		setAlert(response.alert);
		setLoading(false);
		history.push("/ingreso");
	};

	return (
		<>
			<Section name="Perfil">
				<div className="flex flex-col-reverse my-6 sm:flex-row">
					<div className="w-full px-6 pb-2 my-3s sm:w-1/2">
						<TextField label="ID" value={data.uid} disabled={true} />
						<TextField
							label="Nombre"
							value={data.name}
							handleFuntion={(e) => setData({ ...data, name: e.target.value })}
						/>
						<TextField
							label="Correo"
							value={data.email}
							handleFuntion={(e) => setData({ ...data, email: e.target.value })}
						/>
						<TextField
							label="Whatsapp"
							value={data.whatsapp}
							handleFuntion={(e) =>
								setData({ ...data, whatsapp: e.target.value })
							}
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
				<table className="w-full p-4 mt-4">
					<tbody>
						<tr>
							<Link to="/hola">
								<td className="flex items-center justify-between w-full h-10 my-1 border-b border-text_light">
									<IconPicture />
									<span>EquipoId</span>
									<span>Role</span>
								</td>
							</Link>
						</tr>
					</tbody>
				</table>
			</Section>
		</>
	);
};

export default Profile;
