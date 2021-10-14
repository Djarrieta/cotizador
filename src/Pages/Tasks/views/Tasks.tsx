import { useEffect } from "react";
import FieldText from "../../../GlobalComponents/FieldText";
import IconFilter from "../../../GlobalComponents/icons/IconFilter";
import IconSearch from "../../../GlobalComponents/icons/IconSearch";
import Section from "../../../GlobalComponents/Section";
import { getTasksService } from "../services/getTasksService";

const Tasks = () => {
/* 	const [tasks, setTasks] = useState<TaskModel[]>([]);
	const { currentUser } = useContext(Context); */

	useEffect(() => {
		getTasksService().then((response) => {
			//setTasks(response);
		});
	}, []);

	return (
		<>
			<Section name="Tareas">
				<div>
					<div className="flex justify-around w-full h-8 p-1 rounded-lg bg-text_light">
						<IconSearch />
						<FieldText placeholder="Búsqueda" value="" />
						<IconFilter />
					</div>
				</div>
			</Section>
		</>
	);
};
export default Tasks;
