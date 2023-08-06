import React, { useState, useEffect } from 'react';
import RestaurantProfile from '../components/RestaurantProfile';
import ReviewCard from '../components/ReviewCard';



import pfp from '../assets/user1.png';
import search from '../assets/search.png';
import filter from '../assets/filter.png';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Cookies from 'js-cookie';



const RestaurantPage = () => {
//Determine userType
const { id } = useParams();
var restoID = id

if(Cookies.get('_id') !== '64bdf3eea4354c42f888ec3c'){
  var userID = Cookies.get('_id').slice(3,27)
  //console.log("GUDS")
}
else {
  var userID = Cookies.get('_id')
}
const [firstName, setFirstName] = useState('');

useEffect(() => {
  
    axios.get(`http://localhost:4000/api/profile/${userID}`)
      .then((response) => {
        setFirstName(response.data.firstName)
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });

}, []);




//var userID = Cookies.get('_id') // Fredie Argie
//var userID = '64bcc185c87283efcb0b9d59' //Jollibee Owner
//var userID = '64bdf3eea4354c42f888ec3c' //Guest








  const [loading, setLoading] = useState(true);
  

  // State variables for fetched data
  const [currRestoName, setCurrRestoName] = useState('');
  const [currAvgRating, setCurrAvgRating] = useState(0);
  const [currAssets, setCurrAssets] = useState([]);
  const [currDescription, setCurrDescription] = useState('');
  const [currMenuImgs, setCurrMenuImgs] = useState([]);
  const [currRestoURL, setCurrRestoURL] = useState('');
  const [currOperatingHours, setCurrOperatingHours] = useState('');
  const [currContactNum, setCurrContactNum] = useState('');
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]); // State variable to store all reviews
 

  const [userType, setUserType] = useState(0);

  

  useEffect(() => {
    // Fetch restaurant data
    axios.get(`http://localhost:4000/api/resto/${restoID}`)
      .then(restoResponse => {
        // Handle the successful response and update state variables
        setCurrRestoName(restoResponse.data.restoName);
        //setCurrAvgRating(restoResponse.data.avgRating);
        setCurrAssets(restoResponse.data.assets);
        setCurrDescription(restoResponse.data.description);
        setCurrMenuImgs(restoResponse.data.menuImgs);
        setCurrRestoURL(restoResponse.data.restoUrl);
        setCurrOperatingHours(restoResponse.data.operatingHours);
        setCurrContactNum(restoResponse.data.contactNum);
        var ownerPic
        axios.get(`http://localhost:4000/api/profile/${restoResponse.data.owner}`).then(ownerResponse =>{
          ownerPic = ownerResponse.data.icon
          console.log(ownerPic)
        }).catch(error => {
          // Handle any errors that occurred during fetching user type
          console.error('Error fetching owner data:', error);
        });
        
        
        updateAverage();
        setLoading(false);
        
  
        // Fetch user type for the logged-in user
        axios.get(`http://localhost:4000/api/profile/${userID}`)
          .then(userResponse => {
            const userTypeFromServer = userResponse.data.userType;
            setUserType(userTypeFromServer)
           
            //console.log('llll  ' + userTypeFromServer)
  
            // Fetch user information for each review and update filteredReviews
            Promise.all(
              restoResponse.data.reviews.map(review => axios.get(`http://localhost:4000/api/profile/${review.user}`))
            )
              .then(userResponses => {
                const updatedReviews = restoResponse.data.reviews.map((review, index) => {
                  const userData = userResponses[index].data;
                  
  
                  // Check if the review user matches the logged-in user (userID)
                  let reviewUserType = 1;
                  if (userTypeFromServer === 2) {
                    if (review.user === userID) {
                      reviewUserType = 2;
                    } else {
                      reviewUserType = 3;
                    }
                  }
  
                  // If the userID matches the restaurant owner, set userType to 4
                  if (userID === restoResponse.data.owner) {
                    reviewUserType = 4;
                  }

            
  
                  // Update the review object with the correct reviewID
                  const updatedReview = {
                    ...review,
                    reviewID: review._id // Add the reviewID to the review object
                  };
                  
                  // Return the ReviewCard component with updated properties
                  return (
                    <ReviewCard
                      // Accessing properties using dot notation
                      // ...
                      currentUser={userID}
                      userID={userData._id}
                      username={userData.userName}
                      userProfilePic={userData.icon || pfp}
                      datePosted={review.datePosted}
                      userRating={review.userRating}
                      revContent={review.revContent}
                      revTitle={review.revTitle}
                      filename={review.filename}
                      likes={review.likes}
                      dislikes={review.dislikes}
                      hasOwnerResponse={review.hasOwnerResponse}
                      ownerProfilePic={ownerPic || pfp}
                      responseDatePosted={review.responseDatePosted}
                      responseContent={review.responseContent}
                      userType={reviewUserType} // Use the updated userType for the review
                      reviewID={review._id} // Use the correct reviewID from the updatedReview object
                      restoID={restoID}
                      key={review._id}
                      dislikedUsers={review.dislikedUsers}
                      likedUsers={review.likedUsers}
                      isEdited={review.isEdited}
                      isResponseEdited={review.isResponseEdited}

                      
                      // ...
                    />
                  );
                });
                setAllReviews(updatedReviews);
                setFilteredReviews(updatedReviews);
                //calculateAverage();
              })
              .catch(error => {
                // Handle any errors that occurred during fetching user information
                setLoading(false);
              });
          })
          .catch(error => {
            // Handle any errors that occurred during fetching user type
            setLoading(false);
            console.error('Error fetching user type:', error);
          });
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        setLoading(false);
        console.error('Error fetching restaurant data:', error);
      });
  }, [restoID, userID]);

  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [newReview, setNewReview] = useState(null);

  useEffect(() => {
    handleSearchAndFilter(searchTerm, filterOption);
  }, [searchTerm, filterOption]);

  useEffect(() => {
    if (newReview) {
      setFilteredReviews((prevReviews) => {
        const updatedReviews = [...prevReviews];
        updatedReviews.push(newReview);
        return updatedReviews;
      });
    }
  }, [newReview]);

  const handleSearchAndFilter = (searchTerm, filterOption) => {
    let filtered = [...allReviews];
  
    if (searchTerm) {
      filtered = filtered.filter(
        (review) =>
          (review.props.username &&
            review.props.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (review.props.revContent &&
            review.props.revContent.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (review.props.revTitle &&
            review.props.revTitle.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
  
    if (filterOption === 'helpfulness') {
      filtered.sort((a, b) => b.props.likes - a.props.likes);
    } else if (filterOption === 'rating') {
      filtered.sort((a, b) => b.props.userRating - a.props.userRating);
    } else if (filterOption === 'recent') {
      filtered.sort((a, b) => new Date(b.props.datePosted) - new Date(a.props.datePosted));
    }
  
    setFilteredReviews(filtered);
  };

  const [userRating, setUserRating] = useState('');
  const [revContent, setRevContent] = useState('');
  const [revTitle, setRevTitle] = useState('');
  const [filename, setFilename] = useState('');
  
  const handleUserRatingChange = (e) => {
    setUserRating(e.target.value);
  };

  const handleRevContentChange = (e) => {
    setRevContent(e.target.value);
  };

  const handleRevTitleChange = (e) => {
    setRevTitle(e.target.value);
  };
  
  const updateAverage = async () => {
    try {
      const restoResponse = await axios.get(`http://localhost:4000/api/resto/${restoID}`);
      const reviewPromises = restoResponse.data.reviews.map(review => axios.get(`http://localhost:4000/api/profile/${review.user}`));
      
      
      const userResponses = await Promise.all(reviewPromises);
      var totalRating = 0;
      var numReviews = 0;
      
  
      for (const review of restoResponse.data.reviews) {
        console.log('Review User Rating:', review.userRating);
        totalRating += review.userRating;
        numReviews += 1;
        //console.log("total" + totalRating)
      //console.log("numRev" + numReviews)
      }
  
      const averageRating = (totalRating / numReviews).toFixed(1);
      //console.log("AVERAGE" + averageRating)
      setCurrAvgRating(averageRating)
      // Update the restaurant's average rating using PATCH request
      const requestData = {
        avgRating: parseFloat(averageRating),
      };
  
      try {
        await axios.patch(`http://localhost:4000/api/resto/${restoID}`, requestData);
        console.log('Average rating updated');
      } catch (error) {
        console.error('Error updating average:', error);
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userRating', userRating);
    formData.append('revContent', revContent);
    formData.append('revTitle', revTitle)
    formData.append('image', filename);
    
  
    try {
      const response = await axios.post(`http://localhost:4000/api/reviewnew/${restoID}/${userID}`, formData);
  
      setUserRating('');
      setRevContent('');
      setRevTitle('');
      setFilename('');
      setSearchTerm('');
      setFilterOption('');
      
      document.getElementById('review-form').reset();
      window.location.reload()
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };
  
 

  return (
    <>
    <NavBar userIDcookies={userID} userName={firstName}/>
    {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="RestaurantPage">
        <div className="container-fluid main-content px-5 py-3">
          <div className="row gx-3 gy-3">
            <RestaurantProfile
              restoName={currRestoName}
              avgRating={currAvgRating}
              assets={currAssets}
              description={currDescription}
              menuImgs={currMenuImgs}
              restoURL={currRestoURL}
              operatingHours={currOperatingHours}
              contactNum={currContactNum}
            />

            <div className="col-lg-6 p-2">
              <div className="container-fluid">
                <h1 className="mb-3">Reviews</h1>

                <div className="row d-flex">
                  {((userType !== 3) && (userType !== 1) ) && (
                    <button
                    type="submit"
                    className="btn btn-danger btn-lg btn-block mb-3"
                    style={{
                      width: '18%',
                      height: '40px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#review"
                  >
                    Write
                  </button>
                  
                  )}

<div className="modal" id="review">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="review-section">
        <div className="container my-5">
          <div className="review-section">
            <h2>Write a Review</h2>
            <form onSubmit={handleSubmit} id="review-form">
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                  Rating:
                </label>
                <select
                  id="rating"
                  name="rating"
                  required
                  className="form-select"
                  value={userRating}
                  onChange={handleUserRatingChange}
                >
                  <option value="">Select a rating</option>
                  <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
                  <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
                  <option value="3">&#9733;&#9733;&#9733;</option>
                  <option value="2">&#9733;&#9733;</option>
                  <option value="1">&#9733;</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="reviewtitle" className="form-label">
                  Title:
                </label>
                <textarea
                  id="reviewtitle"
                  name="reviewtitle"
                  required
                  className="form-control"
                  value={revTitle}
                  onChange={handleRevTitleChange}
                ></textarea>
                <label htmlFor="review" className="form-label">
                  Review:
                </label>
                <textarea
                  id="review"
                  name="review"
                  required
                  className="form-control"
                  value={revContent}
                  onChange={handleRevContentChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="media" className="form-label">
                  Upload Media:
                </label>
                <input
                  type="file"
                  id="media"
                  name="media"
                  accept="image/*, video/*"
                  onChange={(e) => setFilename(e.target.files[0])}
                />
              </div>
              <div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-danger"
                  disabled={!userRating || !revTitle || !revContent}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

                
                  <div className="mb-3" style={{ width: '60%' }}>
                                  <input
                                    type="search"
                                    className="form-control"
                                    id="searchInput"
                                    placeholder="Search for a review"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                  />
                                </div>
                  
                  
                  <div className="dropdown" style={{ width: '12%', height:'36px'}}> 
                    <button
                      className="btn btn-danger btn-lg btn-block mb-3 d-flex align-items-center justify-content-center"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ width: '100%', height:'40px'}}
                    >
                      <img
                        className="img-fluid"
                        src={filter}
                        alt="Filter"
                        style={{ height: '30px', width: '20px' }}
                      />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => setFilterOption('helpfulness')}
                        >
                          Sort by Helpfulness
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => setFilterOption('rating')}
                        >
                          Sort by Rating
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => setFilterOption('recent')}
                        >
                          Sort by Most Recent
                        </a>
                      </li>
                    </ul>
                  </div>


                </div>

                {filteredReviews}
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      
    </>
  );
};


export default RestaurantPage;