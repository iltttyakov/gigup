import React, {useEffect} from 'react'
import {HashRouter as Router, Route, Switch} from "react-router-dom"

import '../styles/fonts.scss'
import '../styles/general.scss'
import '../styles/normalize.scss'

import WelcomePage from "./pages/WelcomePage"
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import usersServices from "../redux/users/usersServices";
import AccountPage from "./pages/AccountPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import SearchPage from "./pages/SearchPage";
import SearchResultPage from "./pages/SearchResultPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";


function App() {
    return (
        <Router basename={''}>
            <Switch>
                {
                    usersServices.isAuthenticated()
                        ? <>
                            <Route exact path={'/'} component={AccountPage}/>
                            <Route exact path={'/account-settings'} component={AccountSettingsPage}/>
                            <Route exact path={'/search/results'} component={SearchResultPage}/>
                            <Route exact path={'/search'} component={SearchPage}/>
                            <Route exact path={'/users/:id'} component={ProfilePage}/>
                        </>
                        : <>
                            <Route exact path={'/'} component={WelcomePage}/>
                            <Route exact path={'/signup'} component={SignUpPage}/>
                            <Route exact path={'/login'} component={LoginPage}/>
                        </>
                }
                <Route path={''} component={NotFoundPage}/>
            </Switch>
        </Router>
    )
}

export default App
