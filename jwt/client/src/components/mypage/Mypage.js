import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Mypage';
import axios from 'axios';


const Mypage = () => {
    const history = useHistory();

    const checkToken = async () => {
        const token = Cookies.get('boilerplate');
        await axios.get('/user/test')
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        // login check
        console.log('최초 테스트')
        //checkToken();
        
        return () => {
            
        }
    }, [])

    return (
        <div>
            mypage
            <button type="button" onClick={() => {
                // logout
                axios.get('/auth/logout',{
                    withCredentials: true
                }).then(res => {
                    console.log(res);
                    history.push('/');
                })
            }}>
                logout
            </button>
            <button type="button" onClick={() => {
                    // login check
                    checkToken();
                }}>
                    login test
                </button>
        </div>
    )
}

export default Mypage;