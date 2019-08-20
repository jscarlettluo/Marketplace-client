import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
//Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#f05545',
      main: '#b71c1c',
      dark: '#7f0000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#f77a9',
      main: '#f06292',
      dark: '#ba2d65',
      contrastText: '#000000',
    },
  }
});

let authenticated;
const token = localStorage.FBIdToken;
if(token) {
  let decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
      <Router>
      <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component ={home}/>
            <AuthRoute exact path="/login" component ={login}  authenticated={authenticated}/>
            <AuthRoute exact path="/signup" component ={signup} authenticated={authenticated}/>
          </Switch>
        </div>
      </Router>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
