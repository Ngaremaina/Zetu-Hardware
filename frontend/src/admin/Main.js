import React, {useState, useEffect} from "react";
import NavHeader from "./NavHeader";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import "./Main.css"

const Main = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch("/customers")
        .then(res => res.json())
        .then(data => {
          setUsers(data)
          // console.log(hardwares)
        })
      },[])
    
    return(
        <div>
            <NavHeader />
            <Sidebar />
            <Dashboard users = {users} />
        </div>
    )

}

export default Main