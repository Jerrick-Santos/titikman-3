import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react'
import axios from 'axios';



function EditReviewModal(props) {
    const [userRating, setUserRating] = useState(props.userRating);
    const [revContent, setRevContent] = useState(props.revContent);
    const [revTitle, setRevTitle] = useState(props.revTitle);
    const [image, setImage] = useState(null);


    
    const handleEdit = async (e) => {
  
        const formData = new FormData();
        formData.append('userRating', userRating);
        formData.append('revContent', revContent);
        formData.append('revTitle', revTitle);
        formData.append('image', image);
        formData.append('isEdited', true);
        
        
    
        
        try {
      
          const response = await axios.patch(
            `http://localhost:4000/api/review/${props.restoID}/${props.reviewID}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            });
      
          setUserRating('');
          setRevContent('');
          setRevTitle('')
          setImage(null);
          window.location.reload();
        } catch (error) {
          console.error('Error editing review:', error);
        }
      };

    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  return (
        <>
        <button type="button" className="btn btn-outline-secondary btn-sm me-2"  onClick={handleShow}> Edit </button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title> Edit a review </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                      <form 
                onSubmit={(e) => handleEdit(e, props.reviewID)} 
                id="review-form"
              >
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
                    onChange={(e) => setUserRating(e.target.value)}
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
                    onChange={(e) => setRevTitle(e.target.value)}
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
                    onChange={(e) => setRevContent(e.target.value)}
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
                    className="form-control"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                </div>
        
              </form>

                            </Modal.Body>
        <Modal.Footer>
            <button type="submit" disabled={!userRating || !revTitle || !revContent} onClick={handleEdit} className="btn btn-danger"> Submit </button>
            <button type="submit" onClick={handleClose} className="btn btn-secondary"> Close </button>
        </Modal.Footer>
        </Modal>
        </>
  );
}




export default EditReviewModal;

