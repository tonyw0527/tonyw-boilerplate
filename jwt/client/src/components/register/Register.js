import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Register.css';
import axios from 'axios';

const Register = () => {
    const history = useHistory();

    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [Nickname, setNickname] = useState('');

    return (
        <div className="Register-wrapper">
            <div className="Register-title">
                <h1>Sign Up</h1>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                
                axios.post('/auth/register', {
                    email: UserName,
                    password: Password,
                    nickname: Nickname
                }).then(res => {
                    console.log(res);
                    history.push('/');
                })
                console.log('등록')
            }}>
                <label htmlFor="username">Email</label>
                <input type="email" id="username" value={UserName} onChange={(e)=>{setUserName(e.target.value)}} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={Password} onChange={(e) => {setPassword(e.target.value)}} />
                <label htmlFor="nickname">Nickname</label>
                <input type="text" id="nickname" value={Nickname} onChange={(e) => {setNickname(e.target.value)}} />
                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register;