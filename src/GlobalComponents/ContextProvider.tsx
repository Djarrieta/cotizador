import React, { createContext, ReactElement, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { AlertModel } from "../Pages/App/models/AlertModel";
import { CurrentUserModel } from "../Pages/Users/models/CurrentUserModel";

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
		const cookiesUser = cookies.get("currentUser");

		if (firstRun && cookiesUser) {
			setCurrentUser(cookiesUser);
		}
		setFirstRun(false);

		if (!firstRun && currentUser) {
			cookies.set("currentUser", currentUser, {path: '/'});
		}

		if (!firstRun && !currentUser) {
			cookies.remove("currentUser", {path: '/'});
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
