import { useContext } from "react";
import { Context } from "./ContextProvider";

const Navbar = () => {
	const { alert } = useContext(Context);

	return <div className={`${alert && "px-4 py-2 absolute  rounded-md bottom-0 right-0 flex mx-12 my-5 border-b bg-primary border-primary-light "}${alert?.type==="success" && " bg-success"} ${alert?.type==="error" && " bg-error"} `}>
		{alert?.text}
	</div>;
};
export default Navbar;
