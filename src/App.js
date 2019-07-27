import React, { useContext } from 'react';
import './App.css';
import Header from './MovieCategory'
import Login from './Login'
import MovieDetail from './MovieDetail'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <AuthenticatedRoute path="/movies" exact strict component={Header}/>
          <Route path="/movies/:id" component={MovieDetail}/>
        </Switch>
      </Router>
  );
}

export default App;
