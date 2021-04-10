import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { firebaseAuth, firebaseDB } from "./config/firebase/firebase";
import Navbar from "./components/Navbar";

import Home from "./views/Home";
import Error404 from "./views/Error404";
import Profile from "./views/Profile";
import Teams from "./views/Teams/Teams";
import TeamDet from "./views/Teams/TeamDet";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Loader from "./components/Loader";

function App() {
	const [loading, setLoading] = useState(true);
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
						const data = { ...result.data() };
						setCurrentUser(data);
						setLoading(false);
					});
			} else {
				setCurrentUser(null);
				setLoading(false);
			}
		});
	}, []);
	if (loading) {
		return <Loader />;
	} else {
		return (
			<BrowserRouter>
				<div className="h-screen overflow-x-hidden overflow-y-scroll text-secundary bg-primary-dark">
					<Navbar currentUser={currentUser} />
					<Switch>
						{/* Home */}
						<Route exact path="/">
							<Home currentUser={currentUser} />
						</Route>
						{/* SignIn */}
						<Route exact path="/ingresar">
							{!currentUser ? <SignIn /> : <Redirect to="/" />}
						</Route>
						{/* SignUp */}
						<Route exact path="/registrarse">
							{!currentUser ? <SignUp /> : <Redirect to="/" />}
						</Route>

						{/* Profile */}
						<Route exact path="/perfil/:id">
							{currentUser ? (
								<Profile currentUser={currentUser} />
							) : (
								<Redirect to="/ingreso" />
							)}
						</Route>
						{/* Equipos */}
						<Route exact path="/equipos">
							{currentUser ? (
								<Teams currentUser={currentUser} />
							) : (
								<Redirect to="/ingreso" />
							)}
						</Route>
						{/* Equipo Detail */}
						<Route exact path="/equipo/:id">
							{currentUser ? (
								<TeamDet currentUser={currentUser} />
							) : (
								<Redirect to="/ingreso" />
							)}
						</Route>
						{/* Error404 */}
						<Route component={Error404} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
