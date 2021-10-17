import { Roles } from "../../Teams/models/Roles";

export interface CurrentUserModel{
  uid?: string;
  name?: string;
  email?: string;
  whatsapp?:string;
  pictureURL?: string;
  defaultTeam?:string;
  teams?:{teamId:string; role:Roles}[]
  password?:string;
  confirmation?:string;
}