import React, { Fragment } from 'react';
import './App.css';
import Header from './Header'
import Login from './Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/movies" component={Header} />
      </Switch>
    </Router>
  );
}

export default App;
