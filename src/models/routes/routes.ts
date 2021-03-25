import Home from "../../views/Home"
import Login from "../../views/Login"
import Error404 from  "../../views/Error404"

const routes:{
  path:string, 
  component:any,
  name:string,
  redirect:string,
  protected:boolean}[]=[
  {
    path:'/',
    component:Home,
    name:"Home",
    redirect:'/',
    protected:false
  },
  {
    path:'/ingreso',
    component:Login,
    name:"Login",
    redirect:'/',
    protected:true
  },
  {
    path:'/*',
    component:Error404,
    name:"Error404",
    redirect:'/',
    protected:false
  },
]
export default routes
