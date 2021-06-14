import Container from "../../../GlobalComponents/Container";
import Section from "../../App/components/Section";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
	firebaseAuth,
	firebaseDate,
	firebaseDB,
} from "../../../config/firebase";

const SignUp = () => {
	const { register, handleSubmit, errors } = useForm();
	const [problems, setProblems] = useState("");
	const history = useHistory();
	const onSubmit = (data: {
		name: string;
		email: string;
		whatsapp: number;
		password: string;
		confirmation: string;
	}) => {
		setProblems("");
		if (!data.name) {
			setProblems("Nombre inválido");
		} else if (!data.email) {
			setProblems("Correo inválido");
		} else if (!data.whatsapp) {
			setProblems("Número de Whatsapp inválido");
		} else if (!data.password) {
			setProblems("Contraseña inválida");
		} else if (data.password !== data.confirmation) {
			setProblems("Contraseñas no coinciden");
		}
		if (problems) {
			return;
		}
		firebaseAuth
			.createUserWithEmailAndPassword(data.email, data.password)
			.then((newUser: any) => {
				firebaseDB
					.collection("users")
					.doc(newUser.user.uid)
					.set({
						uid: newUser.user.uid,
						name: data.name,
						email: data.email,
						whatsapp: data.whatsapp,
						pictureURL:
							"https://firebasestorage.googleapis.com/v0/b/cotizador-2db51.appspot.com/o/assets%2FProfile.png?alt=media&token=74b7d3e1-4f26-4a16-b5ac-d8ac0a3a72ca",
						created: firebaseDate,
						updated: firebaseDate,
					})
					.then(() => {
						history.push("/");
					});
			})
			.catch((e) => {
				switch (e.code) {
					case "auth/weak-password":
						setProblems("Coloca una contraseña más dificil de adivinar.");
						break;
					case "auth/email-already-in-use":
						setProblems("El correo ingresado ya está en uso.");
						break;
					default:
						setProblems("Hubo un problema, intenta nuevamente.");
				}
				console.error(e);
			});
	};
	return (
		<Container>
			<div className="w-full max-w-md">
				<Section name="Registrarse">
					<form onSubmit={handleSubmit(onSubmit)}>
						{/* name */}
						<div className="flex flex-col mb-2">
							<label className="text-xs capitalize">Nombre</label>
							<input
								name="name"
								type="text"
								placeholder="Nombre"
								ref={register}
								className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
							/>
						</div>
						{/* Email */}
						<div className="flex flex-col mb-2">
							<label className="text-xs capitalize">Correo</label>
							<input
								name="email"
								placeholder="tucorreo@ejemplo.com"
								ref={register}
								className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
							/>
						</div>
						{/* whatsapp */}
						<div className="flex flex-col mb-2">
							<label className="text-xs capitalize">Whatsapp</label>
							<input
								name="whatsapp"
								type="number"
								placeholder="573001234567"
								ref={register}
								className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
							/>
						</div>
						{/* password */}
						<div className="flex flex-col">
							<label className="text-xs capitalize">Contraseña</label>
							<input
								name="password"
								type="password"
								ref={register}
								className="px-2 mb-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
							/>
						</div>
						{/* Confirmation */}
						<div className="flex flex-col">
							<label className="text-xs capitalize">Confirmación</label>
							<input
								name="confirmation"
								type="password"
								ref={register}
								className="px-2 mb-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
							/>
						</div>
						{/* problems */}
						<span className="text-error">{problems}</span>
						<input
							type="submit"
							className="w-full py-2 border rounded-lg cursor-pointer focus:outline-none border-realced text-realced hover:bg-primary-light hover:text-secundary-light bg-primary"
						/>
						<div className="flex justify-center w-full px-6 my-2">
							<span>
								¿Ya tienes una cuenta?{" "}
								<Link to="/ingresar" className="text-realced">
									Ingresa
								</Link>
							</span>
						</div>
					</form>
				</Section>
			</div>
		</Container>
	);
};
export default SignUp;
