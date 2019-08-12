import React from 'react';
import './App.css';
import MovieCategory from './MovieCategory'
import Login from './Login'
import MovieDetail from './MovieDetail'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute';
import AppProvider from './AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Login} />
          <AuthenticatedRoute path="/movies" exact strict component={MovieCategory} />
          <Route path="/movies/:id" component={MovieDetail} />
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
