import React, { useContext } from "react";
import Container from "../../../GlobalComponents/Container";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import signUpService from "../services/SignUpService";
import Cookies from "universal-cookie";
import { Context } from "../../../App/components/ContextProvider";
import Section from "../../../GlobalComponents/Section";

const SignUp = () => {
	const { register, handleSubmit, errors } = useForm();
	const history = useHistory();
	const { setAlert, setLoading, setCurrentUser } = useContext(Context);

	const cookie = new Cookies();

	const onSubmit = (data: {
		name: string;
		email: string;
		whatsapp: number;
		password: string;
		confirmation: string;
	}) => {
		setLoading(true);
		if (!data.name) {
			setAlert({ text: "El nombre no puede estar vacío.", type: "error" });
			setLoading(false);
		} else if (!data.email) {
			setAlert({ text: "El email no puede estar vacío.", type: "error" });
			setLoading(false);
		} else if (!data.whatsapp) {
			setAlert({ text: "Número de whatsapp inválido.", type: "error" });
			setLoading(false);
		} else if (!data.password) {
			setAlert({ text: "Contraseña no puede estar vacía.", type: "error" });
			setLoading(false);
		} else if (data.password !== data.confirmation) {
			setAlert({ text: "Contraseñas no coinciden.", type: "error" });
			setLoading(false);
		} else {
			signUpService(data)
			.then((response) => {
				setAlert(response.alert);
				if (response.data) {
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
		<Container>
			<div className="w-full max-w-md">
				<Section name="Registrarse">
					<form onSubmit={handleSubmit(onSubmit)}>
						{/* name */}
						<div className="flex flex-col mb-2">
							<label className="text-xs capitalize">Nombre</label>
							<input
								name="name"
								defaultValue="darío Arrieta"
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
								defaultValue="arrieta.dario@hotmail.com"
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
								defaultValue="573008718217"
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
								defaultValue="arrieta.dario@hotmail.com"
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
								defaultValue="arrieta.dario@hotmail.com"
								ref={register}
								className="px-2 mb-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
							/>
						</div>
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
