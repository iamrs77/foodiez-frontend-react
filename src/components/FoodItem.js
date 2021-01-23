import React from 'react'
import '../styles/FoodItem.css';
import StarIcon from '@material-ui/icons/Star';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from 'react-router-dom';

function FoodItem({vendors}) {

    let vendorsList = vendors.map(vendor => {
        return (
            <div className="foodItem" key={vendor._id}>
                <div className="card__main">
                    <div className='card__image'>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/2560px-RedDot_Burger.jpg" alt=""/>
                    </div>
                    <div className="card__body">
                        <div className="card__title" title={vendor.name}>
                            {vendor.name}
                        </div>
                        <div className="card__desc">{vendor.foodType}</div>
                        <div className="card__desc location"><LocationOnIcon />{vendor.location}</div>
                        <div className='card__footer'>
                            <span className='rating'><StarIcon />{vendor.rating ? vendor.rating : 'NA'}</span> 
                            <span>.</span>
                            <span>{vendor.deliveryTime} mins</span>
                            <span>.</span>
                            <span> ₹ {vendor.minPrice} for Two</span>
                        </div>
                        <div className="menu__button">
                            <Link to={`/menu/${vendor._id}`} className="btn btn-sm btn-primary">View Menu</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="foods">{vendorsList}</div>
    )
}

export default FoodItem
