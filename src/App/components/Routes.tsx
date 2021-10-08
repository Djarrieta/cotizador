import React, { createElement } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Error404 from "../../Pages/Error404/views/Error404";
import { useContext } from "react";
import Home from "../../Pages/Home/views/Home";
import TaskDetail from "../../Pages/Tasks/views/TaskDetail";
import Tasks from "../../Pages/Tasks/views/Tasks";
import NewMember from "../../Pages/TeamDetail/views/NewMember";
import TeamDetail from "../../Pages/TeamDetail/views/TeamDetail";
import Profile from "../../Pages/Users/views/Profile";
import SignIn from "../../Pages/Users/views/SignIn";
import SignUp from "../../Pages/Users/views/SignUp";
import UpdatePassword from "../../Pages/Users/views/UpdatePassword";
import { Context } from "../components/ContextProvider";

const Routes = () => {
	const { currentUser } = useContext(Context);
	const routes: {
		path: string;
		condition: boolean;
		redirect: string;
		component: () => JSX.Element;
	}[] = [
		{
			path: "/",
			condition: currentUser !== undefined,
			redirect: "/ingreso",
			component: Home,
		},
		{
			path: "/ingreso",
			condition: currentUser === undefined,
			redirect: "/",
			component: SignIn,
		},
		{
			path: "/registro",
			condition: currentUser === undefined,
			redirect: "/",
			component: SignUp,
		},
		{
			path: "/perfil/:uid",
			condition: currentUser !== undefined,
			redirect: "/ingreso",
			component: Profile,
		},

		{
			path: "/cambiar-contraseña",
			condition: currentUser !== undefined,
			redirect: "/ingreso",
			component: UpdatePassword,
		},
		{
			path: "/equipo/:teamId",
			condition: currentUser !== undefined,
			redirect: "/ingreso",
			component: TeamDetail,
		},
		{
			path: "/:teamId/nuevo-miembro",
			condition: currentUser !== undefined,
			redirect: "/ingreso",
			component: NewMember,
		},
		{
			path: "/:teamId/tareas",
			condition: currentUser !== undefined,
			redirect: "/ingreso",
			component: Tasks,
		},
		{
			path: "/:teamId/tarea/:taskId",
			condition: currentUser !== undefined,
			redirect: "/ingreso",
			component: TaskDetail,
		},
	];
	return (
		<Switch>
			{routes.map((route) => {
				return (
					<Route
						key={route.path}
						exact
						path={route.path}
						render={(routeProps) =>
							route.condition
								? 	createElement(route.component, routeProps)
								:<Redirect to={route.redirect} />
						}
					/>
				);
			})}
			<Route component={Error404} />
			{/* 			<Route exact path="/">
				{currentUser ? <Home /> : <Redirect to="/ingreso" />}
			</Route> */}

			{/* 			<Route exact path="/ingreso">
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


			<Route exact path="/equipo/:teamId">
				{currentUser ? <TeamDetail /> : <Redirect to="/ingreso" />}
			</Route>
			<Route exact path="/:teamId/nuevo-miembro">
				{currentUser ? <NewMember /> : <Redirect to="/ingreso" />}
			</Route>


			<Route exact path="/:teamId/tareas">
				{currentUser ? <Tasks /> : <Redirect to="/ingreso" />}
			</Route>
			<Route exact path="/:teamId/tarea/:taskId">
				{currentUser ? <TaskDetail /> : <Redirect to="/ingreso" />}
			</Route>
 */}
			{/* Error404 */}
		</Switch>
	);
};
export default Routes;
