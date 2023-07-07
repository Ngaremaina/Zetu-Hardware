import React ,{useState}from "react";

const Login = ({loginuser}) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault()
        loginuser(email, password)
    return(
        <form onSubmit={handleSubmit}>
            <h3 style={{textAlign:"center"}}>login</h3>
           <label>email</label>
            <input type="text" id = "email" value = {email} onChange={e => setEmail(e.target.value)}/>
            <label>password</label>
            <input type="password" id = "password" value = {password} onChange={e => setPassword(e.target.value)}/>
            <button type="submit">Submit</button>

        </form>
    )

}}

export default Login