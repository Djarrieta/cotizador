import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { Context } from "../../../App/components/ContextProvider";
import VerificationDataModel from "../../../App/models/VerificationDataModel";
import Button from "../../../GlobalComponents/Button";
import Section from "../../../GlobalComponents/Section";
import FieldText from "../../../GlobalComponents/FieldText";
import { verifyDataInfo } from "../../../utils/verifyDataInfo";
import { signUpService } from "../services/signUpService";

const cookie = new Cookies();

const SignUp = () => {
	const [data, setData] = useState<{
		name: string;
		email: string;
		whatsapp: string;
		password: string;
		confirmation: string;
	}>({
		name: "",
		email: "",
		whatsapp: "",
		password: "",
		confirmation: "",
	});

	const { setAlert, setLoading, setCurrentUser,setCurrentTeam } = useContext(Context);
	const history = useHistory();
	const verificationData: VerificationDataModel[] = [
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
		{
			condition: !data.password,
			text: "Contraseña no puede estar vacía.",
		},
		{
			condition: data.password !== data.confirmation,
			text: "Las contraseñas no coinciden.",
		},
	];

	const handleClick = (): void => {
		setLoading(true);

		const infoVerified = verifyDataInfo(
			verificationData,
			"Has ingresado satisfactoriamente."
		);

		if (!infoVerified.ok) {
			setAlert({ text: infoVerified.text, type: "error" });
			setLoading(false);
			return;
		}
		signUpService(data).then((response) => {
			setAlert(response.alert);
			if (response.data.currentUser) {
				setCurrentUser(response.data.currentUser);
				cookie.set("currentUser", response.data.currentUser);
			}

			if (response.data.currentTeam) {
				setCurrentTeam(response.data.currentTeam);
				cookie.set("currentTeam", response.data.currentTeam);
			}
			history.push("/");
			setLoading(false);
		});
	};

	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="max-w-xs">
				<Section name="Ingresar">
					<div className="flex flex-col max-w-md px-3 py-4 my-2 border rounded-lg">
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
							label="WhatsApp"
							placeholder="573001234567"
							value={data.whatsapp}
							handleFuntion={(e) =>
								setData({ ...data, whatsapp: e.target.value })
							}
						/>
						<FieldText
							label="Contraseña"
							value={data.password}
							type="password"
							handleFuntion={(e) =>
								setData({ ...data, password: e.target.value })
							}
						/>
						<FieldText
							label="Confirmación"
							value={data.confirmation}
							type="password"
							handleFuntion={(e) =>
								setData({ ...data, confirmation: e.target.value })
							}
						/>
						<Button name="Ingresar" handleFunction={() => handleClick()} />
						<Button
							name="Ingresar"
							handleFunction={() => history.push("/ingreso")}
							secondary={true}
						/>
					</div>
				</Section>
			</div>
		</div>
	);
};
export default SignUp;
