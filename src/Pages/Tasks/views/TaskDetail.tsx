import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Section from "../../../GlobalComponents/Section";

const TaskDetail = () => {
	const history = useHistory();
  const { teamId,taskId } = useParams<{ teamId: string,taskId:string }>();

	return (
		<>
			<Section
				name="Detalle Tarea"
        
				button={true}
				buttonName="Atrás"
				handleFunction={() =>
					history.push("/" + teamId + "/tareas")
				}
			>
				<div>{taskId}</div>
			</Section>
		</>
	);
};
export default TaskDetail;
