import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react'
import axios from 'axios';



function ResponseModal(props) {
    const [responseContent, setResponseContent] = useState('');
    const [hasOwnerResponse, setOwnerResponse] = useState(true);
    

    


    
    const handleEdit = async (e) => {
  
        const formData = new FormData();
        formData.append('responseContent', responseContent);
        formData.append('hasOwnerResponse', hasOwnerResponse);
    
        
        try {
      
          const response = await axios.patch(
            `https://titikman.onrender.com/api/review/${props.restoID}/${props.reviewID}`, formData );
      
          setResponseContent('');
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
        <button
                    type="button"
                    className="btn btn-danger btn-sm d-flex gap-2 mt-1 respond"
                    onClick={handleShow}
                >
                    Respond
                </button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title> Write a response</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <form id="writeresponse-form" >
                     <label for="review" class="form-label">Write Response:</label>
                     <textarea id="review" name="review" required class="form-control" 
                     value={responseContent} onChange={(e) => setResponseContent(e.target.value)}
                     ></textarea>
  
      
                  </form>
                            </Modal.Body>
        <Modal.Footer>
            <button type="submit" onClick={handleEdit} disabled={!responseContent} className="btn btn-danger"> Submit </button>
            <button type="submit" onClick={handleClose} className="btn btn-secondary"> Close </button>
        </Modal.Footer>
        </Modal>
        </>
  );
}




export default ResponseModal;


