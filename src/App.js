import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
//Components
import Navbar from './components/Navbar';
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

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
      <Router>
      <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component ={home}/>
            <Route exact path="/login" component ={login}/>
            <Route exact path="/signup" component ={signup}/>
          </Switch>
        </div>
      </Router>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
