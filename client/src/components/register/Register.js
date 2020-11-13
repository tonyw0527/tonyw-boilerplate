import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Register.css';
import axios from 'axios';

const Register = () => {
    const history = useHistory();

    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [Nickname, setNickname] = useState('');

    const checkIsLogin = async () => {
        await axios.get('/auth/logintest',{
            withCredentials: true
        }).then(res => {
            console.log(res);
            if(res.data === 'allow'){
                history.push('/mypage');
            }
        })
    }

    useEffect(() => {
        checkIsLogin();
        
        return () => {
            
        }
    }, [])

    return (
        <div className="Register-wrapper">
            <div className="Register-title">
                <h1>Sign Up</h1>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                
                axios.post('/auth/signup', {
                    username: UserName,
                    password: Password,
                    nickname: Nickname
                }).then(res => {
                    console.log(res);
                    history.push('/');
                })
                console.log('등록')
            }}>
                <label htmlFor="username">UserName</label>
                <input type="text" id="username" value={UserName} onChange={(e)=>{setUserName(e.target.value)}} />
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