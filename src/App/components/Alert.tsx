import { useContext } from "react";
import { Context } from "./ContextProvider";

export const Alert = () => {
	const { alert } = useContext(Context);

	return (
		<div
			className={`${
				alert &&
				"px-4 py-2 absolute  rounded-md bottom-0 left-0 flex mx-12 my-5 border-b bg-primary border-primary-light "
			}${alert?.type === "success" && " bg-success"} ${
				alert?.type === "error" && " bg-error"
			} `}
		>
			{alert?.text}
		</div>
	);
};
