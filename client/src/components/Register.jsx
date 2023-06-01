import React, {useState} from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import './Register.css';
import { createCart, registerUser } from '../api';

const Register = ({
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    currentUser,
    setCurrentUser,
    currentCart, 
    setCurrentCart, 
  }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const userToAuth = { username, password};
      // console.log(userToAuth);
      const data = await registerUser(userToAuth);
      // console.log('data----->',data);

      
      if (data.token) {
        setToken(data.token);
        setCurrentUser(username);
        const cart = await createCart({userId:data.user.id, purchaseStatus:false});
        setIsLoggedIn(true); 
        setCurrentCart(cart);
      }
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
            <label htmlFor='username'>
              <input    
                className='register'
                type='text'
                name='username'
                value={username}
                placeholder='Username'
                onChange={(event) => setUsername(event.target.value)} />
            </label>
            <label htmlFor='password'>
              <input
              className='register'
              type='text'
              name='password'
              value={password}
              placeholder='Password'
              onChange={(event) => setPassword(event.target.value)} />
            </label>
            <button className='registerbutton' type='submit'>Create Account</button>
          </form>
        </div>
      </>
  
    );
  }
  export default Register;