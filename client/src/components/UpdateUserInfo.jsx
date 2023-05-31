import React, { useState, useEffect } from 'react';
import { updateUser, getUsersWithInfo } from '../api';
import './Forms.css'

const UpdateUserForm = ({currentUser, token}) => {
    
    // const [firstName, setFirstName] = useState(user.info.firstName);
    // const [lastName, setLastName] = useState(user.info.lastName);
    // const [dateOfBirth, setDateOfBirth] = useState(user.info.dateOfBirth);
    // const [city, setCity] = useState(user.address.city);
    // const [streetAddress, setStreetAddress] = useState(user.address.streetAddress);
    // const [state, setState] = useState(user.address.state);
    // const [postalCode, setPostalCode] = useState(user.address.postalCode);
    // const [country, setCountry] = useState(user.address.country);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [city, setCity] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          const userData = { firstName, lastName, dateOfBirth, city, streetAddress, state, postalCode, country };
          // console.log('this is user data->:',userData);
          const updatedUser = await updateUser(currentUser.user.id, userData, token);
          console.log(updatedUser); // returns a promise
        } catch (error) {
          console.error(error);
        }
      }

    return (
    <form id="edit-user-form">
      <label>
        First Name:
        <input type="text" className="input-field" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </label>
      <label>
        Last Name:
        <input type="text" className="input-field" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </label>
      <label>
        Date Of Birth:
        <input type="date" className="input-field" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
      </label>
      <label>
        City:
        <input type="text" className="input-field" value={city} onChange={(e) => setCity(e.target.value)} required />
      </label>
      <label>
        Street Address:
        <input type="text" className="input-field" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} required />
      </label>
      <label>
        State:
        <input type="text" className="input-field" value={state} onChange={(e) => setState(e.target.value)} />
      </label>
      <label>
        Postal Code:
        <input type="number" className="input-field" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
      </label>
      <label>
        Country:
        <input type="text" className="input-field" value={country} onChange={(e) => setCountry(e.target.value)} required />
      </label>
      <div>
        <button onClick={()=>{handleUpdate()}} id="update-user-btn" className="form-btn">Update</button>
        <button onClick={()=>{console.log('processing cancel request')}} id="cancel-update-btn" className="form-btn">Cancel</button>
      </div>
    </form>
  );
}

export default UpdateUserForm;