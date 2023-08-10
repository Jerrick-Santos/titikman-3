import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import NavBar from '../src/components/NavBar';
import SignUpForm from './pages/SignUp'
import LoginForm from './pages/LogIn';
import UserProfile from './pages/UserProfile';
import RestaurantPage from './pages/RestaurantPage';

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import SearchResto from './pages/SearchResto';
import Footer from './components/Footer';

function App(){
    return(
        <>
            <BrowserRouter>
                {/* <NavBar/>   */}
                <Routes>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/" element={<Home/>} />
                    <Route path="/signup" element={<SignUpForm/>} />
                    <Route path="/profile/:id" element={<UserProfile/>} />
                    <Route path="/resto/:id" element={<RestaurantPage/>} />
                    <Route path="/resto/search/:searchQuery" element={<SearchResto/>} />
                </Routes>
            </BrowserRouter>

            <Footer/>
        </>
    )
}

export default App;