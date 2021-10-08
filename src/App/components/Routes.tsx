import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Error404 from "../../Pages/Error404/views/Error404";
import Home from "../../Pages/Home/views/Home";
import TaskDetail from "../../Pages/Tasks/views/TaskDetail";
import Tasks from "../../Pages/Tasks/views/Tasks";
import NewMember from "../../Pages/TeamDetail/views/NewMember";
import TeamDetail from "../../Pages/TeamDetail/views/TeamDetail";
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

			{/* User */}
			<Route exact path="/ingreso">
				{!currentUser ? <SignIn /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/registro">
				{!currentUser ? <SignUp /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/perfil/:uid">
				{currentUser ? <Profile /> : <Redirect to="/ingreso" />}
			</Route>
			<Route exact path="/cambiar-contraseña">
				{currentUser ? <UpdatePassword /> : <Redirect to="/ingreso" />}
			</Route>

			{/* Team */}
			<Route exact path="/equipo/:teamId">
				{currentUser ? <TeamDetail /> : <Redirect to="/ingreso" />}
			</Route>
			<Route exact path="/:teamId/nuevo-miembro">
				{currentUser ? <NewMember /> : <Redirect to="/ingreso" />}
			</Route>

			{/* Tasks */}
			<Route exact path="/:teamId/tareas">
				{currentUser ? <Tasks /> : <Redirect to="/ingreso" />}
			</Route>
			<Route exact path="/:teamId/tarea/:taskId">
				{currentUser ? <TaskDetail /> : <Redirect to="/ingreso" />}
			</Route>

			{/* Error404 */}
			<Route component={Error404} />
		</Switch>
	);
};
export default Routes;
