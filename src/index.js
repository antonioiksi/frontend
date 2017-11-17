import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom'
import { Provider } from 'react-redux';


import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';

// react-bootstrap-table
import 'react-bootstrap-table/dist/react-bootstrap-table.min';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';



import Welcome from './scenes/Welcome'
import Login from './scenes/Login'
import Dashboard from './scenes/Dashboard'
import Search from './scenes/Search'

import {EmptyRoute} from './components/layouts/EmptyRoute'
import {BackofficeRoute} from './components/layouts/BackofficeRoute'
import Logout from "./scenes/Logout";
import Test from "./scenes/Test";
//import store from "./store";
import store from './store'
import UserProfile from "./scenes/UserProfile";
import Settings from "./scenes/Settings";
import Bins from "./scenes/Bins";
//import {loadState, saveState} from './localStorage';


//TODO add loading and keepeng auth token, don't forget abandon free access in DajngoServer
/*
persistedState = loadState();
const store = {
    reducers,
    persistedState
};

import reducers from './services/reducers';


const middleware = applyMiddleware(thunk);

const store = createStore(
    reducers,
    compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);



store.subscribe(() => {
    saveState(store.getState());
});


                    <ul>
                        <li><Link to="/">Welcome</Link></li>
                        <li><Link to="/login/">Login</Link></li>
                        <li><Link to="/logout/">Logout</Link></li>
                        <li><Link to="/test/">Test</Link></li>
                    </ul>
                    <hr/>



*/

ReactDOM.render(

    <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={Welcome}/>
                        <EmptyRoute exact path="/login/" component={Login}/>
                        <Route exact path="/test/" component={Test}/>
                        <BackofficeRoute exact path="/logout/" component={Logout}/>
                        <BackofficeRoute exact path="/dashboard/" component={Dashboard}/>
                        <BackofficeRoute exact path="/userprofile/" component={UserProfile}/>
                        <BackofficeRoute exact path="/settings/" component={Settings}/>
                        <BackofficeRoute exact path="/search/" component={Search}/>
                        <BackofficeRoute exact path="/bins/" component={Bins}/>
                        <Route render={()=>(<Redirect to="/"/>)}/>
                    </Switch>
                </div>
            </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
