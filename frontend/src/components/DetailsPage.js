import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
const DetailsPage = () => {
    const [hardware, setHardware] = useState([])
    const { id } = useParams()

    useEffect(() => {
        fetch(`/hardware/${id}`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setHardware(data)

        })

    },[id])

    const displayData = Object.values(hardware).map(item => {
        console.log(item.name)
        var showdetails = <div>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.description}</p>
            <p>{item.category}</p>

        </div>
        return showdetails    
    })
    return(
        <div>
             {displayData}

        </div>
      
    )




}

export default DetailsPage