import { useState } from "react";
import { useHistory } from "react-router";
import Button from "../components/Button";
import InputField from "../components/InputField";
import {
	firebaseAuth,
	firebaseDate,
	firebaseDB,
} from "../models/firebase/firebase";

const Login = (props: any) => {
	const history = useHistory();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [whatsapp, setWhatsapp] = useState("");
	const [password, setPassword] = useState("");
	const [confirmation, setConfirmation] = useState("");
	const [problems, setProblems] = useState("");
	const [hasAccount, setHasAccount] = useState(true);

	const signIn = () => {
		setProblems("");
		if (!password) {
			setProblems("Contraseña inválida");
		} else if (!email) {
			setProblems("Correo inválido");
		}
		if (problems) {
			return;
		}
		firebaseAuth
			.signInWithEmailAndPassword(email, password)
			.then((r) => {
				history.push("/");
			})
			.catch((e) => console.error(e));
	};
	const signUp = () => {
		setProblems("");

		if (!name) {
			setProblems("Nombre inválido");
		} else if (!email) {
			setProblems("Correo inválido");
		} else if (!whatsapp) {
			setProblems("Número de Whatsapp inválido");
		} else if (!password) {
			setProblems("Contraseña inválida");
		} else if (password !== confirmation) {
			setProblems("Contraseñas no coinciden");
		}

		if (problems) {
			return;
		}
		firebaseAuth
			.createUserWithEmailAndPassword(email, password)
			.then((newUser: any) => {
				firebaseDB
					.collection("users")
					.doc(newUser.user.uid)
					.set({
						name,
						email,
						whatsapp,
						created: firebaseDate,
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
		<div className="flex items-center justify-center h-full">
			<div className="flex flex-col w-full max-w-md px-6 py-4 m-6 border-b border-l rounded-lg bg-primary text-secundary border-primary-light">
				<h1 className="my-3 text-4xl ">
					{hasAccount ? "Ingreso" : "Registro"}
				</h1>
				{!hasAccount && (
					<InputField
						label="Nombre"
						type="text"
						val={name}
						handleFuntion={setName}
					/>
				)}
				<InputField
					label="Correo"
					type="email"
					placeholder="nombre@ejemplo.com"
					val={email}
					handleFuntion={setEmail}
				/>
				{!hasAccount && (
					<InputField
						label="WhatsApp"
						type="number"
						val={whatsapp}
						placeholder="573000000000"
						handleFuntion={setWhatsapp}
					/>
				)}
				<InputField
					label="Contraseña"
					type="password"
					val={password}
					handleFuntion={setPassword}
				/>
				{!hasAccount && (
					<InputField
						label="Confirmación"
						type="password"
						val={confirmation}
						handleFuntion={setConfirmation}
					/>
				)}

				{/* Problems */}
				<p className="text-error">{problems}</p>
				{/* Buttons */}
				<div className="m-4">
					<Button
						name={hasAccount ? "Ingreso" : "Registro"}
						handleFunction={hasAccount ? signIn : signUp}
					/>
				</div>
				{/* opciones */}
				<div className="flex  justify-center w-full px-6 my-2">
					<p>
						{hasAccount ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
					</p>
					<span
						className="mx-2 text-realced cursor-pointer "
						onClick={() => setHasAccount(!hasAccount)}
					>
						{hasAccount ? "Registrate" : "Ingresa"}
					</span>
				</div>
			</div>
		</div>
	);
};
export default Login;
