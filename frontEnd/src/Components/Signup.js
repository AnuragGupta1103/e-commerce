import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
      const auth = localStorage.getItem("user");
      if(auth)
      {
          navigate('/');
      }
  });

  function collectData () {
    // console.log(name, email, password);
    
    const info = {name, email, password};
    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);

      // local storage mein data rak rhe hai
      // localStorage.setItem("user", JSON.stringify(data.result));
      // localStorage.setItem("token", JSON.stringify(data.auth));
      
      // navigate("/");
      alert('You have been registered');
      navigate('/login');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className='register'>
        <h1> Register </h1>

        <input className='inputBox' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter name' />
        <input className='inputBox' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email' />
        <input className='inputBox' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password' />
        <button onClick={collectData} type='button' className='button'> Signup </button>
    </div>
  )
}

export default Signup;