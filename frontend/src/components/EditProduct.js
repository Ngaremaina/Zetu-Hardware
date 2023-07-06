import React, {useState}from "react";
import * as yup from "yup"
import { useFormik } from 'formik';
const EditProduct = () =>{
    const [refreshPage, setRefreshPage] = useState(false);
   
    const formSchema = yup.object().shape({
        name:yup.string().max(20).required("Must enter name"),
        price:yup.number().max(10).required("Must enter price"),
        description:yup.string().max(20).required("Must enter description"),
        customer_id:yup.number().max(10).required("Must enter phone").positive(),
        manufacturer_id:yup.number().max(20).required("Must enter manufacturer id")
    })
    const formik = useFormik({
        initialValues:{
            name:"",
            price:1,
            description:"",
            customer_id:1,
            manufacturer_id:1
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
            <input type="text" id = "firstname" value = {formik.values.firstname} onChange={formik.handleChange}/>
            <input type="text" id = "lastname" value = {formik.values.lastname} onChange={formik.handleChange}/>
            <input type="text" id = "email" value = {formik.values.email} onChange={formik.handleChange}/>
            <input type="text" id = "phone" value = {formik.values.phone} onChange={formik.handleChange}/>
            <input type="text" id = "password" value = {formik.values.password} onChange={formik.handleChange}/>
            <button type="submit">Submit</button>

        </form>
    )
}

export default EditProduct