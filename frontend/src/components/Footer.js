import search from '../assets/search.png';
import user from '../assets/user.png';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Footer = () => {
    return (
        
        <div class="container px-1" id="footer">
        <footer class="row row-cols-3 py-2 my-2 border-top">
            <div class="col">
            <h2>
            Titikman
            </h2>
                
            <p class="text-muted">© 2023</p>
            <p>
            Welcome to Titikman, your ultimate destination for exploring and sharing culinary experiences! At Titikman, we believe that every meal tells a story, and we're here to help you discover, savor, and share those stories with the world.
            </p>
            </div>

            <div class="col">
            <h5>Frontend Packages</h5>
            <ul class="nav flex-column">
                <li class="nav-item mb-2">axios</li>
                <li class="nav-item mb-2">bootstrap-react</li>
                <li class="nav-item mb-2">js-cookie</li>
            </ul>
            </div>

            <div class="col">
            <h5>Backend Packages</h5>
            <ul class="nav flex-column">
                <li class="nav-item mb-2">aws-sdk</li>
                <li class="nav-item mb-2">cookie-parser</li>
                <li class="nav-item mb-2">cors</li>
                <li class="nav-item mb-2">dotenv</li>
                <li class="nav-item mb-2">express-session</li>
                <li class="nav-item mb-2">mongoose</li>
                <li class="nav-item mb-2">multer</li>
                <li class="nav-item mb-2">path</li>
                <li class="nav-item mb-2">bcrypt</li>
            </ul>
            </div>
        </footer>
        </div>
    )
}


export default Footer;
