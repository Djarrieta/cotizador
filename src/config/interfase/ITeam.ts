import IMember from "./IMember";

export default interface ITeam{
  members:IMember[]
  name:string,
  pictureURL:string,
  teamId:string,
}