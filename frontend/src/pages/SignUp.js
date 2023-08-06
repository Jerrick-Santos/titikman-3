import restaurant from '../assets/restaurant.png';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie';
import NavBar from '../components/NavBar';


const SignUpForm = () => {
  const userId = useState(Cookies.get('_id')) 
  const usertype = useState(Cookies.get('userType')) 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUsername] = useState('');
  const [plainpassword, setplainPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleplainPasswordChange = (e) => {
    setplainPassword(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signup = {firstName, lastName, userName, plainpassword, userType}
    const response = await fetch('/api/signup', {
      method: "POST",
      body: JSON.stringify(signup),
      headers: {
        'Content-Type':'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setFirstName('')
      setLastName('')
      setUsername('')
      setplainPassword('')
      setUserType('')
      setError(null)
      console.log('New User added', json)
      navigate('/');
    }
  };

  return (

    <>
      <NavBar userIDcookies={userId}/>
      <div className="container align-items-center mt-1 pt-5">
      <div className="row border rounded-5 p-4 bg-white shadow box-area">
        <div className="col-md-6 left-box">
          <div className="row align-items-center">
            <div className="header-text mb-3 text-danger">
              <h1>Sign Up</h1>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                </div>
                <div className="col mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Username"
                    value={userName}
                    onChange={handleUsernameChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-group mb-3">
                  <input
                    type="plainpassword"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="plainPassword"
                    value={plainpassword}
                    onChange={handleplainPasswordChange}
                  />
                </div>
              </div>
              <div className="mb-1">
                <label className="form-label">Select User Type:</label>
              </div>
              <select
                className="form-select mb-3"
                aria-label="Default select example"
                value={userType}
                onChange={handleUserTypeChange}
              >
                <option value="">Open this select menu</option>
                <option value="2">Reviewer</option>
                <option value="3">Owner</option>
              </select>
              <p className="continue justify-content-center">
                By continuing, you agree to Titikman's Terms of Service and acknowledge Titikman's Privacy Policy
              </p>
              <div className="input-group mb-3">
                <button type="submit" className="btn btn-lg btn-danger w-100 fs-6">
                  Sign Up
                </button>
              </div>
              <div className="row">
                <small className="info d-flex justify-content-center">
                  Already have an account? &nbsp;<Link to="/login">Log In</Link>
                </small>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column right-box" style={{ background: '#ffffff' }}>
          <div className="featured-image mb-3">
            <img src={restaurant} className="img-fluid mb-7" style={{ width: '400px' }} alt="Restaurant" />
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default SignUpForm;