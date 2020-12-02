import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

const Home = () => {
    const history = useHistory();

    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');

    return (
        <div className="Home-wrapper">
            <div className="Home-title">
                <h1>Welcome to BoilerPlate!</h1>
            </div>
            <div className="Home-loginForm">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    axios.post('/auth/login',
                    {
                        email: UserName,
                        password: Password
                    },
                    { withCredentials: true }
                    ).then(res => {
                        console.log(res);
                        history.push('/mypage')
                    }).catch(e => {
                        console.log(e)
                        alert('아이디 또는 비밀번호가 다릅니다.')
                    });
                }}>
                    <label htmlFor="login-username">Email</label>
                    <input id="login-username" type="email" maxLength="25" value={UserName} onChange={(e)=>{
                        setUserName(e.target.value);
                    }} />
                    
                    <label htmlFor="login-password">Password</label>
                    <input id="login-password" type="password" maxLength="15" value={Password} onChange={(e)=>{
                        setPassword(e.target.value);
                    }} />
                    
                    <button type="submit" >
                        Login
                    </button>
                    <button type="button" onClick={() => {
                        history.push('/signup');
                    }}>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Home;