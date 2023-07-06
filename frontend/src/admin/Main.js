import React from "react";
import NavHeader from "./NavHeader";
import Sidebar from "./Sidebar";
import Sales from "./Sales";
import Dashboard from "./Dashboard";
import Body from "./Body";
import Admin from "./Admin";
const Main = () => {
    return(
        <div>
            <NavHeader />
            <Sidebar />
            <Dashboard />
            {/* <Body/> */}
            {/* <Sales /> */}
            
            {/* <Admin/> */}

        </div>
    )

}

export default Main