import {Link} from 'react-router-dom'
import "./navbar.css"

const NavBar = () => {
    return(
        <div className="navbar">
            <div className="navcontainer">
                <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
                <span className="logo">Lamabooking</span>
                </Link>
                <div className="navitems">
                    <button className="navButton">Register</button>
                    <button className="navButton">Login</button>
                </div>
            </div>
        </div>
    )

}
export default NavBar
