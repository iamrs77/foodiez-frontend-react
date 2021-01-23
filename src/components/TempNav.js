import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/TempNav.css';

function TempNav() {
    return (
        <nav>
            <h1>Foodiez</h1>
            <ul>
                <li><Link to='/' className='btn'>Login</Link></li>
                <li><Link to='/register' className="btn register">Register</Link></li>
            </ul>
        </nav>
    )
}

export default TempNav
