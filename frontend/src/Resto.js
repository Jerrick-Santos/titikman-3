import jb1 from './assets/jollibee/jb1.jpg'
import jb2 from './assets/jollibee/jb2.jpg'
import jb3 from './assets/jollibee/jb3.jpg'
import jbMenu1 from './assets/jollibee/jb-menu-1.jpg'
import jbMenu2 from './assets/jollibee/jb-menu-2.jpg'
import star from './assets/star.png'

import user from './assets/user.png';
import happy from './assets/happy.png';
import sad from './assets/sad.png';

const RestoAbout = (props) => {
    return (
        <div className="col-lg-6 p-2 estb-details">

         <div className="container-fluid">

            <div className="d-flex justify-content-between align-content-center name-rating mb-3">

               <h1 className="m-0 p-0">{props.restoName}</h1>

               <div className="rating d-flex justify-content-center align-content-center gap-2">
                  <div className="image-container">
                     <img src={star} className="img-fluid mt-1" id="star-ave" alt=""/>
                  </div>
                  <p className="display-6">{props.avgRating}</p>
               </div>


            </div>


            <div id="resto-indicators" className="carousel slide mb-4">
               <div className="carousel-indicators">
                  <button type="button" data-bs-target="#resto-indicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#resto-indicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#resto-indicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
               </div>
               <div className="carousel-inner">
                  <div className="carousel-item active">
                     <img src={props.asset1} className="d-block w-100" alt="..."/>
                  </div>
                  <div className="carousel-item">
                     <img src={props.asset2} className="d-block w-100" alt="..."/>
                  </div>
                  <div className="carousel-item">
                     <img src={props.asset3} className="d-block w-100" alt="..."/>
                  </div>
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
                        <a href={props.restoUrl}>{props.restoName} Website</a>
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
                     <button type="button" data-bs-target="#menu-indicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                     <button type="button" data-bs-target="#menu-indicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  </div>
                  <div className="carousel-inner">
                     <div className="carousel-item active">
                        <img src={props.menuImg1} className="d-block w-100" alt="..."/>
                     </div>
                     <div className="carousel-item">
                        <img src={props.menuImg2} className="d-block w-100" alt="..."/>
                     </div>
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
    );
}


const ReviewCard = (props) => {
    return(
        <>
            <div class="container-fluid review-content p-3 bg-light mb-2">

               <div class="user-details row">
                  <div class="col-md-12">
                     <div class="d-flex justify-content-end ">
                        <button type="button" class="btn btn-outline-secondary btn-sm me-2" data-bs-toggle="modal" data-bs-target="#editreview">Edit</button>
                        <button type="button" class="btn btn-outline-danger btn-sm">Delete</button>
                     </div>
                  </div>

                  <div class="modal" id="editreview">
                     <div class="modal-dialog">
                        <div class="modal-content">
                           <div class="review-section">
                              <div class="container my-5">
                                 <div class="review-section">
                                    <h2>Edit Review</h2>
                                    <form id="review-form">
                                       <div class="mb-3">
                                          <label for="rating" class="form-label">Rating:</label>
                                          <select id="rating" name="rating" required class="form-select">
                                             <option value="">Select a rating</option>
                                             <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
                                             <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
                                             <option value="3">&#9733;&#9733;&#9733;</option>
                                             <option value="2">&#9733;&#9733;</option>
                                             <option value="1">&#9733;</option>
                                          </select>
                                       </div>
                                       <div class="mb-3">
                                          <label for="review" class="form-label">Review:</label>
                                          <textarea id="review" name="review" required class="form-control"></textarea>
                                       </div>
                                       <div class="mb-3">
                                          <label for="media" class="form-label">Upload Media:</label>
                                          <input type="file" id="media" name="media" accept="image/*, video/*" class="form-control"/>
                                       </div>
                                       <div>
                                          <button type="submit" class="btn btn-danger">Submit</button>
                                       </div>
                                    </form>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>



                  <div class="col-md-6">
                     <div class="d-flex">
                        <a href="Fredie.html">
                           <div class="user-pfp me-2">
                              <img src={user} alt=''/>
                           </div>
                        </a>
                        <div class="user-content flex-column align-content-center mt-1">
                           <p>{props.username}</p>
                           <p>{props.datePosted}</p>
                        </div>
                     </div>
                  </div>
                  <div class="col-md-6">
                     <div class="rating d-flex justify-content-md-end align-content-center gap-2">
                        <img src={star} class="mt-2" id="star" alt=""/>
                        <p class="mt-2">5</p>
                     </div>
                  </div>
                  <div class="col-md-12 my-3" id="text-content">
                     <p class="text-content mb-1">{props.reviewContent}</p>
                     {/* <a class="expand-link">Read More</a> */}
                     <div class="d-flex mt-3">
                        <img src={happy} alt=""/>
                        <button type="button" class="btn btn-outline-success btn-sm d-flex gap-2 mt-1 happy unliked">
                        {props.likes}
                        </button>
                        <img src={sad} alt=""/>
                        <button type="button" class="btn btn-outline-danger btn-sm d-flex gap-2 mt-1 sad unliked">
                        {props.dislikes}</button>
                     </div>
                  </div>
               </div>


            </div>
        </>
    );
}

const RestoReview = () => {
   return(
      <>
         <div class="col-lg-6  p-2">

         <div class="container-fluid">

            <h1 class="mb-3">Reviews</h1>

            <div class="row d-flex">
               
                 <button type="submit" class="btn btn-danger btn-lg btn-block mb-3" style="width:74%" data-bs-toggle="modal" data-bs-target="#review"> Write a Review </button>
                 {/* <!-- WRITE A REVIEW MODAL --> */}
                 <div class="modal" id="review">
                   <div class="modal-dialog">
                     <div class="modal-content">
                       <div class="review-section">
                         <div class="container my-5">
                           <div class="review-section">
                             <h2>Write a Review</h2>
                             <form id="review-form">
                               <div class="mb-3">
                                 <label for="rating" class="form-label">Rating:</label>
                                 <select id="rating" name="rating" required class="form-select">
                                   <option value="">Select a rating</option>
                                   <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
                                   <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
                                   <option value="3">&#9733;&#9733;&#9733;</option>
                                   <option value="2">&#9733;&#9733;</option>
                                   <option value="1">&#9733;</option>
                                 </select>
                               </div>
                               <div class="mb-3">
                                 <label for="review" class="form-label">Review:</label>
                                 <textarea id="review" name="review" required class="form-control"></textarea>
                               </div>
                               <div class="mb-3">
                                 <label for="media" class="form-label">Upload Media:</label>
                                 <input type="file" id="media" name="media" accept="image/*, video/*" class="form-control"/>
                               </div>
                               <div>
                                 <button type="submit" class="btn btn-danger">Submit</button>
                               </div>
                             </form>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               
             
               {/* <!-- FILTER FEATURE --> */}
                 <div class="dropdown" style="width:12%">
                  <button class="btn btn-danger btn-lg btn-block mb-3" data-bs-toggle="dropdown" aria-expanded="false">
                    <img class="img-fluid" src="assets/filter.png" style="height:25px"/>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Filter by Helpfulness</a></li>
                    <li><a class="dropdown-item" href="#">Filter by Rating</a></li>
                    <li><a class="dropdown-item" href="#">Filter by Most Recent</a></li>
                  </ul>
                </div>
                
             
             
                {/* <!-- SEARCH FEATURE --> */}
                 <button type="submit" class="btn btn-danger btn-lg btn-block mb-3" style="width:12%;" data-bs-toggle="modal" data-bs-target="#search"> 
                   <img src="assets/search.png"/> 
                 </button>
             
                 {/* <!-- SEARCH MODAL --> */}
                 <div class="modal" id="search" tabindex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
                   <div class="modal-dialog">
                     <div class="modal-content">
                       <div class="modal-header">
                         <h5 class="modal-title" id="searchModalLabel">Search for a Review</h5>
                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                       </div>
                       <div class="modal-body">
                         <form>
                           <div class="mb-3">
                             <input type="text" class="form-control" id="searchInput" placeholder="Search for a review"/>
                           </div>
                           <div class="text-center">
                             <button type="submit" class="btn btn-danger">Search</button>
                           </div>
                         </form>
                       </div>
                     </div>
                   </div>
                 </div>


               </div>
             
         </div>

         </div>
      </>
   );
}


const Resto = () => {
    return(
        <>
            <div className="container-fluid main-content px-5 py-3">

                <div class="row gx-3 gy-3">
                    <RestoAbout 
                    restoName="Jollibee" 
                    avgRating={3}  
                    asset1={jb1}
                    asset2={jb2}
                    asset3={jb3}
                    description="Jollibee is the flagship brand of Jollibee Foods Corporation, the largest and fastest-growing Asian restaurant company in the world. With 70 stores in North America, 1300 stores across the globe, and many more yet to come, our mission is to spread the joy of eating."
                    restoUrl="https://www.jollibee.com.ph/"
                    operatingHours="24/7 Mon - Sun"
                    contactNum="8-7000"
                    menuImg1={jbMenu1}
                    menuImg2={jbMenu2}
                    />

                </div>


            </div>
        </>
    );
}

export default Resto;