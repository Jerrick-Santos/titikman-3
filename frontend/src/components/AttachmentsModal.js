import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react'




function AttachmentsModal(props) {

    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
        <>
        {props.filename !== "" && (
    <>
      <button type="button" onClick={handleShow} className="btn btn-outline-secondary btn-sm d-flex gap-2 mt-1 see attachments" style={{ marginLeft: '4px', marginRight: '15px' }} >
        See attachments </button>
    </>
  )}
        
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title> Attachments </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <img src={props.filename} alt="Attachment" style={{ maxWidth: '100%', maxHeight: '100%' }}/>
        </Modal.Body>
        <Modal.Footer>
            <button type="submit" onClick={handleClose} className="btn btn-secondary"> Close </button>
        </Modal.Footer>
        </Modal>
        </>
  );
}




export default AttachmentsModal;

