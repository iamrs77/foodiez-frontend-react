import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../Home'
import '../../styles/vendorHome.css'

function VendorHome() {
    return (
        <div className='vendor__home'>
            <Home />
            <Link to='/restaurant-form' className='no__textDecoration'><button className='add__RestaurantBtn btn btn-info'> Add Restaurant </button></Link>
        </div>
    )
}

export default VendorHome
