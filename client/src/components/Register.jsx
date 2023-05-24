import React, {useState} from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import './Register.css';
import { registerUser } from '../api';

const Register = ({
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    currentUser,
    setCurrentUser,
  }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    console.log(username);
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const userToAuth = { username, password};
      console.log(userToAuth);
      const data = await registerUser(userToAuth);
      console.log(data);
  
      if (data.token) {
        setToken(data.token);
        console.log(data.token);
        setCurrentUser(username);
        console.log('-------->',username);
        setIsLoggedIn(true); }
        {
        console.log("login is set to true");
        setUsername('');
        setPassword('');
        navigate('/'); 
      }
     
     
    }
  
    return (
      <>
        <div className='register-container'>
            <h2>Register</h2>
          <form
            onSubmit={handleSubmit} >
            <label htmlFor='username'>Username:</label>
            <input
            className='register'
              type='text'
              name='username'
              value={username}
              onChange={(event) => setUsername(event.target.value)} />
            <label htmlFor='password'> Password</label>
            <input
            className='register'
              type='text'
              name='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)} />
            <button className='registerbutton' type='submit'>Create Account</button>
          </form>
        </div>
      </>
  
    );
  }
  export default Register;