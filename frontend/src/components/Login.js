import React ,{useState}from "react";
import * as yup from "yup"
import { useFormik } from 'formik';

const Login = () =>{
    const [refreshPage, setRefreshPage] = useState(false);
    const formSchema = yup.object().shape({
        email:yup.string().email("Invalid email").required("Must enter email"),
        password:yup.string().max(20).required("Must enter password")
    })
    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema:formSchema,onSubmit:(values) => {
            fetch("",{
                method:"POST",
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
            <h3 style={{textAlign:"center"}}>login</h3>
           <label>email</label>
            <input type="text" id = "email" value = {formik.values.email} onChange={formik.handleChange}/>
            <label>password</label>
            <input type="password" id = "password" value = {formik.values.password} onChange={formik.handleChange}/>
            <button type="submit">Submit</button>

        </form>
    )

}

export default Login