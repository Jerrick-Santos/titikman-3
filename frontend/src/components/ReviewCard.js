import React, { useState, useEffect} from 'react';


import sad from '../assets/sad.png';
import happy from '../assets/happy.png';

import axios from 'axios';
import EditReviewModal from './EditReviewModal';
import AttachmentsModal from './AttachmentsModal';
import ResponseModal from './ResponseModal';
import EditResponseModal from './EditResponseModal';
import {Link } from 'react-router-dom';



const ReviewCard = (props) => {
  const [reviewID, setReviewID] = useState('');
  useEffect(() => {
    setReviewID(props.reviewID);
  }, [props.reviewID]);

  var likedUsers = props.likedUsers;
  var dislikedUsers = props.dislikedUsers;
  var userID = props.userID
  var datePosted = (props.datePosted).slice(0, 10);
  if (props.responseDatePosted){
  var responseDatePosted = (props.responseDatePosted).slice(0, 10);
  }
  else{
  var responseDatePosted = (props.responseDatePosted)
  }

  
  const handleDelete = async () => {
    try {
      // Make an API call to delete the review from the database using the reviewID

      console.log('del 1  ' + props.reviewID);
      await axios.delete(`http://localhost:4000/api/review/${props.restoID}/${props.reviewID}`);
      console.log('del 2 ' + props.reviewID);
      // If the deletion is successful, you can trigger a callback to remove the review from the parent component's state.
     window.location.reload();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  
  const deleteResponse = async (e) => {
    
    const requestData = {
      hasOwnerResponse: false,
    };

    try {
      const response = await axios.patch(`http://localhost:4000/api/review/${props.restoID}/${props.reviewID}`, requestData);
      window.location.reload();
    } catch (error) {
      console.error('Error editing review:', error);
    }
  };

  const [likes, setLikes] = useState(props.likes);
  const [dislikes, setDislikes] = useState(props.dislikes);

  function removeElementFromArray(arr, element) {
    const index = arr.indexOf(element);
    if (index !== -1) {
      arr.splice(index, 1);
      return true;
    }
    return false;
  }

  const handleLike = async () => {
     // If user hasn't disliked, add 1 to dislikes
     if (!likedUsers.includes(props.currentUser)){
      setLikes((prevLikes) => prevLikes + 1);
      likedUsers.push(props.currentUser);
      // Update the dislike status in the database using the API call
      await updateLikesInDB(likes + 1, dislikes, likedUsers, dislikedUsers);
    }
      // If user has liked before, subtract 1 from likes
    else {
        setLikes((prevLikes) => prevLikes - 1);
        removeElementFromArray(likedUsers,props.currentUser)
        await updateLikesInDB(likes - 1, dislikes, likedUsers, dislikedUsers);
      }
  };

  const handleDislike = async () => {
    
      // If user hasn't disliked, add 1 to dislikes
    if (!dislikedUsers.includes(props.currentUser)){
      setDislikes((prevDislikes) => prevDislikes + 1);
      dislikedUsers.push(props.currentUser);
      // Update the dislike status in the database using the API call
      await updateLikesInDB(likes, dislikes + 1, likedUsers, dislikedUsers);
    }
      // If user has liked before, subtract 1 from likes
    else {
        setDislikes((prevDislikes) => prevDislikes - 1);
        removeElementFromArray(dislikedUsers,props.currentUser)
        await updateLikesInDB(likes, dislikes - 1, likedUsers, dislikedUsers);
      }
      
    
  };

  const updateLikesInDB = async (likes, dislikes, likedUsers, dislikedUsers) => {
    try {
      // Make an API call to update the like and dislike counts in the database
      // with the new values (likes and dislikes).
      // Replace the following URL and request data with your actual API endpoint and data structure.
      await axios.patch(
        `http://localhost:4000/api/review/${props.restoID}/${props.reviewID}`,
        {
          likes: likes,
          dislikes: dislikes,
          likedUsers: likedUsers,
          dislikedUsers: dislikedUsers

        }
      );
    } catch (error) {
      console.error('Error updating like/dislike:', error);
    }
  };

  const [isExpanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!isExpanded);
  };

  return (

    <div className="container-fluid review-content p-3 bg-light mb-2">
      <div className="user-details row">

        
                    {props.userType===2 && (
                <div className="col-md-12">
                    <div className="d-flex justify-content-end">
                    

                    <EditReviewModal restoID={props.restoID} reviewID={props.reviewID} userRating={props.userRating}
                                    revContent={props.revContent} revTitle={props.revTitle}/>

                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
                        Delete
                    </button>

                    </div>
                </div>
                )}

       
        
        
        {/* REVIEW CARD */}
        <div className="col-md-6">
          <div className="d-flex">
            
            <div className="user-pfp me-2">
            <Link to={`/profile/${userID}`}>
                <img
                    src={props.userProfilePic}
                    alt=""
                    style={{ borderRadius: '50%', width: '70px', height: '70px' }}
                />
                </Link>
                </div>

            
            <div className="user-content flex-column align-content-center mt-1">
                <p style={{ marginBottom: '3px', fontSize:'20px' }}>{props.username}</p>
                <p>{datePosted}</p>
                </div>

          </div>
        </div>
        <div className="col-md-6">
          <div className="rating d-flex justify-content-md-end align-content-center gap-2">
          {props.isEdited && (
            <p className="mt-2" style={{ marginTop: "10px", color: "darkgrey", marginRight: "15px" }}>
              Edited
            </p>
          )}

          
            <p className="mt-2">  {props.userRating} </p>
            <span className="fas fa-star checked mx-1" style={{marginTop:"12px"}}></span>
          </div>
        </div>
        
        <div className="col-md-12 my-3" id="text-content">
        <p className="text-content mb-1" style={{fontSize:"25px"}}>
    <strong> {props.revTitle}</strong>
  </p>
  <p className="text-content mb-1">
    {isExpanded || props.revContent.length <= 100 ? props.revContent : `${props.revContent.substring(0, 100)}...`}
  </p>
</div>
    {props.revContent.length > 100 && (
            <button style={{marginLeft:'10px', width:'10%', fontSize:'12px'}} onClick={handleExpand} className="expand-link">
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
    
                    <div className="d-flex mt-3">
                <img src={happy} alt="" />
                {likedUsers.includes(props.currentUser) ? (
        <button
          type="button"
          className="btn btn-success btn-sm d-flex gap-2 mt-1 sad liked"
          style={{ marginLeft: '4px', marginRight: '15px' }}
          disabled={props.userType === 1 || props.userType === 2 || props.userType === 4 || dislikedUsers.includes(props.currentUser)}
          onClick={handleLike}
        >
          {likes}
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-outline-success btn-sm d-flex gap-2 mt-1 sad unliked"
          style={{ marginLeft: '4px', marginRight: '15px' }}
          disabled={props.userType === 1 || props.userType === 2 || props.userType === 4 || dislikedUsers.includes(props.currentUser) }
          onClick={handleLike}
        >
          {likes}
        </button>
      )}

      <img src={sad} alt="" />
      {dislikedUsers.includes(props.currentUser) ? (
        <button
          type="button"
          className="btn btn-danger btn-sm d-flex gap-2 mt-1 sad liked"
          style={{ marginLeft: '4px', marginRight: '15px' }}
          disabled={props.userType === 1 || props.userType === 2 || props.userType === 4 || likedUsers.includes(props.currentUser)}
          onClick={handleDislike}
        >
          {dislikes}
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-outline-danger btn-sm d-flex gap-2 mt-1 sad unliked"
          style={{ marginLeft: '4px', marginRight: '15px' }}
          disabled={props.userType === 1 || props.userType === 2 || props.userType === 4 || likedUsers.includes(props.currentUser) }
          onClick={handleDislike}
        >
          {dislikes}
        </button>
      )}

                
                <AttachmentsModal filename={props.filename}/>
      
                    {props.userType===4 && props.hasOwnerResponse===false && (
                <div className="d-flex justify-content-end">
                <ResponseModal restoID={props.restoID} reviewID={props.reviewID}/>
         
                </div>
                )}


        
        
                

                </div>

      </div>

     {/* OWNER RESPONSE */}
     {props.hasOwnerResponse && (
                <div className="d-flex">
                <div
                  className="container"
                  style={{
                      marginTop: '10px',
                    marginRight: '10px',
                    backgroundColor: '#DC3545',
                    width: '5%',
                  }}
                ></div>
                
                
                    

                <div className="container-fluid review-content p-3 bg-light mb-2">
                {props.isResponseEdited && (
                  <div className="d-flex justify-content-end"> 
                          <p className="mt-2" style={{  color: "darkgrey", marginLeft: "20px" }}>
                            Edited
                          </p>
                          </div>
                        )}
                  <div className="col-md-12">
                  

                  {props.userType===4 && (
                        <div className="d-flex justify-content-end ">
                        <EditResponseModal restoID={props.restoID} reviewID={props.reviewID} responseContent={props.responseContent}/>
                  
                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={deleteResponse}>
                        Delete
                        </button>
                    </div>
                )}
                
                    


                  </div>
                
              
                  <div className="user-details row">
                    <div className="col-md-6">
                      <div className="d-flex">
                        
                        <div className="user-pfp me-2">
                            <img
                                src={props.ownerProfilePic}
                                alt=""
                                style={{ borderRadius: '50%', width: '70px', height: '70px' }}
                            />
                            </div>
                    
                        <div className="user-content flex-column align-content-center mt-1">
                          <p style={{ marginBottom: '3px', fontSize:'20px' }}>Owner's Response</p>
                          <p>{responseDatePosted}</p>
                          
                        </div>
                        
                      </div>
                      
                    </div>
                    
                    <div className="col-md-12 my-3" id="text-content">
                      <p className="text-content mb-1">
                        {props.responseContent}
                      </p>
                      

                    </div>
                  </div>


                  
                </div>
              </div>

                )}
    </div>
  );
};

export default ReviewCard;