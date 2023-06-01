import React, { useState } from 'react';
import { updateUser } from '../api';
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

    const handleUpdate = async () => {
        try {
          const userData = { firstName, lastName, dateOfBirth, city, street_address: streetAddress, state, postal_code: postalCode, country };
          await updateUser(currentUser.user.id, userData, token);
        } catch (error) {
          console.error(error);
        }
      }

    return (
    <form id="edit-user-form">
      <label className="edit-user-label">
        First Name:
        <input type="text" className="input-field edit-user-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </label>
      <label className="edit-user-label">
        Last Name:
        <input type="text" className="input-field edit-user-input" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </label>
      <label className="edit-user-label">
        Date Of Birth:
        <input type="date" className="input-field edit-user-input" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
      </label>
      <label className="edit-user-label">
        City:
        <input type="text" className="input-field edit-user-input" value={city} onChange={(e) => setCity(e.target.value)} required />
      </label>
      <label className="edit-user-label">
        Street Address:
        <input type="text" className="input-field edit-user-input" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} required />
      </label>
      <label className="edit-user-label">
        State:
        <input type="text" className="input-field edit-user-input" value={state} onChange={(e) => setState(e.target.value)} />
      </label>
      <label className="edit-user-label">
        Postal Code:
        <input type="number" className="input-field edit-user-input" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
      </label>
      <label className="edit-user-label">
        Country:
        <input type="text" className="input-field edit-user-input" value={country} onChange={(e) => setCountry(e.target.value)} required />
      </label>
      <div>
        <button onClick={()=>{handleUpdate()}} id="edit-user-btn" className="edit-user-btn">Update</button>
        <button onClick={()=>{window.location.reload();}} id="cancel-update-btn" className="form-btn">Cancel</button>
      </div>
    </form>
  );
}

export default UpdateUserForm;