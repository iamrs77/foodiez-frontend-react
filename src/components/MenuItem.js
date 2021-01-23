import React from 'react'
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import '../styles/MenuItem.css'
import { connect } from 'react-redux'
import axios from '../utils/axios';
import GetHeaders from '../utils/headers';
import { addToCart } from '../redux/actions/cartActions';

function MenuItem({menuItems, role, addToCart}) {
    let buttonsDiv = (item) => {
        if(role === 'vendor'){
            return(<div>
                {/* <Link to='/'><button className="btn btn-sm btn-info edit__button"></button></Link> */}
            </div>)
        }else{
            return (
                <button onClick={() => {addItem(item)}} className="btn btn-sm btn-success add__button">Add to Basket</button>
            )
        }
    }
    
    // let handleDelete = (item) => {
    //     axios.delete(`/api/v1/fooditem/delete/${item._id}`,{headers: GetHeaders()}).then(res => {
    //         // console.log('deleted')
    //     }).catch(err => 
    //         console.log(err)
    //     )
    // }
    
    let addItem = (item) => {
        addToCart(item);
        // axios.post(`/api/v1/cart/addToCart`, {foodItem: item._id} ,{headers: GetHeaders()}).then(res => {
        //     addToCart({type: 'ADD_TO_CART', item})
        // }).catch(err => 
        //     console.log(err)
        // )
    }

    let menuList = menuItems.map(item => {
        return (
            <div className='item' key={item._id}>
                <div className="item__left" >
                    <span className="item__name">{item.name}</span>
                    <span className="item__type"><LocalDiningIcon />&nbsp;{item.foodType}</span>
                    <span className="item__desc" data-toggle="tooltip" data-placement="top" title={item.description}>{item.description}</span>
                    <span className="item__cost">₹ {item.cost}</span>
                </div>
                <div className="item__right">
                    <img className='basket__img' src="https://static.toiimg.com/thumb/52416693.cms?imgsize=789478&width=800&height=800" alt=""/>
                    {buttonsDiv(item)}
                </div>
                
            </div>
        )
    })
    return (
        <div>
            {menuList}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        role: state.user.roleName,
        items: state.cart.cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (item) => dispatch(addToCart(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem)
