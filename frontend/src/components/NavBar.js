import search from '../assets/search.png';
import user from '../assets/user.png';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

  const NavBar = (props) => {
    const GUEST_USERID = "64bdf3eea4354c42f888ec3c";
    const [userID, setUserID] = useState(props.userIDcookies);
    const navigate = useNavigate();
    console.log("new user id:" + userID)
    console.log(GUEST_USERID)
  
    useEffect(() => {
      setUserID(Cookies.get('_id'));
    }, [userID]);

  const handleLogout = () => {
    Cookies.set('_id', GUEST_USERID);
    Cookies.set('userType', 1);
    // setUserID(null);
    navigate('/');
    alert('Log Out Successful')
    window.location.reload();
  };

  const handleReload = () => {

    window.location.reload();
  }

  return (
    <div className="App">
        <nav className="navbar sticky-top px-5 py-3">

          <div className="container-fluid">

            {/* <a className="navbar-brand" href={Link}>Titikman</a> */}
            <Link className="navbar-brand" to="/">Titikman</Link>

            <div className="search-bar w-50 me-5">
                <form className="d-flex" role="search">
                  <input className="form-control me-1" type="search" placeholder="Search" aria-label="Search"/>
                  <a className="btn btn-danger" href="searched.html"><img src={search} alt=""/></a>
                </form>
            </div>


            <span className="navbar-text" id="navbarText">
                <div className="btn-group">
                {userID === GUEST_USERID ? (
                <Link to="/signup">
                  <button type="button" className="btn btn-danger">
                    Sign In
                  </button>
                </Link>
              ) : (
                <>
                  <button type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  
                    {props.userName} <img src={user} alt="" id="user-pic" />
                    
                  </button>
                  <ul className="dropdown-menu">
                    <li><button onClick={handleReload} className="dropdown-item"><Link to={`/profile/${userID.slice(3, 27)}`}>See Profile</Link></button></li>
                    <li><button onClick={handleLogout} className="dropdown-item">Log Out</button></li>
                  </ul>
                </>
              )}
                  
                </div>
            </span>

          </div>

      </nav>
    </div>
  );
}

export default NavBar;
