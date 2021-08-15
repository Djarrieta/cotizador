import { useContext, useState } from "react";
import { Context } from "../../../App/components/ContextProvider";
import Button from "../../../GlobalComponents/Button";
import Section from "../../../GlobalComponents/Section";
import TextField from "../../../GlobalComponents/TextField";
import { updatePasswordService } from "../services/updatePasswordService";

const UpdatePassword = () => {
	const { setLoading, setAlert } = useContext(Context);

	const [data, setData] = useState({
		newPasswod: "",
		confirmation: "",
	});
	const handleClick = async () => {
		setLoading(true);
		const response = await updatePasswordService(data.newPasswod);
		setAlert(response.alert);
		setLoading(false);
	};

	return (
		<div className="w-full max-w-md py-2 m-auto ">
			<Section name="Perfil">
				<div className="flex flex-col w-full px-6 pb-2 my-3">
					<TextField
						label="Nueva contraseña"
						value={data.newPasswod}
						type="password"
						handleFuntion={(e) =>
							setData({ ...data, newPasswod: e.target.value })
						}
					/>
					<TextField
						label="Confirmación"
						value={data.confirmation}
						type="password"
						handleFuntion={(e) =>
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
