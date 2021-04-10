import { useState } from "react";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../config/firebase/firebase";

const Navbar = (props: any) => {
	const { currentUser } = props;
	const [principalMenu, setPrincipalMenu] = useState(false);
	const [profileMenu, setProfileMenu] = useState(false);

	const signOut = () => {
		firebaseAuth
			.signOut()
			.then(() => {})
			.catch((e) => console.error(e));
	};

	return (
		<div className="border-b bg-primary border-primary-light">
			<nav className="container flex items-center justify-between h-16 px-2 m-auto ">
				{/* PrincipalMenu */}
				<div className="relative flex items-center cursor-pointer">
					<svg
						onClick={() => setPrincipalMenu(!principalMenu)}
						className="w-12 h-12"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clipRule="evenodd"
						/>
					</svg>
					<Link to="/">
						<svg
							className="w-10 h-10 text-realced"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
							/>
						</svg>
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
				<div className="relative">
					<svg
						onClick={() => setProfileMenu(!profileMenu)}
						className={`w-12 h-12 ${currentUser && "text-realced"}`}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
							clipRule="evenodd"
						/>
					</svg>
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
