import IRoute from "../interfaces/routes"
import Home from "../views/Home"
import Login from "../views/Login"
import Error404 from  "../views/Error404"
import {userRestrictions} from "../interfaces/userRestrictions"

const routes:IRoute[]=[
  {
    path:'/',
    exact:true,
    component:Home,
    name:"Home",
    restrictions:userRestrictions.everyone
  },
  {
    path:'/ingreso',
    exact:true,
    component:Login,
    name:"Login",
    restrictions:userRestrictions.everyone
  },
  {
    path:'/*',
    exact:false,
    component:Error404,
    name:"Error404",
    restrictions:userRestrictions.everyone
  },
]
export default routes
