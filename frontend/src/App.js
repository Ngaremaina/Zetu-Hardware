import './App.css';
import React, {useEffect, useState} from "react"
import { Route,Routes } from 'react-router';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import NavBar from './components/Navbar';
import DetailsPage from './components/DetailsPage';

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

  
  
  
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/hardware' element={<Home data = {hardwares}/>}></Route>
        <Route path='/hardware/:id' element={<DetailsPage/>}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>     
    </div>
  );
}

export default App;
