export interface CurrentTeamModel {
	members: { email: string; role:string;uid:string }[];
	name: string;
	pictureURL: string;
	teamId: string;
}
