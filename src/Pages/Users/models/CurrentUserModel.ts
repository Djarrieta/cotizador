export interface CurrentUserModel{
  uid?: string;
  name?: string;
  email?: string;
  whatsapp?:string;
  pictureURL?: string;
  password?:string;
  defaultTeam?:string;
  teams?:{teamId:string; role:string}[]
}