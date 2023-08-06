import { useState } from "react";

const UserReviewCard = (props) => {

    const [isExpanded, setExpanded] = useState(props.initiallyExpanded || false);

    const handleExpand = () => {
      setExpanded(!isExpanded);
    };
  
    return (

    <div className="card mb-4 d-flex">
          <div className="card-block" style={{marginTop: '18px', marginLeft: '7px', marginBottom: '20px'}}>
            <h5 className="card-title">{props.revTitle}</h5>
            <h6 className="card-subtitle text-muted mb-1">Rating: {props.userRating} </h6>
            <h6 className="card-subtitle text-muted">Restaurant: {props.restaurantName} </h6>
            <p className="card-text p-y-1">
              {isExpanded ? props.revContent : `${props.revContent.substring(0, 100)}`}
            </p>
          </div>
          {props.revContent.length > 100 && (
            <button
              style={{ marginLeft: '5px', marginTop: '-5px', marginBottom: '20px', width: '12%', fontSize: '12px' }}
              onClick={handleExpand}
              className="expand-link"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
    );
};

export default UserReviewCard;