import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../../GlobalComponents/ContextProvider";
import VerificationDataModel from "../../App/models/VerificationDataModel";
import Button from "../../../GlobalComponents/Button";
import FieldText from "../../../GlobalComponents/FieldText";
import Section from "../../../GlobalComponents/Section";
import { verifyDataInfo } from "../../../utils/verifyDataInfo";
import { signInService } from "../services/SignInService";

const SignIn = () => {
	const [data, setData] = useState<{
		email: string;
		password: string;
	}>({
		email: "arrieta.dario@hotmail.com",
		password: "dariojose",
	});

	const { setAlert, setLoading, setCurrentUser } = useContext(Context);
	const history = useHistory();
	const verificationData: VerificationDataModel[] = [
		{
			condition: !data.email,
			text: "Email no puede estar vacío.",
		},
		{
			condition: !data.password,
			text: "Contraseña no puede estar vacía.",
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
		signInService(data.email, data.password).then((response) => {
			setAlert(response.alert);
			if (response.alert.type === "success") {
				if (response.currentUser) {
					setCurrentUser(response.currentUser);
				}
				history.push("/");
			}
			setLoading(false);
		});
	};

	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="max-w-xs ">
				<Section name="Ingresar">
					<div className="flex flex-col max-w-md px-3 py-4 my-2 border rounded-lg">
						<FieldText
							label="Correo"
							value={data.email}
							onChange={(e) => setData({ ...data, email: e.target.value })}
						/>
						<FieldText
							label="Contraseña"
							value={data.password}
							type="password"
							onChange={(e) => setData({ ...data, password: e.target.value })}
						/>
						<Button name="Ingresar" handleFunction={() => handleClick()} />
						<Button
							name="Registrarme"
							handleFunction={() => history.push("/registro")}
							secondary={true}
						/>
						<Button
							name="Recuperar mi contraseña"
							handleFunction={() => history.push("/recuperar-contrasena")}
							secondary={true}
						/>
					</div>
				</Section>
			</div>
		</div>
	);
};
export default SignIn;
