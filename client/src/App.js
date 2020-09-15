import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/partials/Nav/Nav';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';

import withAuth from './hoc/withAuth';

function App() {
  return (
    <Router>
      <Nav />
      <div className="app">
        <Switch>
          <Route exact path="/" component={withAuth(Dashboard, true)} />
          <Route path="/login" component={withAuth(Login, false)} />
          <Route path="/register" component={withAuth(Register, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
