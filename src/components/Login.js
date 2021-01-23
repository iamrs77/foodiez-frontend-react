import axios from '../utils/axios';
import React, { useState } from 'react'
import '../styles/Login.css';
import TempNav from './TempNav';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Login(props) {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const cookies = new Cookies();

    let login = (e) => {
        e.preventDefault()
        axios.post('/api/v1/user/signIn', {email, password}).then((response) => {
            if(response.data.accessToken){
                cookies.set('jwt', response.data.accessToken, {path: '/', maxAge: 24*60*60});
                props.history.push('/home');
            }
        }).catch(err=>{
            document.getElementById('error').innerHTML = err?.response?.data?.error ? err.response.data.error : '';
        })
    }

    return (
        <div className="login">
            <TempNav />
            <div className="login__container">
                <h1>Login</h1>
                <div id="error" className="danger-text"></div>
                <form onSubmit={login}>
                    <h5>Email</h5>
                    <input 
                        type="email" 
                        name='email' 
                        id="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h5>Password</h5>
                    <input 
                        type="password" 
                        name='password' 
                        id="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="login__button">Login</button>
                    {/* <button type='submit' className="login__button" onClick={login}>Login</button> */}
                </form>
            </div>
        </div>
    )
}

export default withRouter(Login)
