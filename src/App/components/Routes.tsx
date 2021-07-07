import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Error404 from "../../Pages/Error404/views/Error404";
import Home from "../../Pages/Home/views/Home";
import TeamDet from "../../Pages/Teams/views/TeamDet";
import Teams from "../../Pages/Teams/views/Teams";
import Profile from "../../Pages/Users/views/Profile";
import SignIn from "../../Pages/Users/views/SignIn";
import SignUp from "../../Pages/Users/views/SignUp";
import { Context } from "./ContextProvider";


const Routes = () => {
	const { currentUser } = useContext(Context);
	return (
		<Switch>
			{/* Home */}
			<Route exact path="/">
				<Home />
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
				{currentUser ? <Profile /> : <Redirect to="/ingresar" />}
			</Route>
			{/* Equipos */}
			<Route exact path="/equipos">
				{currentUser ? <Teams /> : <Redirect to="/ingresar" />}
			</Route>
			{/* Equipo Detail */}
			<Route exact path="/equipo/:id">
				{currentUser ? <TeamDet /> : <Redirect to="/ingresar" />}
			</Route>
			{/* Error404 */}
			<Route component={Error404} />
		</Switch>
	);
};
export default Routes;
