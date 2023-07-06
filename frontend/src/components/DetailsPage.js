import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const DetailsPage = () => {
    const [hardware, setHardware] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`/hardware/${id}`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setHardware(data)

        })

    },[id])

    const handleDelete = () => {
        fetch(`/hardware/${id}`, {
            method:"DELETE"
        })
        .then(res => res.json())
        .then(data => setHardware(data))

        navigate('/hardware')        
    }

    const displayData = Object.values(hardware).map(item => {
        console.log(item)
        var showdetails = <div><img src={item.image} alt={item.name}/>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.description}</p>
            <p>{item.category}</p>
            <button onClick={handleDelete}>Delete</button>
            <Link to ={`/editproduct/${id}`}>EditProduct</Link>

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