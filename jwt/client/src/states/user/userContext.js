import { createContext, useContext } from 'react';
import UserStore from './UserStore';

const UserContext = createContext();

// Provider
export const UserProvider = ({ children }) => {
    return (
        <UserContext.Provider value={new UserStore} >
            {children}
        </UserContext.Provider>
    )
}

// useStore
export const useUserStore = () => useContext(UserContext);