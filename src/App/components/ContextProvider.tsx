import React, { createContext, ReactElement, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { CurrentUserModel } from "../../Pages/Users/models/CurrentUserModel";
import { AlertModel } from "../models/AlertModel";

export const Context = createContext<{
	currentUser: CurrentUserModel | undefined;
	setCurrentUser: (user: CurrentUserModel | undefined) => void;

	loading: boolean;
	setLoading: (value: boolean) => void;
	alert: AlertModel | undefined;
	setAlert: (value: AlertModel) => void;
}>({
	currentUser: undefined,
	setCurrentUser: (user: CurrentUserModel | undefined) => {},
	loading: true,
	setLoading: (value: boolean) => {},
	alert: undefined,
	setAlert: (value: AlertModel) => {},
});

const ContextProvider = ({ children }: { children: ReactElement }) => {
	const [currentUser, setCurrentUser] = useState<CurrentUserModel | undefined>(
		undefined
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [alert, setAlert] = useState<AlertModel | undefined>(undefined);
	const [firstRun, setFirstRun] = useState<boolean>(true);

	useEffect(() => {
		const cookies = new Cookies();
		if (firstRun) {
			const user: CurrentUserModel = cookies.get("currentUser");
			user ? setCurrentUser(user) : setCurrentUser(undefined);
			setFirstRun(false);
		} else {
			currentUser
				? cookies.set("currentUser", currentUser)
				: cookies.set("currentUser", undefined);
		}
		setLoading(false);
	}, [currentUser, firstRun]);

	useEffect(() => {
		alert && setTimeout(() => setAlert(undefined), 2000);
	}, [alert]);

	return (
		<Context.Provider
			value={{
				currentUser,
				setCurrentUser,
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
