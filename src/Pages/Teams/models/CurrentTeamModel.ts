import { Roles } from "./Roles";

export interface CurrentTeamModel {
	members: { email: string; role:Roles;uid:string }[];
	name: string;
	pictureURL: string;
	teamId: string;
}
