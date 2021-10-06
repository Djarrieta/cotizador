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

const useRoutes = () => {
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
	return { routes };
};
export default useRoutes;
