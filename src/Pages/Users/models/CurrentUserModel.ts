export interface CurrentUserModel{
  uid?: string;
  name?: string;
  email?: string;
  whatsapp?:string;
  pictureURL?: string;
  defaultTeam?:string;
  teams?:{teamId:string; role:string}[]
  password?:string;
  confirmation?:string;
}