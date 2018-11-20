import React, { Component } from 'react';
import './App.css';
import RequireAuth from './RequireAuth'
import Signup from './signup/Signup';
import Login from './login/Login';
import { Router } from "@reach/router";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AccessDenied from './helper/AccessDenied';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider 
        theme={theme} 
      >
        <Router>
          <Signup 
            path="signup" 
          />
          <Login 
            path="login" 
          />
          <AccessDenied 
            path="access_denied" 
          />

          <RequireAuth 
            path="/*" 
            default
          />
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;