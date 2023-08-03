import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditUser from '../components/EditUser';
import Cookies from 'js-cookie';
import NavBar from '../components/NavBar';

const UserProfile = () => {
  if(Cookies.get('_id') !== '64bdf3eea4354c42f888ec3c'){
    var userID = Cookies.get('_id').slice(3,27)
  }
  else {
    var userID = Cookies.get('_id')
  }

  const [navFirstName, setNavFirstName] = useState('');

  useEffect(() => {
    
    axios.get(`http://localhost:4000/api/profile/${userID}`)
      .then((response) => {
        setNavFirstName(response.data.firstName)
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });

}, []);
  console.log("userID IS " + userID)
  const userType = useState(Cookies.get('userType')) 
  const [profileData, setProfileData] = useState({});
  const [reviewData, setReviewData] = useState([]);
  const { id } = useParams();
  

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [icon, setIcon] = useState('')
  const [bio, setBio] = useState('')


  useEffect(() => {
    // Fetch restaurant data
    axios.get(`http://localhost:4000/api/profile/${id}`)
      .then(response => {
        // Handle the successful response and update state variables
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setUserName(response.data.userName);
        setIcon(response.data.icon);
        setBio(response.data.bio);
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error fetching restaurant data:', error);
      });



    const getUserReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/reviewsbyuser/${id}`);
            const jsonData = response.data; // Access the data property of the response
        
            if (jsonData) {
              setReviewData(jsonData);
            }
          } catch (error) {
            console.error('Error fetching user reviews:', error);
          }
    }

    getUserReviews()

  }, []);

  const [updateProfile, setUpdateProfile] = useState(false);

  useEffect(() => {
    if (updateProfile) {
      axios
        .get(`http://localhost:4000/api/profile/${id}`)
        .then((response) => {
          // Handle the successful response and update state variables
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setUserName(response.data.userName);
          setIcon(response.data.icon);
          setBio(response.data.bio);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error fetching restaurant data:', error);
        });

      setUpdateProfile(false); // Reset the updateProfile state variable
    }
  }, [updateProfile]);

 


//   const fetchUserReviews = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/reviewsbyuser/${id}`);  // Replace with your backend API endpoint
//       if (response.ok) {
//         const data = await response.json();
//         setReviewData(data);
//         console.log(data)
//       }
//     } catch (error) {
//       console.error('Error fetching user reviews:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUserReviews();
//   }, []);

  // Handle edit profile submission
  const handleEditProfile = async (formData) => {
    try {
      const response = await fetch(`/api/profile/${profileData._id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        console.log(data)
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  // Handle review submission
  const handleCreateReview = async (formData) => {
    try {
      const response = await fetch(`/api/reviewnew/${profileData._id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setReviewData(data);
      }
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  return (
    <>
      <NavBar userIDcookies={userID} userName={navFirstName}/>
      <div className="container">
      <div className="row d-flex">
        <div className="col-lg-4 mb-4">
          <div className="container-fluid pt-2">
            <div className="row">
              <div className="col-sm-6">
                <div className="profile-container">
                  <div className="profile-icon">
                    <img src={icon}alt="Profile Picture" />
                  </div>

                  
                  <h3 className="profile-name">
                    {firstName} {lastName}
                  </h3>
                  <p style={{fontSize:"20px", marginTop:"0px"}}> username: {userName}</p>

                  <p>
                    {bio}
                  </p>
                  {/* ... */}

                  {userID===id && <EditUser bio={bio} userId={id} setUpdateProfile={setUpdateProfile} />}


                  <div className="modal fade" id="editprofile" tabIndex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      {/* ... */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8 pt-2 mb-4">
          <div className="cards-container px-lg-4" style={{ marginLeft:'120px' }}>
            <div className="row">
              {/* Display user reviews */}
              {reviewData.map((review) => (
                <div key={review._id} className="col-lg-4 col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{review.userRating}</h5>
                      <p className="card-text">{review.revContent}</p>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default UserProfile;