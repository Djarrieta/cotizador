import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Error404 from "../../Pages/Error404/views/Error404";
import Home from "../../Pages/Home/views/Home";
import Profile from "../../Pages/Users/views/Profile";
import SignIn from "../../Pages/Users/views/SignIn";
import SignUp from "../../Pages/Users/views/SignUp";
import UpdatePassword from "../../Pages/Users/views/UpdatePassword";
import { Context } from "./ContextProvider";


const Routes = () => {
	const { currentUser } = useContext(Context);
	return (
		<Switch>
			{/* Home */}
			<Route exact path="/">
				{currentUser ? <Home /> : <Redirect to="/ingreso" />}
			</Route>
			{/* SignIn */}
			<Route exact path="/ingreso">
				{!currentUser ? <SignIn /> : <Redirect to="/" />}
			</Route>
			{/* SignUp */}
			<Route exact path="/registro">
				{!currentUser ? <SignUp /> : <Redirect to="/" />}
			</Route>
			{/* Profile */}
			<Route exact path="/perfil/:id">
				{currentUser ? <Profile /> : <Redirect to="/ingreso" />}
			</Route>


			<Route exact path="/cambiar-contraseña">
				{currentUser ? <UpdatePassword /> : <Redirect to="/ingreso" />}
			</Route>




			{/* Error404 */}
			<Route component={Error404} />
		</Switch>
	);
};
export default Routes;
