import { Link, Outlet } from "react-router-dom";
import { Button } from "@salutejs/plasma-ui";
import { IconAvatar, IconApps, IconCartAlt, IconHeart, IconPlus } from "@salutejs/plasma-icons";
import "../App.css"
import "./menu.css"

//внизу страниы меню как сделать
/*async function Error (){
    if(!localStorage.getItem('user'))
    { alert("Зарегистрируйтесь в системе" ); return '/profile';}
    else{ return '/addtablet';}
   }*/

const Layout = () => {

  //console.log("Error", Error())
  return (
    <>
      <div className="parent" style={{}}>
        <ul style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  >
          <li className="left" style={{ flexBasis: '25%', textAlign: 'center' }}> <Link to='/'><Button pin="circle-circle" contentLeft={<IconApps />}
          /></Link></li>
          <li className="left" style={{ flexBasis: '25%', textAlign: 'center' }} ><Link to='/tablets'><Button pin="circle-circle" contentLeft={<IconHeart />} /></Link></li>
          <li className="right" style={{ flexBasis: '25%', textAlign: 'center' }}><Link to='/profile'><Button pin="circle-circle" contentLeft={<IconAvatar />} /></Link></li>
          <li className="right" style={{ flexBasis: '25%', textAlign: 'center' }}><Link to='/eapteka'><Button pin="circle-circle" contentLeft={<IconCartAlt />} /></Link></li>
          <li className="right" style={{ flexBasis: '25%', textAlign: 'center' }}><Link to={'/addtablet'}><Button pin="circle-circle" contentLeft={<IconPlus />} /></Link></li>
        </ul>
      </div>
      <Outlet />
    </>

  )
}
export { Layout }