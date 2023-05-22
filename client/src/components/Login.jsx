import React, {useState} from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { loginUser } from "../api";
import './Login.css';

const Login = ({
    currentUser,
    setCurrentUser,
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
  }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userToAuth = { username: username, password: password };
        const data = await loginUser(userToAuth);
        if (!data) {
          window.alert("Invalid credentials, Username or Password is incorrect");
        } else {
          setToken(data.token);
            
          setCurrentUser(username);
          
          localStorage.setItem("currentUser", username);
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
    
         
          setUsername("");
          setPassword("");
          navigate("/");
        }
      };
    return (
        <div className="loginbody">
        <h1>Login/Sign Up!</h1>
        <form onSubmit={handleSubmit} className="formContainer">
              <h2>Please Log in</h2>
              
              <input
              className="login"
                type="text"
                placeholder="UserName"
                name="UserName"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
              className="login"
                type="password"
                placeholder="Password"
                name="psw"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <div className="loginButtons">
              <button type="submit" className="loginButton" onClick={() => {handleSubmit}}>
                Log in
              </button>
              
              </div>
            </form>
            <button onClick={() => { navigate('/Register')}} className="loginButton">Sign Up</button>
        </div> 
    )  
}

export default Login;