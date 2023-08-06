import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react'
import axios from 'axios';



function EditResponseModal(props) {
    const [responseContent, setResponseContent] = useState(props.responseContent);
    const [hasOwnerResponse, setOwnerResponse] = useState(true);
    

    


    
    const handleEdit = async (e) => {
  
        const formData = new FormData();
        formData.append('responseContent', responseContent);
        formData.append('hasOwnerResponse', hasOwnerResponse);
        formData.append('isResponseEdited', true)
      
    
        
        try {
      
          const response = await axios.patch(
            `http://localhost:4000/api/review/${props.restoID}/${props.reviewID}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            });
      
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
        <button type="button" className="btn btn-outline-secondary btn-sm me-2"  onClick={handleShow}> Edit </button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title> Edit a response</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <form id="editresponse-form" >
                     <label for="review" class="form-label">Edit Response:</label>
                     <textarea id="review" name="review" required class="form-control" 
                     value={responseContent} onChange={(e) => setResponseContent(e.target.value)}
                     ></textarea>
  
      
                  </form>
                            </Modal.Body>
        <Modal.Footer>
            <button type="submit" disabled={!responseContent} onClick={handleEdit} className="btn btn-danger"> Submit </button>
            <button type="submit" onClick={handleClose} className="btn btn-secondary"> Close </button>
        </Modal.Footer>
        </Modal>
        </>
  );
}




export default EditResponseModal;


 