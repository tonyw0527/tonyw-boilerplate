import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Mypage';
import axios from 'axios';


const Mypage = () => {
    const history = useHistory();

    const checkToken = async () => {
        await axios.get('/user/test')
        .then(res => console.log(res))
        .catch(err => {
            console.log('hi');
            console.log(err.response.status);
            if(err.response.status === '419'){
                alert('Token Expired. Please login again');
            }
            alert('Please login again');
            history.push('/');
        });
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