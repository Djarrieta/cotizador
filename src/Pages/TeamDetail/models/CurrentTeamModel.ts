import ROLES from "../../../constants/ROLES";

export interface CurrentTeamModel {
	members: { email: string; role:ROLES;uid:string }[];
	name: string;
	pictureURL: string;
	teamId: string;
}
