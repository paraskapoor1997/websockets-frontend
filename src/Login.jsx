import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext';
import './login.css'
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const { loggedinUser, setLoggedinUser } = useContext(UserContext);
    const [user,setUser ] = useState(null);
    const [password,setPassword ] = useState(null);
    const navigate = useNavigate()

    const loginHandler = async () => {
        if(!user || !password) {
            alert("Please enter username and password");
            return;
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
          method:'POST',
          headers: {'content-type': 'application/json'},
          credentials: "include",
          body:JSON.stringify({user, password})
        })

        if(response.ok){
          const result = await response.json()
          setLoggedinUser({id: result?.user?._id, username:result?.user?.username })
          navigate("/")
        }
        else{
            setLoggedinUser("");
            alert("Invalid credentials");
        }
    }

  return (
     <div className="login-container">
        <div className="login-card">
            <h2 className="login-title">Sign In</h2>
            <input
              type="text"
              onChange={(e) => setUser(e.target.value)}
              placeholder="Username"
              className="login-input"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="login-input"
            />
            <button onClick={loginHandler} className="login-button">
              Submit
            </button>

            {/* New register link */}
            <p className="register-text">
              New? <Link to="/register" className="register-link">Register here</Link>
            </p>
        </div>
    </div>
  )
}

export default Login
