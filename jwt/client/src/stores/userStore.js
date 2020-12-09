import { createContext, useContext } from 'react';
import axios from 'axios';
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
    async checkIsToken() {
        try {
            const result = await axios.get('/auth/check')
            runInAction(() => {
                this.isLoggedIn = true;
            })
            return result;
        } catch (err) {
            runInAction(() => {
                this.isLoggedIn = false;
            })
            throw err;
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
        <UserContext.Provider value={new UserStore()} >
            {children}
        </UserContext.Provider>
    )
}

// useStore - for components
export const useUserStore = () => useContext(UserContext);