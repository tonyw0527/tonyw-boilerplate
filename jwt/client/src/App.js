import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Register from './components/register/Register';
import Mypage from './components/mypage/Mypage';

const App = () => {

    const checkToken = async () => {
        await axios.get('/user/test')
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log('hi');
            console.log(err.response.status);
        });
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/mypage" component={Mypage} exact />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
