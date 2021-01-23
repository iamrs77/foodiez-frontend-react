import axios from '../utils/axios';
import React from 'react'
import { connect } from 'react-redux';
import '../styles/Bill.css';
import { Link, withRouter } from 'react-router-dom';
import GetHeaders from '../utils/headers';

function Bill({cartItems, history}) {
    let itemTotal = 0;
    let taxes = 0;

    cartItems.forEach(element => {
        itemTotal += element.cost
    });

    let handleSubmit = (e) => {
        e.preventDefault();
        axios.patch('/api/v1/cart/placeOrder', {}, {headers: GetHeaders()}).then(resp => {
            history.push('/home');
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='bill__pad'>
            <div className="bill_padHeader">Bill Details</div>
            <div className="item__row item__total">
                <div>Item Total</div>
                <div>₹ {itemTotal}</div>
            </div>
            <div className="item__row item__tax">
                <div>Taxes and charges</div>
                <div>₹ {taxes}</div>
            </div>
            <div className="item__row item__toPay">
                <div>Total</div>
                <div>₹ {itemTotal + taxes}</div>
            </div>
            <form>
                <button type='submit' onClick={handleSubmit} className='btn btn-success pay__button'>Place Order</button>
            </form>
            <Link to='/orderHistory' className='no__textDecoration'><button className='btn btn-info btn__orderHistory full__width'>Your Order History</button></Link>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems
    }
}

export default connect(mapStateToProps)(withRouter(Bill))
