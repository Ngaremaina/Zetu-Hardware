import React, {useState}from "react";
import * as yup from "yup"
import { useFormik } from 'formik';
import { useParams } from "react-router-dom";
const EditProduct = () =>{
    const [refreshPage, setRefreshPage] = useState(false);
    const { id } = useParams()
    const formSchema = yup.object().shape({
        name:yup.string().max(20).required("Must enter name"),
        price:yup.number().max(10).required("Must enter price"),
        image:yup.string().max(20).required("enter image"),
        category:yup.string().max(20).required("enter category"),
        description:yup.string().max(20).required("Must enter description"),
        customer_id:yup.number().max(10).required("Must enter phone").positive(),
        manufacturer_id:yup.number().max(20).required("Must enter manufacturer id")
    })
    console.log(id)
    const formik = useFormik({
        initialValues:{
            name:"",
            price:1,
            description:"",
            customer_id:1,
            manufacturer_id:1,
            image:"",
            category:""
        },
        validationSchema:formSchema,onSubmit:(values) => {
            fetch(`/hardware/${id}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json",},
                body:JSON.stringify(values, null, 2),

            })
            .then(res =>{
                if (res.status === 200){
                    setRefreshPage(!refreshPage)
                }
            })
        }
    })
    return(
        <form onSubmit={formik.handleSubmit}>
            <h3 style={{textAlign:"center"}}>Edit Product</h3>
            <label>name</label>
            <input type="text" id = "name" value = {formik.values.name} onChange={formik.handleChange}/>
            <label>category</label>
            <input type="text" id = "category" value = {formik.values.category} onChange={formik.handleChange}/>
            <label>image</label>
            <input type="text" id = "image" value = {formik.values.image} onChange={formik.handleChange}/>
            <label>price</label>
            <input type="text" id = "price" value = {formik.values.price} onChange={formik.handleChange}/>
            <label>description</label>
            <input type="text" id = "description" value = {formik.values.description} onChange={formik.handleChange}/>
            <label>customer_id</label>
            <input type="text" id = "customer_id" value = {formik.values.customer_id} onChange={formik.handleChange}/>
            <label>manufacturer_id</label>
            <input type="text" id = "manufacturer_id" value = {formik.values.manufacturer_id} onChange={formik.handleChange}/>
            <button type="submit">Submit</button>

        </form>
    )
}

export default EditProduct