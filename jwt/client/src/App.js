import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Register from './components/register/Register';
import Mypage from './components/mypage/Mypage';
import withAuth from './hoc/withAuth';
import { UserProvider } from './states/user/userContext';


const App = () => {

    return (

        <BrowserRouter>
            <Switch>
                <UserProvider>
                    <Route path="/" component={withAuth(Home, false)} exact />
                    <Route path="/register" component={withAuth(Register, false)} />
                    <Route path="/mypage" component={withAuth(Mypage, true)} />
                </UserProvider>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
