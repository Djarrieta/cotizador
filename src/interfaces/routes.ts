import {userRestrictions} from "./userRestrictions"
export default interface IRoute{
  path:string,
  exact:boolean,
  component:any,
  name:string,
  restrictions:userRestrictions
}