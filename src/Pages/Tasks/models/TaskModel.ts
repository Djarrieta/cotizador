import firebase from "firebase";

export enum TaskState {
	"Pendiente",
	"Haciendo",
	"Realizado",
	"Archivado",
}
export enum TaskArea {
	"Ventas",
	"Logística",
	"Técnica",
	"Financiera",
	"Otra",
}
export enum TaskTagType {
	"Miembro",
	"Tercero",
	"Proyecto",
	"Item",
}

export interface TaskModel {
	id?: string;
	state: TaskState;
	type: string[];
	tags: {
		type: TaskTagType;
		name: string;
		id: string;
	}[];
	notes: string;
	createdBy: string;
	due: string;
	createdAt: string;
	modifiedAt: string;
}
