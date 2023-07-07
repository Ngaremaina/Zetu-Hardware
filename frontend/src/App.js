import './App.css';
import React, {useEffect, useState} from "react"
import { Route,Routes } from 'react-router';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import NavBar from './components/Navbar';
import EditProduct from './components/EditProduct';
import DetailsPage from './components/DetailsPage';
import Main from './admin/Main';

function App() {
  const [hardwares, setHardwares] = useState([])
  useEffect(() => {
    fetch("/hardware")
    .then(res => res.json())
    .then(data => {
      setHardwares(data)
      // console.log(hardwares)
    })
  },[])
  
  const loginuser = (email, password) => {
    fetch('/login', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      })
      .then(res => res.json())
      .then(data => console.log(data))
  }
  
  const signupuseruser = (firstname,lastname,email, phone,password) => {
    fetch('/signup', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstname, lastname, email, phone,password }),
      })
      .then(res => res.json())
      .then(data => console.log(data))
  }
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/login' element={<Login loginuser={loginuser}/>}></Route>
        <Route path='/hardware' element={<Home data = {hardwares}/>}></Route>
        <Route path='/hardware/:id' element={<DetailsPage/>}></Route>
        <Route path='/signup' element={<Signup signupuser={signupuseruser}/>}></Route>
        <Route path='/editproduct/:id' element = {<EditProduct />}></Route>
        <Route path='/admin' element = {<Main /> }></Route>
      </Routes>
    </div>
  );
}

export default App;
