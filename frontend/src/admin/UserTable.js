import React from "react";

const Userslist = ({firstname, lastname, email, phone}) => {

    return(
        <table id ="home">
            <tr>
                <th>firstname</th>
                <th>lastnamename</th>
                <th>email</th>
                <th>phone</th>  
            </tr>
            <tr>
                <td>{firstname}</td>
                <td>{lastname}</td>
                <td>{email}</td>
                <td>{phone}</td>
            </tr>
        </table>
    )

}

export default Userslist