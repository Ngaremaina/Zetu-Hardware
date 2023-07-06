import React, {useState}from "react";
import * as yup from "yup"
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
const Signup = () =>{
    const [refreshPage, setRefreshPage] = useState(false);
    const navigate = useNavigate()
   
    const formSchema = yup.object().shape({
        firstname:yup.string().max(20).required("Must enter name"),
        lastname:yup.string().max(20).required("Must enter name"),
        email:yup.string().email("Invalid email").required("Must enter email"),
        phone:yup.number().max(10).required("Must enter phone").positive(),
        password:yup.string().max(20).required("Must enter password")
    })
    const formik = useFormik({
        initialValues:{
            firstname:"",
            lastname:"",
            email:"",
            phone:"",
            password:""
        },
        validationSchema:formSchema,onSubmit:(values) => {
            fetch("/addcustomers",{
                method:"POST",
                headers:{"Content-Type":"application/json",},
                body:JSON.stringify(values),

            })
            .then(res =>{
                if (res.status === 200){
                    setRefreshPage(!refreshPage)
                    // navigate("/login")
                    
                }
            })
        }
    })
    return(
        <form onSubmit={formik.handleSubmit}>
            <h3 style={{textAlign:"center"}}>Sign up</h3>
             <label>firstname</label>
            <input type="text" id = "firstname" value = {formik.values.firstname} onChange={formik.handleChange}/>
            <label>lastname</label>
            <input type="text" id = "lastname" value = {formik.values.lastname} onChange={formik.handleChange}/>
            <label>email</label>
            <input type="text" id = "email" value = {formik.values.email} onChange={formik.handleChange}/>
            <label>phone</label>
            <input type="text" id = "phone" value = {formik.values.phone} onChange={formik.handleChange}/>
            <label>password</label>
            <input type="password" id = "password" value = {formik.values.password} onChange={formik.handleChange}/>
            <button type="submit">Submit</button>

        </form>
    )
}

export default Signup