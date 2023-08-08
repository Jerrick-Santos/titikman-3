import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios"
import NavBar from '../components/NavBar';
import Cookies from 'js-cookie';


const LoginForm = () => {
  const userId = useState(Cookies.get('_id')) 
  const userType = useState(Cookies.get('userType')) 
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform any necessary login logic here using the userType, username, and password state variables.
    const login = {userName, password, rememberMe}
    const response = await fetch('https://titikman.onrender.com/api/login', {
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        'Content-Type':'application/json'
      },
    });

    if (response.ok) {
      const json = await response.json();
      console.log(json.userId)
      Cookies.set('_id', json.userId, { expires: json.expiryDate });
      setUsername('');
      setPassword('');
      setError(null);
      console.log('Logged', json);
      navigate('/');
    } else {
      const errorMessage = await response.text(); // Get the error message from the response
      setError(errorMessage);
    }
  };

  return (

    <>
    <NavBar userIDcookies={userId} />
    
    <div className="container justify-content-center align-items-center mt-5 pt-4">
      <div className="row">
        <div className="col-12 col-sm-8 col-md-6 m-auto">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="text-center mt-3 text-danger">Login</h1>
              {error && <p className="text-danger text-center">{error}</p>} {/* Add this line */}

              {/* ACTUAL FORM */}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="username"
                  className="form-control my-4 py-2"
                  placeholder="Username"
                  value={userName}
                  onChange={handleUsernameChange}
                />
                <input
                  type="password"
                  id="password"
                  className="form-control my-4 py-2"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                />
                <label>Remember Me</label>
                <div className="text-center mt-3 mb-2">
                  <button type="submit" className="btn btn-danger">
                    Login
                  </button>
                </div>
                <small className="d-flex justify-content-center">
                  New to Titikman? &nbsp;<Link to="/signup">Sign up</Link>
                </small>
              </form>


            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
    
  );
};

export default LoginForm;