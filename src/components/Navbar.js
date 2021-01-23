import React from 'react';
import '../styles/Navbar.css';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { Badge } from '@material-ui/core';


function Navbar(props) {
    
    let handleLogout = async (e) => {
        let cookies = new Cookies();
        cookies.remove('jwt', {path: '/'});
        props.history.push('/login')
    }

    return (
        <div className='navbar'>
            <Link to='/home' >
            <div className="navbar__left">
                <img src={require('../images/logo.jpg')} alt=""/>
            </div>
            </Link>
            
            <div className="navbar__right">
            <Link to='/home' className='nav__btn'><span className='btn'>Home</span></Link>
                <Link to='/' onClick={handleLogout} className='nav__btn'><span className='btn'>Logout</span></Link>
                <Link to='/cart' >
                    <div className='cart__btn'>
                    <Badge badgeContent={props?.items?.length} max={99} color='primary'>
                        <ShoppingBasketIcon className="basket__icon"/>
                    </Badge>
                    </div>
                </Link>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        items: state.cart.cartItems
    }
}

export default connect(mapStateToProps)(withRouter(Navbar))
