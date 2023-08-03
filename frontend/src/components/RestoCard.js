
//restoid = mangagaleng ito sa param._id
import { useNavigate, Link } from 'react-router-dom';
import { useState } from "react";

const RestoCard = (props) => {
    const [restoId, setRestoId] = useState(props.restoId)

    return(
        <>
            <div className="col-md-4 mb-4">
                <div className="card">

                <Link to={`/resto/${restoId}`}><img src={props.restoImg} className="card-img-top" alt="Food Image 1"/></Link>
                <div className="card-body">

                    <div className='d-flex justify-content-between align-items-center'>

                    
                        <h5 className="card-title">{props.restoName}</h5>

                        <div className='d-flex align-items-center rating'>
                            <span className="fas fa-star checked mx-1"></span>
                            <span className="rating-number">{props.avgRating}</span>
                        </div>

                    </div>

                    <p>{props.description}</p>
                </div>
                </div>
            </div>
        
        </>
    );
}

export default RestoCard