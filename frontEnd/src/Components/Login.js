import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        // console.log(email, password);

        const info = {email, password};
        fetch("http://localhost:3001/login", {
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
            // console.log(data);
            // if(data.name) {
            if(data.auth) {
                // localStorage.setItem("user", JSON.stringify(data));
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", JSON.stringify(data.auth));   // token ko localstorage mein set karwa rhe hai
                navigate('/');
            }
            else
                alert("Please enter correct details");
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if(auth)
        {
            navigate('/');
        }
    })

    return (
        <div className='login'>
            <h1> Login Page </h1>

            <input type="email" className="inputBox" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email' />
            <input type="password" className="inputBox" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password' />
            <button onClick={handleLogin} className='button' type="button"> Login </button>
        </div>
    )
}

export default Login;