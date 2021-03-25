import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import routes from "./models/routes/routes";
import { firebaseAuth, firebaseDB } from "./models/firebase/firebase";

import Navbar from "./components/Navbar";

function App(): any {
	const [loading, setLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState<any>(null);

	useEffect(() => {
		firebaseAuth.onAuthStateChanged((user: any) => {
			if (user) {
				const uid = user.uid;
				firebaseDB
					.collection("users")
					.doc(uid)
					.get()
					.then((result) => {
						const test = { ...result.data(), uid: result.id };
						setCurrentUser(test);
					});
			} else {
				setCurrentUser(null);
			}
			setLoading(false);
		});
	}, []);
	if (loading) {
		return <div>Cargando...</div>;
	} else {
		return (
			<BrowserRouter>
				<div className="h-screen overflow-x-hidden overflow-y-scroll text-secundary bg-primary-dark">
					<Navbar currentUser={currentUser} />
					<div style={{ height: "calc(100vh - 100px)" }}>
						<Switch>
							{routes.map((route, n) => {
								if (route.protected && currentUser) {
									return <Redirect key={n} to={route.redirect} />;
								} else {
									return (
										<Route
											key={n}
											path={route.path}
											exact={true}
											component={route.component}
										/>
									);
								}
							})}
						</Switch>
					</div>
					<span className="flex w-full justify-center">Dja.Red</span>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
