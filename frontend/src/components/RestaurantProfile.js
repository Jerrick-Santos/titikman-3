const RestaurantProfile= (props) => {
    return(
        <>

        <div className="col-lg-6  p-2 estb-details">
         <div className="container-fluid">
            <div className="d-flex justify-content-between align-content-center name-rating mb-3">
               <h1 className="m-0 p-0">{props.restoName}</h1>
               <div className="rating d-flex justify-content-center align-content-center gap-2">
                  <div className="image-container">
                     <img src="assets/star.png" className="img-fluid mt-1" id="star-ave" alt=""/>
                  </div>
                  <div className='d-flex align-items-center rating'>
                            <span className="fas fa-star checked mx-1"></span>
                            <span className="rating-number">{props.avgRating}</span>
                        </div>
               </div>
            </div>
            <div id="resto-indicators" className="carousel slide mb-4">
            
            <div className="carousel-indicators">
                {props.assets.map((_, index) => (
                    <button
                    type="button"
                    data-bs-target="#resto-indicators"
                    data-bs-slide-to={index}
                    className={`${index === 0 ? 'active' : ''}`}
                    aria-current={index === 0 ? 'true' : 'false'}
                    aria-label={`Slide ${index + 1}`}
                    key={index}
                    ></button>
                ))}
                </div>
                <div className="carousel-inner">
                {props.assets.map((asset, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <img src={asset} className="d-block w-100" alt="..." />
                    </div>
                ))}
                </div>

               <button className="carousel-control-prev" type="button" data-bs-target="#resto-indicators" data-bs-slide="prev">
               <span className="carousel-control-prev-icon" aria-hidden="true"></span>
               <span className="visually-hidden">Previous</span>
               </button>
               <button className="carousel-control-next" type="button" data-bs-target="#resto-indicators" data-bs-slide="next">
               <span className="carousel-control-next-icon" aria-hidden="true"></span>
               <span className="visually-hidden">Next</span>
               </button>
            </div>


            <div className="container-fluid p-0 about mb-4">
               <p className="">
                     {props.description}
               </p>
            </div>


            <div className="container-fluid p-0 mb-4">
               <div className="row gx-2 gy-2">
                  <div className="col-md-4">
                     <div className="p-3 border bg-light">
                        <h4>Links</h4>
                        <a href={props.restoURL}>{props.restoName} Website</a>
                     </div>
                  </div>
                  <div className="col-md-4">
                     <div className="p-3 border bg-light">
                        <h4>Operating Hours</h4>
                        <p>{props.operatingHours}</p>
                     </div>
                  </div>
                  <div className="col-md-4">
                     <div className="p-3 border bg-light">
                        <h4>Contact Number</h4>
                        <p>{props.contactNum}</p>
                     </div>
                  </div>
               </div>
            </div>


            <div className="container-fluid h-auto">
               <h2>Menu</h2>

               
               <div id="menu-indicators" className="carousel slide mb-4">
                    <div className="carousel-indicators">
                        {props.menuImgs.map((_, index) => (
                        <button
                            type="button"
                            data-bs-target="#menu-indicators"
                            data-bs-slide-to={index}
                            className={`${index === 0 ? 'active' : ''}`}
                            aria-current={index === 0 ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                            key={index}
                        ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {props.menuImgs.map((menuImg, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                            <img src={menuImg} className="d-block w-100" alt="..." />
                        </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#menu-indicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#menu-indicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>



            </div>
         </div>
      </div>

        </>
    );
}

export default RestaurantProfile