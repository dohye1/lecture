import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/partials/Nav';
import LandingPage from './components/pages/LandingPage';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import OpenLecture from './components/pages/OpenLecture';
import LectureDetail from './components/pages/LectureDetail';
import ScorePage from './components/pages/ScorePage';

import withAuth from './hoc/withAuth';

function App() {
    return (
        <Router>
            <Nav />
            <div className="app">
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={withAuth(LandingPage, true)}
                    />
                    <Route path="/login" component={withAuth(Login, false)} />
                    <Route
                        path="/register"
                        component={withAuth(Register, false)}
                    />
                    <Route
                        path="/open"
                        component={withAuth(OpenLecture, true)}
                    />
                    <Route
                        path="/lecture/:id"
                        component={withAuth(LectureDetail, true)}
                    />
                    <Route
                        path="/score"
                        component={withAuth(ScorePage, true)}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
