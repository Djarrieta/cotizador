import { useContext } from "react";
import Home from "../../Pages/Home/views/Home";
import TaskDetail from "../../Pages/Tasks/views/TaskDetail";
import Tasks from "../../Pages/Tasks/views/Tasks";
import NewMember from "../../Pages/Teams/views/NewMember";
import TeamDetail from "../../Pages/Teams/views/TeamDetail";
import Profile from "../../Pages/Users/views/Profile";
import SignIn from "../../Pages/Users/views/SignIn";
import SignUp from "../../Pages/Users/views/SignUp";
import UpdatePassword from "../../Pages/Users/views/UpdatePassword";
import { Context } from "../components/ContextProvider";

interface routeModel {
	path: string;
	condition: boolean;
	redirect: string;
	component: () => JSX.Element;
}

const useRoutes = () => {
	const { currentUser } = useContext(Context);

	const userRoutes: routeModel[] = [
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
	];

	const teamRoutes: routeModel[] = [
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
	const routes = [...userRoutes, ...teamRoutes];
	return { routes };
};
export default useRoutes;
