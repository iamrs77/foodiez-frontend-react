import axios from '../utils/axios';
import React, { useState } from 'react'
import '../styles/Login.css';
import '../styles/Register.css';
import TempNav from './TempNav';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Register(props) {
    let [email, setEmail] = useState('');
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [password, setPassword] = useState('');
    let [passwordConfirm, setPasswordConfirm] = useState('');
    
    const cookies = new Cookies();
    
    let register = (e, userRole) => {
        e.preventDefault()
        if(password !== passwordConfirm){
            document.getElementById('error').innerText = "Password don't match";
            return;
        }else {
            document.getElementById('error').innerText = '';
        }

        axios.post('/api/v1/user/register',{email, firstName, lastName, password, passwordConfirm, role: userRole}).then(res => {
            cookies.set('jwt', res.data.accessToken, {path: '/', maxAge: 24*60*60});
            props.history.push('/home');
        }).catch(err=>{
            document.getElementById('error').innerHTML = err.response.data.error ? err.response.data.error : '';
        })
    }

    return (
        <div className="login">
            <TempNav />
            <div className="login__container register__container">
                <h1>Register</h1>
                <div id="error" className="danger-text"></div>
                <form method='post' onSubmit={() => {}}>
                    <h5>Email</h5>
                    <input 
                        type="email" 
                        name='email' 
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h5>First Name</h5>
                    <input 
                        type="text" 
                        name='firstName' 
                        value={firstName}
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <h5>Last Name</h5>
                    <input 
                        type="text" 
                        name='lastName' 
                        value={lastName}
                        required
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <h5>Password</h5>
                    <input 
                        type="password" 
                        name='password' 
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <h5>Confirm Password</h5>
                    <input 
                        type="password" 
                        name='passwordConfirm' 
                        value={passwordConfirm}
                        required
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <div className="vendor">
                        <button className="login__button reg__button" onClick={(e) => {register(e, 'user')}}>Register</button>
                        <button className="btn vendor__button" onClick={(e) => {register(e, 'vendor')}}>Register as Vendor!</button>
                    </div>
                    
                    <div id="error"></div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(Register)
