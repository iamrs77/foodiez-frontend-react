import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../../styles/VendorNavbar.css'
import Cookies from 'universal-cookie';

function VendorNavbar(props) {
    let handleLogout = async (e) => {
        let cookies = new Cookies();
        cookies.remove('jwt', {path: '/'});
        props.history.push('/')
    }
    return (
        <div className='vendor__navbar'>
            <Link to='/home' >
            <div className="navbar__left">
                <img src={require('../../images/logo.jpg')} alt=""/>
            </div>
            </Link>
            <div className="navbar__right logout__button">
            <Link to='/' onClick={handleLogout} className='nav__btn'><span className='btn '>Logout</span></Link>
            </div>
        </div>
    )
}

export default withRouter(VendorNavbar)
