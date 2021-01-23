import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams, withRouter } from 'react-router-dom'
import MenuItem from './MenuItem';
import '../styles/Menu.css'
import GetHeaders from '../utils/headers';
import { connect } from 'react-redux';

function Menu({role}) {
    let {vendorId} = useParams();
    let [menuItems, setMenuItems] = useState([]);

    let addMenuButton = role === 'vendor' ? (
        <Link to={`/menu-form/${vendorId}`} className='no__textDecoration'><button className='add__menuItemBtn btn btn-info'>Add Menu Item</button></Link>
    ) : (<></>);

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            axios.get(`/api/v1/fooditem/get/${vendorId}`, {headers: GetHeaders()}).then((response) => {
                setMenuItems(response.data);
            })
        }
        return () => { isMounted = false };
    }, [menuItems])

    if(menuItems.length <= 0){
        return (
            <div className='menu__info'>
                No Items Yet
                <div>
                    {addMenuButton}
                </div>
            </div> 
        )
    } else {
        return (
            <div className="main__menu">
                {addMenuButton}
                <MenuItem menuItems={menuItems}/>
            </div>
        )
    }
    
}
const mapStateToProps = (state) => {
    return {
        role: state.user.roleName,
    }
}
export default connect(mapStateToProps)(withRouter(Menu))
