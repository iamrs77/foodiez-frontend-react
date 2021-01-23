import React from 'react'
import '../styles/CartItems.css'
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import { connect } from 'react-redux';
// import axios from '../utils/axios';
// import GetHeaders from '../utils/headers';
import { removeFromCart } from '../redux/actions/cartActions';

function CartItems({cartItems, deleteItem}) {
    
    let removeitem = (item) => {
        deleteItem(item._id);
    }
    // let removeitem = (item) => {
    //     axios.delete(`/api/v1/cart/removeFromCart/${item._id}`,{headers: GetHeaders()}).then(res => {
    //         deleteItem({type: 'REMOVE_FROM_CART', id: item._id})
    //     }).catch(err => 
    //         console.log(err)
    //     )
    // }

    let cartList = cartItems.map(item => { 
        if(item == null){
            return null;
        }
        return (
            <div className='cartitem' key={Math.random()}>
                <div className="item__left" >
                    <span className="item__name">{item?.name}</span>
                    <span className="item__type"><LocalDiningIcon />&nbsp;{item?.foodType}</span>
                    <span className="item__desc" data-toggle="tooltip" data-placement="top" title={item?.description}>{item?.description}</span>
                    <span className="item__cost">₹ {item?.cost}</span>
                </div>
                <div className="item__right">
                    <img src="https://static.toiimg.com/thumb/52416693.cms?imgsize=789478&width=800&height=800" alt=""/>
                    <button onClick={() => {removeitem(item)}} className="btn btn-sm btn-danger remove__button">Remove</button>
                </div>
            </div>
        )
    })
    return (
        <div className='list_ofItems'>
            {cartList}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItem: (id) => {dispatch(removeFromCart(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItems)
