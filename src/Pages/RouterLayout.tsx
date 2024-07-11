import Nav from "./Nav"
import { Outlet } from "react-router-dom"
function RouterLayout () {
 return(
    <>
    <Nav />
    <Outlet />
    </>)
}

export default RouterLayout