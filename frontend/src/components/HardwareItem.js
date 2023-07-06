import React from "react";
import { Link } from "react-router-dom";

const HardwareItem = ({id, name, price,image }) => {
    // console.log(name)
    return (
        <div className="card">
            <img src={image} alt={name}/>
            <div className="container">
                <p>{name}</p>
                <p>Kshs. {price}</p>
                <Link to={`/hardware/${id}`}>Show more</Link>
            </div>          
        </div>
    )

}

export default HardwareItem