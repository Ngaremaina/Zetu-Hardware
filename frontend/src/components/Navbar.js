import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return(
        <nav>
            <NavLink to="/hardware">Home</NavLink>
            <NavLink>Logout</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">SignUp</NavLink>
        </nav>
    )

}

export default NavBar