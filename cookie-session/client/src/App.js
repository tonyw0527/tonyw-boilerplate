import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Register from './components/register/Register';
import Mypage from './components/mypage/Mypage';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/signup" component={Register} exact />
                <Route path="/mypage" component={Mypage} exact />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
