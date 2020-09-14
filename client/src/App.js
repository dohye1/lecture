import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/partials/Nav/Nav';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Login from './components/pages/Login/Login';
import withAuth from './hoc/withAuth';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={withAuth(Dashboard, true)} />
        <Route path="/login" component={withAuth(Login, false)} />
      </Switch>
    </Router>
  );
}

export default App;
