import React, { useContext } from 'react';
import './App.css';
import Header from './Header'
import Login from './Login'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import About from './About'
import AuthenticatedRoute from './AuthenticatedRoute';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <AuthenticatedRoute path="/movies" exact strict component={Header}/>
        </Switch>
      </Router>
  );
}

export default App;
