import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function EditUser(props) {
  const [show, setShow] = useState(false);
  const [bio, setBio] = useState(props.bio);
  //console.log("BIO" + props.bio)
  const [image, setImage] = useState(null);

  const userId = props.userId
  console.log(userId)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {

    try {
      const formData = new FormData();
      formData.append('bio', bio);
      formData.append('image', image);

      // Send the updated data to the backend
      const response = await axios.patch(`https://titikman.onrender.com/api/profile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response (you can add further logic if needed)
      console.log('Profile updated:', response.data);

      // Close the modal after successful submission
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
        <button
                    type="button"
                    className="btn btn-danger edit-profile-btn"
                    // data-bs-toggle="modal"
                    // data-bs-target="#editprofile"
                    onClick={handleShow}
                  >
                    Edit Profile
        </button>

        <Modal show={show} onHide={handleClose}>
        {/* ... (modal content) */}
        <Modal.Body>
          Update User Info
          <form className="editmodal">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Bio
              </label>
              <textarea
                 id="bio"
                 name="bio"
                 required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="form-control"
              >
              
              </textarea>
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
          <button onClick={handleClose} className="btn btn-light">
            Close
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUser;