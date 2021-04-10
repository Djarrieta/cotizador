import Container from "../components/Container";
import Section from "../components/Section";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { firebaseAuth } from "../config/firebase/firebase";
import { Link, useHistory } from "react-router-dom";

const SignIn = () => {
	const { register, handleSubmit, errors } = useForm();
	const [problems, setProblems] = useState("");
	const history = useHistory();
	const onSubmit = (data: { email: string; password: string }) => {
		setProblems("");
		if (!data.password) {
			setProblems("Contraseña inválida");
		} else if (!data.email) {
			setProblems("Correo inválido");
		}
		if (problems) {
			return;
		}
		firebaseAuth
			.signInWithEmailAndPassword(data.email, data.password)
			.then((r) => {
				history.push("/");
			})
			.catch((e) => {
				switch (e.code) {
					case "auth/user-not-found":
						setProblems("El usuario ingresado no existe.");
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
				<Section name="Ingresar">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col mb-2">
							<label className="text-xs capitalize">Correo</label>
							<input
								name="email"
								placeholder="tucorreo@ejemplo.com"
								ref={register}
								className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
							/>
						</div>
						<div className="flex flex-col mb-2">
							<label className="text-xs capitalize">Contraseña</label>
							<input
								name="password"
								type="password"
								ref={register}
								className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
							/>
						</div>
						<span className="text-error">{problems}</span>
						<input
							type="submit"
							className="w-full py-2 border rounded-lg cursor-pointer focus:outline-none border-realced text-realced hover:bg-primary-light hover:text-secundary-light bg-primary"
						/>
						<div className="flex justify-center w-full px-6 my-2">
							<span>
								¿No tienes una cuenta?{" "}
								<Link to="/registrarse" className="text-realced">
									Registrarse
								</Link>
							</span>
						</div>
					</form>
				</Section>
			</div>
		</Container>
	);
};
export default SignIn;
