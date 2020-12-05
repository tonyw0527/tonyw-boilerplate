import { createContext, useContext } from 'react';
import Cookies from 'js-cookie';
import { runInAction, autorun, makeAutoObservable } from 'mobx';

class UserStore {
    // states
    isLoggedIn = false;

    constructor() {
        makeAutoObservable(this);
        
        // reactions
        autorun(() => {
            console.log('state log');
            console.log('isLoggedIn', this.isLoggedIn);
        });

        
    }

    // actions
    checkIsToken() { 
            const isToken = Cookies.get('isToken');
            if(isToken){
                runInAction(() => {
                    this.isLoggedIn = true;
                })
            } else {
                runInAction(() => {
                    this.isLoggedIn = false;
                })
            }
        
    }

    

    // derivations
    /*
    get testFunc() {
        return this.testArr.length;
    }
    */
}

const UserContext = createContext();

// Provider - for index.js
export const UserProvider = ({ children }) => {
    return (
        <UserContext.Provider value={new UserStore} >
            {children}
        </UserContext.Provider>
    )
}

// useStore - for components
export const useUserStore = () => useContext(UserContext);