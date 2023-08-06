
import img from '../assets/subway.jpg';
import jollibee from '../assets/jollibee.jpg';
import chicken from '../assets/24chicken.jpg';
import Banner from '../components/Banner'
import RestoCard from '../components/RestoCard'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import NavBar from '../components/NavBar';
import axios from 'axios';

const Home = () => {

    const [restos, setRestos] = useState(null)
    const userId = useState(Cookies.get('_id')) 
    const userType = useState(Cookies.get('userType')) 

    
var userID;

if (Cookies.get('_id') !== undefined && Cookies.get('_id') !== '64bdf3eea4354c42f888ec3c') {
    userID = Cookies.get('_id').slice(3, 27);
} else {
    userID = Cookies.get('_id');
}

  const [firstName, setFirstName] = useState('');
  
  useEffect(() => {
    
      axios.get(`http://localhost:4000/api/profile/${userID}`)
        .then((response) => {
          setFirstName(response.data.firstName)
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error fetching data:', error);
        });
  
  }, []);


    useEffect(() => {
        

        const fecthRestos = async () => {
            const response = await fetch('/api/restos')
            
            const json = await response.json()

            if(response.ok){
                setRestos(json)

            }

            
        }

        fecthRestos()
    }, [])


    return(
        <>
        <NavBar userIDcookies={userId} userName={firstName}/>
        <div className='Home'>
            <Banner />

            <div className="container-fluid mt-3">
                <div className='row'>
                    {restos && restos.map((resto) => (
                        <RestoCard restoId={resto._id} restoImg={resto.thumbnail} restoName={resto.restoName} description={resto.description} avgRating={resto.avgRating} />
                    ))}
                </div>

            </div>

        </div>
        
        </>



    );
    
}

export default Home;