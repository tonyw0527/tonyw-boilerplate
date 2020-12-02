import React, { useEffect } from 'react';
import axios from 'axios';

export default (SpecialComponent, option, adminRoute=null) => {

    /* 
        예)  option: null -> 누구나 출입이 가능한 페이지 (home)
                    true -> 로그인한 유저만 출입이 가능한 페이지
                    false -> 로그인한 유저는 출입이 불가능한 페이지
    */

    const AuthenticateCheck = (props) => {

        const checkToken = async () => {
            await axios.get('/user/test')
            .then(res => {
                console.log(res)
    
                if(!option) {
                    props.history.push('/mypage');
                }
            })
            .catch(err => {
                console.log('hi');
                console.log(err.response.status);
                
                if(option){
                    alert('로그인해주세요')
                    props.history.push('/');
                }
                
            });
        }

        useEffect(() => {
            checkToken();

        }, []);

        return (
        <SpecialComponent />
        )

    };

    return AuthenticateCheck;

};