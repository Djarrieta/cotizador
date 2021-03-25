import Home from "../../views/Home"
import Login from "../../views/Login"
import Error404 from  "../../views/Error404"
import Profile from "../../views/Profile"

const routes:{
  path:string, 
  component:any,
  redirect:string,
  protected:boolean}[]=[
  {
    path:'/',
    component:Home,
    redirect:'/',
    protected:false
  },
  {
    path:'/ingreso',
    component:Login,
    redirect:'/',
    protected:true
  },
  {
    path:'/perfil',
    component:Profile,
    redirect:'/ingreso',
    protected:true
  },
  {
    path:'/*',
    component:Error404,
    redirect:'/',
    protected:false
  },
]
export default routes
