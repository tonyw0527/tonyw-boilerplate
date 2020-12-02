import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Register from './components/register/Register';
import Mypage from './components/mypage/Mypage';
import withAuth from './hoc/withAuth';

const App = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={withAuth(Home, false)} exact />
                <Route path="/register" component={withAuth(Register, false)} />
                <Route path="/mypage" component={withAuth(Mypage, true)} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
