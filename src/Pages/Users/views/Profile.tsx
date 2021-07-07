import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "../../../GlobalComponents/Button";
import Container from "../../../GlobalComponents/Container";
import { firebaseDate, firebaseDB } from "../../../config/firebase";
import Section from "../../../GlobalComponents/Section";

const Profile = (props: any) => {
	const { id } = useParams<{ id: string }>();
	const [loading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<{
		uid: string;
		name: string;
		email: string;
		whatsapp: any;
		pictureURL: string;
	}>({
		uid: "",
		name: "",
		email: "",
		whatsapp: "",
		pictureURL: "",
	});
	const saveUserData = () => {
		firebaseDB
			.collection("users")
			.doc(id)
			.update({ ...data, uptated: firebaseDate })
			.then(() => {
				console.log("save in firestore");
			})
			.catch((e) => console.error(e));
	};
	const changePictureURL = () => {
		console.log("cambia foto");
	};
	useEffect(() => {
		setLoading(true);
		firebaseDB
			.collection("users")
			.doc(id)
			.get()
			.then((user: any) => {
				if (user.exists) {
					setData(user.data());
				}
				setLoading(false);
			})
			.catch((e) => {
				setLoading(false);
				console.error(e);
			});
	}, []);

	return (
		<Container>
			<Section name="Perfil">
				<div className="flex flex-col-reverse sm:flex-row">
					<div className="w-full px-6 pb-2 my-3 sm:w-1/2">
						{/* UID */}
						<div className="flex flex-col mb-2">
							<label className="text-xs capitalize">ID</label>
							<input
								className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
								disabled
								value={data.uid}
							/>
						</div>
						{/* name */}
						<div className="flex flex-col mb-2">
							<label className="text-xs capitalize">Nombre</label>
							<input
								className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
								value={data.name}
								onChange={(e) => setData({ ...data, name: e.target.value })}
							/>
						</div>
						{/* email */}
						<div className="flex flex-col mb-2">
							<label className="text-xs capitalize">Correo</label>
							<input
								className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
								value={data.email}
								onChange={(e) => setData({ ...data, email: e.target.value })}
							/>
						</div>
						{/* whatsapp */}
						<div className="flex flex-col mb-2">
							<label className="text-xs capitalize">WhatsApp</label>
							<input
								className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
								type="number"
								value={data.whatsapp}
								onChange={(e) =>
									setData({ ...data, whatsapp: parseInt(e.target.value) })
								}
							/>
						</div>
						<Button name="Guardar" handleFunction={saveUserData} />
					</div>
					<div className="w-full px-6 pb-2 my-3 sm:w-1/2">
						<img src={data.pictureURL} alt="profile" />
						{/* <Button name="✏️" handleFunction={changePictureURL} /> */}
					</div>
				</div>
			</Section>
			<Section name="Opciones">
				<div className="flex justify-around w-full my-4">
					<Link to="/equipos" className="text-realced">
						Ir a Equipos
					</Link>

					<Link to="/" className="text-realced">
						Inicio
					</Link>
				</div>
			</Section>
			<Section name="Actividad"></Section>
		</Container>
	);
};

export default Profile;
