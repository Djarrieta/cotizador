import { useContext, useState } from "react";
import { Context } from "../../../App/components/ContextProvider";
import Button from "../../../GlobalComponents/Button";
import Section from "../../../GlobalComponents/Section";
import FieldText from "../../../GlobalComponents/FieldText";
import { updatePasswordService } from "../services/UpdatePasswordService";
import VerificationDataModel from "../../../App/models/VerificationDataModel";
import { verifyDataInfo } from "../../../utils/verifyDataInfo";

const UpdatePassword = () => {
	const { setLoading, setAlert } = useContext(Context);

	const [data, setData] = useState({
		newPasswod: "",
		confirmation: "",
	});
	const verificationData: VerificationDataModel[] = [
		{
			condition: !data.newPasswod,
			text: "La nueva contraseña no puede estar vacía.",
		},
		{
			condition: data.newPasswod !== data.confirmation,
			text: "Las contraseñas no coinciden",
		},
	];

	const handleClick = () => {
		setLoading(true);
		const infoVerified = verifyDataInfo(
			verificationData,
			"Has actualizado tu contraseña."
		);
		if (!infoVerified.ok) {
			setAlert({ text: infoVerified.text, type: "error" });
			setLoading(false);
			return;
		}

		updatePasswordService(data.newPasswod).then((response) => {
			setAlert(response.alert);
			setLoading(false);
		});
	};

	return (
		<div className="w-full max-w-md py-2 m-auto ">
			<Section name="Perfil">
				<div className="flex flex-col w-full px-6 pb-2 my-3">
					<FieldText
						label="Nueva contraseña"
						value={data.newPasswod}
						type="password"
						onChange={(e) =>
							setData({ ...data, newPasswod: e.target.value })
						}
					/>
					<FieldText
						label="Confirmación"
						value={data.confirmation}
						type="password"
						onChange={(e) =>
							setData({ ...data, confirmation: e.target.value })
						}
					/>
					<Button name="Cambiar contraseña" handleFunction={handleClick} />
				</div>
			</Section>
		</div>
	);
};

export default UpdatePassword;
