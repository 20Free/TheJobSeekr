import React, { Component } from 'react';
import AppNavbar from '../AppNavbar';
import axios from 'axios';
import { Redirect } from '@reach/router';
import LoadingPage from '../helper/LoadingPage';

class RecruiterHome extends Component {
  
  state = {
    isRole: true,
    isLoading: true
  }

  /*componentDidMount() {
    this.checkRole();
  }*/

  checkRole() {
    axios.post("/user/role", sessionStorage.getItem("username"))
    .then(response => {
      console.log("response data: " + response.data);
      if(JSON.parse(JSON.stringify(response)).data === 'recruiter') {
        this.setState({
          isRole: true,
          isLoading: false
        })
      } else {
        this.setState({
          isLoading: false
        })
        return(<Redirect to="access_denied"/>)
      }
    })
    .catch(err => {
      console.log(err)
      this.setState({
        isLoading: false
      })
      return(<Redirect to="access_denied"/>)
    })
  }

  render() {
    const { isLoading, isRole } = this.state;
    return (
    <div>{!isLoading ? ( 
    <div>{isRole ? (
      <div>
        <AppNavbar />
        <p>rectruiter page...</p>
      </div>) 
      : (<Redirect to="access_denied"/>)}</div>)
      : (<LoadingPage />)}</div> 
    );
  }
}

export default RecruiterHome;