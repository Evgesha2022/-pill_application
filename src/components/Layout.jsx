import { Link , Outlet} from "react-router-dom";
import { Button } from "@salutejs/plasma-ui";
import { IconAvatar, IconApps, IconCartAlt,IconHeart, IconPlus} from "@salutejs/plasma-icons";
import "../App.css"
//внизу страниы меню как сделать
/*async function Error (){
    if(!localStorage.getItem('user'))
    { alert("Зарегистрируйтесь в системе" ); return '/profile';}
    else{ return '/addtablet';}
   }*/

const Layout =  () =>{
  
   //console.log("Error", Error())
    return(
        <>
      <div className="parent" >
        <ul  >
            <li  class="left"> <Link  to='/'><Button  pin="circle-circle" contentLeft={<IconApps/>} 
     /></Link></li>
    <li class="left" ><Link   to='/tablets'><Button   pin="circle-circle" contentLeft={<IconHeart/>} /></Link></li>
    <li class="right"><Link to='/profile'><Button  pin="circle-circle"  contentLeft={<IconAvatar/>}/></Link></li>
    <li class="right"><Link  to='/eapteka'><Button   pin="circle-circle" contentLeft={<IconCartAlt/>} /></Link></li>
    <li class="right"><Link  to={'/addtablet'}><Button  pin="circle-circle" contentLeft={<IconPlus/>} /></Link></li>
    </ul>
    </div>
    <Outlet/>
    </>
         
    )
 }
 export {Layout}