import { useEffect, useState } from "react";
import Section from "../../../GlobalComponents/Section";
import Table from "../../../GlobalComponents/Table";
import TableItem from "../../../GlobalComponents/TableRow";
import { TaskModel } from "../models/TaskModel";
import { getTasksService } from "../services/getTasksService";
import { TaskState } from "../models/TaskModel";
import { useContext } from "react";
import { Context } from "../../../App/components/ContextProvider";
import { Link } from "react-router-dom";
import FieldText from "../../../GlobalComponents/FieldText";
import IconFilter from "../../../GlobalComponents/icons/IconFilter";
import IconSearch from "../../../GlobalComponents/icons/IconSearch";

const Tasks = () => {
	const [tasks, setTasks] = useState<TaskModel[]>([]);
	const { currentUser } = useContext(Context);

	useEffect(() => {
		getTasksService().then((response) => {
			setTasks(response);
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
					<Table>
						{tasks.map((task) => {
							return (
								<TableItem key={task.id}>
									<Link
										to={`/${currentUser.defaultTeam}/tarea/${task.id}`}
										className="flex flex-col w-full "
									>
										<div className="flex justify-between w-full">
											<div className="flex flex-col">
												<span className="text-2xl">{task.type[1]}</span>
												<span className="text-xs">{task.type[0]}</span>
											</div>
											<div className="flex flex-col">
												<span
													className={`rounded-lg px-1 text-xs mb-1 ${
														task.state === TaskState.Pendiente && "bg-error"
													} ${task.state === TaskState.Haciendo && "bg-info"} ${
														task.state === TaskState.Realizado && "bg-success"
													} ${
														task.state === TaskState.Archivado &&
														"bg-text_light"
													}`}
												>
													{TaskState[task.state]}
												</span>
												<span className="text-xs">{task.due}</span>
											</div>
										</div>
										<div className="flex justify-start w-full mt-1 ml-4">
											{task.tags.map((tag) => {
												return (
													<span
														className={` -ml-1 text-xs border rounded px-1 bg-color_tag_${tag.type}`}
													>
														{tag.name.slice(0, 9)}
													</span>
												);
											})}
										</div>
									</Link>
								</TableItem>
							);
						})}
					</Table>
				</div>
			</Section>
		</>
	);
};
export default Tasks;
