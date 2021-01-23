import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import FoodItem from './FoodItem'
import '../styles/Home.css'
import {connect} from 'react-redux';
import GetHeaders from '../utils/headers';
import { populateTheCart } from '../redux/actions/cartActions';

function Home({addToCart, role}) {
    let [vendors, setVendors] = useState([]);
    let [homeHeader, setHomeHeader] = useState('');
    useEffect(() => {
        // console.log('abc')
        let isMounted = true;
        if (isMounted){
            if(role === 'vendor'){
                axios.get('/api/v1/vendor/allVendorsOfUser', {headers: GetHeaders()}).then(response => {
                    setVendors(response.data);
                    setHomeHeader('My Restaurants');
                })
            }else{
                axios.get('/api/v1/vendor/all', {headers: GetHeaders()}).then(response => {
                    setVendors(response.data);
                    setHomeHeader('Top Restaurants');
                })
            }
        }
        return () => { isMounted = false };
    }, [])
    
    useEffect(() => {
        // console.log('def')
        let isMounted = true;
        if (isMounted){
            addToCart(role);
            // if(role === 'vendor'){
            //     addToCart({type: 'POPULATE_THE_CART', item: []})
            // }else{
            //     axios.get('/api/v1/cart/getAllForUser',{headers: GetHeaders()}).then(response => {
            //         addToCart({type: 'POPULATE_THE_CART', item: response.data})
            //     })
            // }
        }
        return () => { isMounted = false };
    }, [])
    
    return (
        <div className='home'>
            <img className='home__banner' src="https://elvino.co.uk/wp-content/uploads/2016/03/Food-banner-2.jpg" alt=""/>
            <h3>{homeHeader}</h3>
            <FoodItem vendors={vendors}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        role: state.user.roleName,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (role) => {dispatch(populateTheCart(role))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
