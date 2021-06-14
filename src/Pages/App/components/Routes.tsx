import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from "../../Home/views/Home";
import Error404 from "../../Error404/views/Error404";
import Profile from "../../Users/views/Profile";
import Teams from "../../Teams/views/Teams";
import TeamDet from "../../Teams/views/TeamDet";
import SignIn from "../../Users/views/SignIn";
import SignUp from "../../Users/views/SignUp";
import { Context } from "./ContextProvider";
const Routes = () => {
	const { currentUser } = useContext(Context);
	const routes = [
		{ component: () => Home, path: "/",condition:true,redirect:"/" },
		{ component: () => SignIn, path: "/ingresar", condition: !currentUser, redirect:"/"},
	];

	return (
		<Switch>
			{routes.map((route) => {
				const component = route.component;
				return <Route path={route.path}>{route.condition ? component: <Redirect to={route.redirect} />}</Route>;
			})}

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
