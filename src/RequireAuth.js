import React, { Component } from 'react';
import { Router, Redirect } from '@reach/router/';
import axios from 'axios';
import SearcherHome from './searcher/Searcher';
import RecruiterHome from './recruiter/Recruiter';
import LoadingPage from './helper/LoadingPage';
import NotFound from './helper/NotFound';

class RequireAuth extends Component {
  state = {
    isAuthenticated: true,
    isLoading: false
  }

  componentDidMount() {
    this.authenticate()
  }

  authenticate() {
    axios.post('/user', sessionStorage.getItem('jwtToken'))
      .then(response => {
        if(response.data) {
          this.setState({
            isAuthenticated: false,
            isLoading: true
          })
        } else {
          this.setState({
            isLoading: false
          })
          return(<Redirect to="login"/>);
        }
      })
      .catch(err => {
        console.log(err)
        this.setState({
          isLoading: false
        })
        return(<Redirect to="login"/>);
      })
  }

  render() {
    const{isLoading, isAuthenticated} = this.state;

    return(
    <div>{!isLoading ? (<div>
      {isAuthenticated ? (
        <Router>
          <SearcherHome path="/searcher"/>
          <RecruiterHome path="/recruiter"/>
          <NotFound default />
        </Router>
      ) : (
        <Redirect to="login"/>
      )}</div>
    ): (
      <LoadingPage />
    )}</div>);
  }
}

export default RequireAuth;
