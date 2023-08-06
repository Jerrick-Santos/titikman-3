import Banner from '../components/Banner'
import RestoCard from '../components/RestoCard'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SearchResto = () => {

    const { searchQuery } = useParams();

    const [restos, setRestos] = useState(null)
    const [firstName, setFirstName] = useState('');
    const [userID, setUserID] = useState('');
    

    useEffect(() => {
            
        console.log(searchQuery)
        axios.get(`http://localhost:4000/api/resto/search?name=${searchQuery}`)
        .then((response) => {
        setRestos(response.data)
        })
        .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
        });
    }, [])


    useEffect(() => {

        if(Cookies.get('_id') !== '64bdf3eea4354c42f888ec3c' && Cookies.get('_id') !== undefined){
            var userID = Cookies.get('_id').slice(3,27)
            setUserID(Cookies.get('_id').slice(3,27))
        }
        else if (Cookies.get('_id') !== undefined){
            var userID = Cookies.get('_id')
            setUserID(Cookies.get('_id'))
        }
        else{
            var userID = '64bdf3eea4354c42f888ec3c'
            setUserID('64bdf3eea4354c42f888ec3c')
            console.log(userID)
        }
            
        axios.get(`http://localhost:4000/api/profile/${userID}`)
            .then((response) => {
            setFirstName(response.data.firstName)
            })
            .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
            });

    }, []);




    return(
        <>
        <NavBar userIDcookies={userID} userName={firstName}/>
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

export default SearchResto;