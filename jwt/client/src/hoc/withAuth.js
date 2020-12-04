import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useUserStore } from '../states/user/userContext';

const withAuth = (SpecialComponent, option, adminRoute=null) => {

    /* 
        예)  option: null -> 누구나 출입이 가능한 페이지 (home)
                    true -> 로그인한 유저만 출입이 가능한 페이지
                    false -> 로그인한 유저는 출입이 불가능한 페이지
    */

    const AuthenticateCheck = observer(() => {
        
        // isToken이름의 쿠키를 참조.
        // 이 쿠키가 있다고 사용자 정보에 접근 가능한 것은 아니고
        // 단순히 redirect에만 이용.
        // 권한이 필요한 데이터는 api 요청시 토큰 검증을 함.
        //const isToken = Cookies.get('isToken');
        const UserStore = useUserStore();
        UserStore.checkIsToken();
        const isToken = UserStore.isLoggedIn;

        // 비정상적인 접근
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

        // 정상적인 접근
        return (
            <SpecialComponent />
        )
    });

    return AuthenticateCheck;

};

export default withAuth;