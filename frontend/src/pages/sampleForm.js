import { useState } from 'react'
import axios from 'axios'

async function postImage({image, rating, revContent}) {
  const formData = new FormData();
  formData.append("filename", image)
  formData.append("userRating", rating)
  formData.append("revContent", revContent)

  const result = await axios.post('http://localhost:4000/api/reviewnew/64bb2189b7601ccb9fb65881', 
  formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}

const SampleForm = () => {
    const [file, setFile] = useState()
    const [rating, setRating] = useState()
    const [revContent, setRevContent] = useState()
  
    const submit = async event => {
      event.preventDefault()
      const result = await postImage({image: file, rating: rating, revContent: revContent})
    }
  
    const fileSelected = event => {
      const file = event.target.files[0]
      setFile(file)
    }


    return(
        <form id="review-form" onSubmit={submit}>

                      <img src='https://titikman.s3.amazonaws.com/d332f3d991dee690efd8f828559397c0'/>
                      <div className="mb-3">
                        <label htmlFor="rating" className="form-label">
                          Rating:
                        </label>


                        <select
                          id="rating"
                          name="rating"
                          required
                          className="form-select"
                          value={rating}
                          onChange={e => setRating(e.target.value)}
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
                        <label htmlFor="review" className="form-label">
                          Review:
                        </label>
                        <textarea
                          id="review"
                          name="review"
                          required
                          className="form-control"
                          value={revContent}
                          onChange={e => setRevContent(e.target.value)}
                        ></textarea>
                      </div>


                      <div className="mb-3">


                        <label htmlFor="media" className="form-label">
                          Upload Media:
                        </label>


                        <input
                          onChange={fileSelected}
                          type="file"
                          id="media"
                          name="image"
                          accept="image/*, video/*"
                          className="form-control"
                        />
                      </div>
                      <div>
                        <button type="submit" className="btn btn-danger">
                          Submit
                        </button>
                      </div>
                    </form>
    )
}

export default SampleForm;