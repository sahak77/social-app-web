import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import SignIn from './components/auth/signin/SignIn';
import SignUp from './components/auth/signup/SignUp';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Guest from './components/guest/Guest';
import Particles from 'react-particles-js';
import Home from './components/home/Home';
import Error from './components/error404/Error';
import App from './App';

export const useRoutes = (a, aaa) =>{
    if (a || localStorage.token) {
        return(
            <Switch>
                <Route path="/profile" exact>
                    <Profile />
                </Route>
                <Route path="/newsfeed" exact>
                    <Posts
                        // error={props.error}
                        // data={props.}
                    />
                </Route>
                <Route path='/guest/:id'>
                    <Guest />
                </Route>
                <Redirect to="/profile" />
            </Switch>
        )
    }
    else{
        return(
            <Switch>
                <Route path="/signin">
                    <SignIn aaa={aaa} />
                </Route>
                <Route path="/signup" exact>
                    <SignUp />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }
}