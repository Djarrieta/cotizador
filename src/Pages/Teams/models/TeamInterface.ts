import IMember from "./MemberInterface";

export default interface ITeam{
  members:IMember[]
  name:string,
  pictureURL:string,
  teamId:string,
}