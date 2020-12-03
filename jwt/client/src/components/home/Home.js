import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

const Home = () => {
    const history = useHistory();

    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [IsKeepLogin, setIsKeepLogin] = useState(false);

    useEffect(() => {
        // Redirect alert
        if(history.action === 'REPLACE'){
            alert('Please login again.')
        }
    }, [history.action]);

    return (
        <div className="Home-wrapper">
            <div className="Home-title">
                <h1>Tonyw JWT BoilerPlate!</h1>
            </div>
            <div className="Home-loginForm">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    axios.post('/auth/login',
                    {
                        email: UserName,
                        password: Password,
                        isKeepLogin: IsKeepLogin
                    },
                    { withCredentials: true }
                    ).then(res => {
                        if(res.status === 200){
                            history.push('/mypage');
                        }
                    }).catch(e => {
                        console.log(e)
                        alert('아이디 또는 비밀번호가 다릅니다.')
                    });
                    setUserName('');
                    setPassword('');
                }}>
                    <label htmlFor="login-username">Email</label>
                    <input id="login-username" type="email" maxLength="25" value={UserName} onChange={(e)=>{
                        setUserName(e.target.value);
                    }} />
                    
                    <label htmlFor="login-password">Password</label>
                    <input id="login-password" type="password" maxLength="15" value={Password} onChange={(e)=>{
                        setPassword(e.target.value);
                    }} />

                    <div>
                        <input id="keep-login-btn" type="checkbox" checked={IsKeepLogin} onChange={() => {
                            setIsKeepLogin(!IsKeepLogin);
                        }} />
                        <label htmlFor="keep-login-input">Keep Login</label>
                    </div>
                    

                    <button type="submit" >
                        Login
                    </button>
                    <button type="button" onClick={() => {
                        history.push('/register');
                    }}>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Home;