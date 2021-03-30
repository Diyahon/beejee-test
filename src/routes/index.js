import React from 'react';
import { Route } from 'react-router-dom';
import App from '../components/app';
import Signin from '../components/auth/signin';
import Signout from '../components/auth/signout';
import TaskList from '../components/taskList';

const Routes = () => {
    return (
        <App>
            <Route exact path="/" component={TaskList} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signout" component={Signout} />
        </App>
    );
};

export default Routes;
