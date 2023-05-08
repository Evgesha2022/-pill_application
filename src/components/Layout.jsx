import { Link , Outlet} from "react-router-dom";
import { Button } from "@salutejs/plasma-ui";
import { IconAvatar, IconApps, IconCartAlt,IconHeart} from "@salutejs/plasma-icons";
import "../App.css"
//внизу страниы меню как сделать
const Layout =  () =>{
    return(
        <>
        <div >
        <ul >
            <li class="left"> <Link  to='/'><Button  pin="circle-circle" contentLeft={<IconApps/>} 
     /></Link></li>
   
    <li class="left" ><Link   to='/tablets'><Button   pin="circle-circle" contentLeft={<IconHeart/>} /></Link></li>
    <li class="right"><Link to='/profile'><Button  pin="circle-circle"  contentLeft={<IconAvatar/>}/></Link></li>
    <li class="right"><Link  to='/eapteka'><Button   pin="circle-circle" contentLeft={<IconCartAlt/>} /></Link></li>
    </ul></div>
    <Outlet/>
    </>
         
    )
 }
 export {Layout}