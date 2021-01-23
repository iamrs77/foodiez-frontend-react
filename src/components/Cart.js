import React from 'react'
import {connect} from 'react-redux';
import Bill from './Bill';
import CartItems from './CartItems';
import '../styles/Cart.css'
import { Link } from 'react-router-dom';

function Cart({cartItems}) {
    return cartItems.length > 0 ? (
        <div className="cart__itemsBill">
            <CartItems />
            <Bill/>
        </div>
    ) : (
        <div className='empty__cart'>
            <Link to='/orderHistory' className='no__textDecoration'><button className='btn btn-info btn__orderHistory'>Your Order History</button></Link>
            <h4>OOps.. Your cart is empty</h4>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems
    }
}

export default connect(mapStateToProps)(Cart)
