import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import '../styles/OrderHistory.css';
import GetHeaders from '../utils/headers';
import Moment from 'react-moment';
import 'moment-timezone';

function OrderHistory() {
    let [orders, setOrders] = useState([])

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            axios.get('/api/v1/cart/getOrderHistory', {headers: GetHeaders()}).then(resp => {
                setOrders(resp.data);
            })
        }
        return () => { isMounted = false };
    }, [])

    let ordersList = orders.map(order => {
        if(order.foodItem == null){
            return null;
        }
        return (
            <div className='order' key={order._id}>
                <div className='about__order'>
                    <span className='order__title'>{order?.foodItem?.name}</span>
                    <br/>
                    <span>₹ {order?.foodItem?.cost}</span>
                </div>
                
                <div className='about__time'>
                ordered at: <Moment  format='ddd DD-MMM-YYYY'>{order?.createdAt}</Moment> - <Moment tz="Asia/Kolkata" format='HH:MM'>{order?.createdAt}</Moment> IST
                </div>
            </div>
        )
    });

    return ordersList.length > 0 ? (
        <div className='orders'>
            <h5 className='orders__title'>Your last 10 Orders</h5>
            <div>
                {ordersList}
            </div>
        </div>
    ) :  (<div>
        Loading
    </div>)

    
}

export default OrderHistory
