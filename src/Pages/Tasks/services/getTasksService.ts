import { TaskModel } from "../models/TaskModel";
import { TaskState } from "../models/TaskModel";
import { TaskTagType } from "../models/TaskModel";

export const getTasksService = (): Promise<TaskModel[]> => {
	return new Promise((resolve, reject) => {
		resolve([
			{
				id: "1",
				state: TaskState.Pendiente,
				type: ["Comercial", "Cotización"],
				tags: [
					{
						type: TaskTagType.Proyecto,
						name: "Nombre Proyecto",
						id: "id Proyecto",
					},
					{
						type: TaskTagType.Item,
						name: "Nombre Item",
						id: "id Tercero",
					},
          {
						type: TaskTagType.Tercero,
						name: "Nombre Tercero",
						id: "id Tercero",
					},
          {
						type: TaskTagType.Miembro,
						name: "Nombre Miembro",
						id: "id Miembro",
					},
				],
				notes: "notas Tarea 1",
				createdBy: "createdBy",
				due: "01/01/21",
				createdAt: "01/01/21",
				modifiedAt: "01/01/21",
			},
      {
        id: "2",
        state: TaskState.Realizado,
        type: ["Técnico", "Cotización"],
        tags: [
          {
            type: TaskTagType.Proyecto,
            name: "Nombre Proyecto",
            id: "id Proyecto",
          },
        ],
        notes: "notas Tarea 1",
        createdBy: "createdBy",
        due: "01/01/21",
        createdAt: "01/01/21",
        modifiedAt: "01/01/21",
      },
      {
        id: "2",
        state: TaskState.Realizado,
        type: ["Técnico", "Cotización"],
        tags: [
          {
            type: TaskTagType.Proyecto,
            name: "asdf",
            id: "id Proyecto",
          },
          {
            type: TaskTagType.Proyecto,
            name: "Proyecto",
            id: "id Proyecto",
          },
        ],
        notes: "notas Tarea 1",
        createdBy: "createdBy",
        due: "01/01/21",
        createdAt: "01/01/21",
        modifiedAt: "01/01/21",
      },
      {
        id: "2",
        state: TaskState.Realizado,
        type: ["Técnico", "Cotización"],
        tags: [
          {
            type: TaskTagType.Proyecto,
            name: "Nombre Proyecto",
            id: "id Proyecto",
          },
          {
            type: TaskTagType.Tercero,
            name: "Nombre Tercero",
            id: "id Tercero",
          },
        ],
        notes: "notas Tarea 1",
        createdBy: "createdBy",
        due: "01/01/21",
        createdAt: "01/01/21",
        modifiedAt: "01/01/21",
      },
      {
        id: "2",
        state: TaskState.Realizado,
        type: ["Técnico", "Cotización"],
        tags: [
          {
            type: TaskTagType.Proyecto,
            name: "Nombre Proyecto",
            id: "id Proyecto",
          },
          {
            type: TaskTagType.Tercero,
            name: "Nombre Tercero",
            id: "id Tercero",
          },
        ],
        notes: "notas Tarea 1",
        createdBy: "createdBy",
        due: "01/01/21",
        createdAt: "01/01/21",
        modifiedAt: "01/01/21",
      },
      {
        id: "2",
        state: TaskState.Realizado,
        type: ["Técnico", "Cotización"],
        tags: [
          {
            type: TaskTagType.Proyecto,
            name: "Nombre Proyecto",
            id: "id Proyecto",
          },
          {
            type: TaskTagType.Tercero,
            name: "Nombre Tercero",
            id: "id Tercero",
          },
        ],
        notes: "notas Tarea 1",
        createdBy: "createdBy",
        due: "01/01/21",
        createdAt: "01/01/21",
        modifiedAt: "01/01/21",
      }
      
		]);
	});
};