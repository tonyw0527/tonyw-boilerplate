import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Mypage';
import axios from 'axios';


const Mypage = () => {
    const history = useHistory();

    const checkIsLogin = async () => {
        await axios.get('/auth/logintest',{
            withCredentials: true
        }).then(res => {
            console.log(res);
            if(res.data === 'notallow'){
                history.push('/');
            }
        })
    }

    useEffect(() => {
        // login check
        console.log('최초 테스트')
        checkIsLogin()
        
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
                    axios.get('/auth/logintest',{
                        withCredentials: true
                    }).then(res => {
                        console.log(res);
                    })
                }}>
                    login test
                </button>
        </div>
    )
}

export default Mypage;