import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useUserStore } from '../stores/userStore';

const withAuth = (SpecialComponent, option, adminRoute=null) => {

    /* 
        예)  option: null -> 누구나 출입이 가능한 페이지 (home)
                    true -> 로그인한 유저만 출입이 가능한 페이지
                    false -> 로그인한 유저는 출입이 불가능한 페이지
    */

    const AuthenticateCheck = observer(() => {
        const history = useHistory();
        const UserStore = useUserStore();
        
        useEffect(() => {

            UserStore.checkIsToken()
            .then(res => {
                console.log(res);
                if(!option) {
                    // 로그인 상태, 로그인 유저는 출입 불가 페이지로 접근한 경우(login, register)
                    // -> 로그인 유저 출입 가능 페이지로 이동(mypage)
                    history.replace('/mypage');
                }
            })
            .catch(err => {
                console.log(err.response.status);
                if(option){
                    // 로그아웃 상태, 로그인 유저만 출입 가능 페이지로 접근한 경우(mypage)
                    // -> 로그인 페이지로 안내
                    history.replace('/');
                }
            })
            
            return () => {
             
            }
        });

        // 정상적인 접근
        return (
            <SpecialComponent />
        )
    });

    return AuthenticateCheck;
};

export default withAuth;