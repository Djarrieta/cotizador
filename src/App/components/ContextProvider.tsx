import React, { createContext, ReactElement, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { CurrentUserModel } from "../../Pages/Users/models/CurrentUserModel";
import { CurrentTeamModel } from "../../Pages/Teams/models/CurrentTeamModel";
import { AlertModel } from "../models/AlertModel";

export const Context = createContext<{
	currentUser: CurrentUserModel | undefined;
	setCurrentUser: (user: CurrentUserModel | undefined) => void;
	currentTeam: CurrentTeamModel | undefined;
	setCurrentTeam: (user: CurrentTeamModel | undefined) => void;
	loading: boolean;
	setLoading: (value: boolean) => void;
	alert: AlertModel | undefined;
	setAlert: (value: AlertModel) => void;
}>({
	currentUser: undefined,
	setCurrentUser: (user: CurrentUserModel | undefined) => {},
	currentTeam: undefined,
	setCurrentTeam: (user: CurrentTeamModel | undefined) => {},
	loading: true,
	setLoading: (value: boolean) => {},
	alert: undefined,
	setAlert: (value: AlertModel) => {},
});

const ContextProvider = ({ children }: { children: ReactElement }) => {
	const [currentUser, setCurrentUser] = useState<CurrentUserModel | undefined>(
		undefined
	);
	const [currentTeam, setCurrentTeam] = useState<CurrentTeamModel | undefined>(
		undefined
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [alert, setAlert] = useState<AlertModel | undefined>(undefined);

	useEffect(() => {
		const cookies = new Cookies();
		const user: CurrentUserModel = cookies.get("currentUser");
		const team: CurrentTeamModel = cookies.get("currentTeam");

		user ? setCurrentUser(user) : setCurrentUser(undefined);
		team ? setCurrentTeam(team) : setCurrentTeam(undefined);

		setLoading(false);
	}, []);

	useEffect(() => {
		alert && setTimeout(() => setAlert(undefined), 2000);
	}, [alert]);

	return (
		<Context.Provider
			value={{
				currentUser,
				setCurrentUser,
				currentTeam,
				setCurrentTeam,
				loading,
				setLoading,
				alert,
				setAlert,
			}}
		>
			{children}
		</Context.Provider>
	);
};
export default ContextProvider;
