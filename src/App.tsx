import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import routes from "./config/routes";
import { userRestrictions } from "./interfaces/userRestrictions";

import { firebaseAuth } from "./config/firebase";

function App(): any {
	const [loading, setLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		firebaseAuth.onAuthStateChanged((user) => {
			if (user) {
				setCurrentUser(user);
			} else {
				setCurrentUser({});
			}
			setLoading(false);
		});
	}, []);
	if (loading) {
		return <div>Cargando...</div>;
	} else {
		return (
			<BrowserRouter>
				<Switch>
					{routes.map((route, n) => {
						return (
							<Route key={n} path={route.path} exact={route.exact}>
								{route.restrictions !== userRestrictions.everyone && true ? (
									<Redirect to="/ingreso" />
								) : (
									route.component
								)}
							</Route>
						);
					})}
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
