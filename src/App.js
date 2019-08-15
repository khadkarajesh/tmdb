import React from 'react';
import './App.css';
import MovieCategory from './MovieCategory'
import Login from './Login'
import MovieDetail from './MovieDetail'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import AppProvider from './AppContext';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { purple } from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] },
    secondary: { main: '#11cb5f' }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Login} />
            <ProtectedRoute path="/movies" exact strict component={MovieCategory} />
            <ProtectedRoute path="/movies/:id" exact strict component={MovieDetail} />
          </Switch>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
