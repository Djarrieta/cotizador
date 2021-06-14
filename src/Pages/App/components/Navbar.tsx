import { useContext, useState } from "react";
import { Context } from "./ContextProvider";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/es6";

import IconLogo from "../../../GlobalComponents/icons/IconLogo";
import IconMenu from "../../../GlobalComponents/icons/IconMenu";
import IconUser from "../../../GlobalComponents/icons/IconUser";
import signOutService from "../../Users/services/SignOutService";

const cookie = new Cookies()
const Navbar = () => {
	const { currentUser ,setCurrentUser,setAlert} = useContext(Context);
	const [principalMenu, setPrincipalMenu] = useState(false);
	const [profileMenu, setProfileMenu] = useState(false);

	const signOut= () => {
		signOutService().then((response)=>{
			setAlert(response.alert)
			setCurrentUser(undefined)
			cookie.remove("currentUser")}
		)
	};

	return (
		<div className="border-b bg-primary border-primary-light">
			<nav className="container flex items-center justify-between h-16 px-2 py-1 m-auto ">
				{/* PrincipalMenu */}
				<div className="relative flex items-center h-full cursor-pointer">
					<div onClick={() => setPrincipalMenu(!principalMenu)} className="h-full">
						<IconMenu />
					</div>
					<Link to="/" className="h-full">
						<IconLogo/>
					</Link>
					{/* Principal Menu */}
					{principalMenu && (
						<div
							onClick={() => setPrincipalMenu(!principalMenu)}
							onMouseLeave={() => setPrincipalMenu(!principalMenu)}
							className="absolute top-0 left-0 w-64 pb-2 "
						>
							<div className="flex flex-col px-6 py-1 mt-16 border-b border-l rounded-lg border-primary-light bg-primary">
								<Link
									className="w-full px-2 py-1 my-1 text-center border-b rounded hover:bg-primary-light border-primary-light text-realced"
									to="/"
								>
									Home
								</Link>
								<Link
									className="w-full px-2 py-1 my-1 text-center rounded hover:bg-primary-light text-realced"
									to="/about"
								>
									About
								</Link>
							</div>
						</div>
					)}
				</div>
				{/* ProfileMenu */}
				<div className="relative h-full">
					<div className={`h-full ${currentUser && "text-realced"}`} onClick={() => setProfileMenu(!profileMenu)} >
						<IconUser/>
					</div>

					{/* Profile Menu */}
					{profileMenu && (
						<div
							onClick={() => setProfileMenu(!profileMenu)}
							onMouseLeave={() => setProfileMenu(!profileMenu)}
							className="absolute top-0 right-0 w-64 pb-2 "
						>
							<div className="flex flex-col px-6 py-1 mt-16 border-b border-l rounded-lg border-primary-light bg-primary">
								{currentUser && (
									<Link
										className="w-full px-2 py-1 my-1 overflow-hidden text-center border-b rounded hover:bg-primary-light border-primary-light text-realced"
										to={"/perfil/" + currentUser.uid}
									>
										{currentUser.name || "Perfil"}
									</Link>
								)}
								{currentUser && (
									<Link
										className="w-full px-2 py-1 my-1 overflow-hidden text-center border-b rounded hover:bg-primary-light border-primary-light text-realced"
										to={"/equipos/"}
									>
										{"Equipos"}
									</Link>
								)}
								{!currentUser && (
									<Link
										className="w-full px-2 py-1 my-1 overflow-hidden text-center rounded hover:bg-primary-light text-realced"
										to="/ingresar"
									>
										Ingresar
									</Link>
								)}
								{!currentUser && (
									<Link
										className="w-full px-2 py-1 my-1 overflow-hidden text-center rounded hover:bg-primary-light text-realced"
										to="/registrarse"
									>
										Registrarse
									</Link>
								)}
								{currentUser && (
									<button
										className="w-full px-2 py-1 my-1 text-center rounded hover:bg-primary-light text-realced"
										onClick={signOut}
									>
										Salir
									</button>
								)}
							</div>
						</div>
					)}
				</div>
			</nav>
		</div>
	);
};
export default Navbar;
