import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Signup = () => {
  var navigate=useNavigate()
  var location=useLocation()
  console.log("loc",location.state)
  var[Inputs,setInputs]=useState({email :"",username :"",password:""})
  const Inputhandler=(e)=>{
      setInputs({...Inputs,[e.target.name]:e.target.value});
      console.log(Inputs)
  }
  const hp={
    display:"flex",flexDirection:"column",
    justifyContent:"center",alignItems:"center",paddingTop:"25px",
    marginLeft:"30",paddingLeft:"0px",
  }
  const [usertype, setUsertype] = useState('');
  const addHandler=()=>{
    if (!Inputs.email || !Inputs.username || !Inputs.password) {
      alert('Please fill in all the required fields.');
      return; 
    }
    axios.post("http://localhost:3004/add",Inputs)
    .then((response)=>{
        console.log(response);
        alert(response.data.message)
        navigate("/Login")  
    }
  )
  .catch((err) => {
    console.log(err);
    alert("Signup failed. Please try again.");
  });
}
  
  return (
    <div>
        <div style={{display:"lnline-block"}}>
          <img style={{
            width:"50%",
            height:"90vh",
            marginTop:"10px",
            float:"left"
          }}src="book3.jpg" alt="book" />
        </div>
        
        <div style={hp}>
        
          <p style={{marginRight:"135px",marginBottom:"0px"}}>Start your journey</p>
          <h3 style={{marginTop:"15px",marginRight:"0px",fontSize:"23px",fontFamily:"roboto"}}>SIGNUP to Book Reviews</h3><br />
          <TextField sx={{marginRight:"40px",}}label="Email" variant='outlined' color='warning' name="email" value={Inputs.email} onChange={Inputhandler} required type="email" autoComplete="off"  /><br /><br />
          <TextField sx={{marginRight:"40px",}}label="Username" variant='outlined' color='warning' name="username" value={Inputs.username} onChange={Inputhandler}  required type="text" autoComplete="off"  /><br /><br />
          <TextField sx={{marginRight:"40px"}}label="Password" variant='outlined' color='warning' name="password" value={Inputs.password} onChange={Inputhandler}   required type="password" autoComplete="off" /><br /><br />
          <Button variant='contained' onClick={addHandler} sx={{backgroundColor:'rgb(129,77,8)',marginRight:"40px",width:"220px",height:"40px"}}>SIGNUP</Button> 
          <p style={{marginRight:"45px"}}>Have an account? <span><Link to="/Login">Login</Link></span></p>
          
        </div>
        
    </div>
  )
}

export default Signup