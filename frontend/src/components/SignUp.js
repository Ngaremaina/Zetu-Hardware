import React, {useState}from "react";

const Signup = ({signupuser}) =>{
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phone, setPHone] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault()
        signupuser(firstname, lastname, email, phone, password)
    
    return(
        <form onSubmit={handleSubmit}>
            <h3 style={{textAlign:"center"}}>Sign up</h3>
            <label>firstname</label>
            <input type="text" id = "firstname" value = {firstname} onChange={e=> setFirstName(e.target.value)}/>
            <label>lastname</label>
            <input type="text" id = "lastname" value = {lastname} onChange={e=>setLastName(e.target.value)}/>
            <label>email</label>
            <input type="text" id = "email" value = {email} onChange={e=>setEmail(e.target.value)}/>
            <label>phone</label>
            <input type="text" id = "phone" value = {phone} onChange={e=>setPHone(e.target.value)}/>
            <label>password</label>
            <input type="password" id = "password" value = {password} onChange={e=>setPassword(e.target.value)}/>
            <button type="submit">Submit</button>

        </form>
    )
}}

export default Signup