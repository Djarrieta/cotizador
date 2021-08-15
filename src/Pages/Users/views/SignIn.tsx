import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";

import { Link, useHistory } from "react-router-dom";
import { signInService } from "../services/signInService"
import { Context } from "../../../App/components/ContextProvider";
import Section from "../../../GlobalComponents/Section";

const cookie = new Cookies();

const SignIn = () => {
	const { register, handleSubmit, errors } = useForm();
	const { setAlert, setLoading, setCurrentUser } = useContext(Context);
	const history = useHistory();

	const onSubmit = (data: { email: string; password: string }) => {
		setLoading(true);
		if (!data.email) {
			setAlert({ text: "Email no puede estar vacío.", type: "error" });
			setLoading(false);
		} else if (!data.password) {
			setAlert({ text: "Contraseña no puede estar vacía.", type: "error" });
			setLoading(false);
		} else {
			signInService(data.email, data.password)
				.then((response) => {
					setAlert(response.alert);
					if (response.alert.type === "success") {
						setCurrentUser(response.data);
						cookie.set("currentUser", response.data);
						history.push("/");
					}
					setLoading(false);
				})
				.catch(() => setLoading(false));
		}
	};

	return (
		<div className="w-full max-w-md py-2 m-auto overflow-hidden rounded-xl">
			<Section name="Ingresar">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col mb-2">
						<label className="text-xs capitalize">Correo</label>
						<input
							name="email"
							placeholder="tucorreo@ejemplo.com"
							defaultValue="arrieta.dario@hotmail.com"
							ref={register}
							className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
						/>
					</div>
					<div className="flex flex-col mb-2">
						<label className="text-xs capitalize">Contraseña</label>
						<input
							name="password"
							type="password"
							defaultValue="arrieta.dario@hotmail.com"
							ref={register}
							className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
						/>
					</div>
					<input
						type="submit"
						value="Ingresar"
						className="w-full py-2 border rounded-lg cursor-pointer focus:outline-none border-realced text-realced hover:bg-primary-light hover:text-secundary-light bg-primary"
					/>
					<div className="flex flex-col items-center justify-center w-full px-6 my-2">
						<span>
							¿No tienes una cuenta?{" "}
							<Link to="/registrarse" className="text-realced">
								Registrarse
							</Link>
						</span>
						<span className="cursor-pointer text-realced">
							Olvidé mi contraseña
						</span>
					</div>
				</form>
			</Section>
		</div>
	);
};
export default SignIn;
