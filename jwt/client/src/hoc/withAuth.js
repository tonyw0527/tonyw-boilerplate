import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

export default (SpecialComponent, option, adminRoute=null) => {

    /* 
        예)  option: null -> 누구나 출입이 가능한 페이지 (home)
                    true -> 로그인한 유저만 출입이 가능한 페이지
                    false -> 로그인한 유저는 출입이 불가능한 페이지
    */

    const AuthenticateCheck = (props) => {
        
        const isToken = Cookies.get('isToken');

        if(isToken) {
            console.log('토큰 있음')
            if(!option) {
                // 로그인 상태, 로그인 유저는 출입 불가 페이지로 접근한 경우(login, register)
                // -> 로그인 유저 출입 가능 페이지로 이동(mypage)
                return <Redirect to="/mypage" />
            }
        } else {
            console.log('토큰 없음!!')
            if(option){
                // 로그아웃 상태, 로그인 유저만 출입 가능 페이지로 접근한 경우(mypage)
                // -> 로그인 페이지로 안내
                return <Redirect to="/" />
            }
        }
        return (
            <SpecialComponent />
        )
    };

    return AuthenticateCheck;

};