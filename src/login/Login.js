import React, { Component } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { auth } from './firebase';
import LoadingPage from '../helper/LoadingPage';
import TheDialog from './dialog/theDialog';

const loginValidationSchema = Yup.object().shape({
  username: Yup.string('Enter a username')  
    .min(2, 'Username must be atleast 2 characters long')
    .max(128, 'username must be less than 128 characters')
    .matches(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/, "Username cannot contain special characters")
    .required(),
  password: Yup.string('Enter a password')
    .min(6, 'Password must be atleast 6 characters')
    .required()
})

class Login extends Component {

  state = {
    storedUser: '',
    loading: true
  }

  async componentDidMount() {
    let response = await axios.get('/user/storedUser');
    let storedUsername = JSON.parse(JSON.stringify(response)).data;
    console.log('storedUsername: ' + storedUsername)
    if(storedUsername) {
      this.setState({
        storedUser: storedUsername,
        loading: false
      })
    } else {
      this.setState({
        loading: false
      })
    }
  }

  render() {
    const { loading } = this.state;
    const initialValues = loading ? {} : {
      username: this.state.storedUser,
      password: '',
      remember: false,
      errorMsg: ''
    }
    
    const { storedUser } = this.state;
    return (loading ? (<div> <LoadingPage /> </div>) : (
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, {setErrors, setSubmitting}) => {

          if(values.remember) {
            let username = values.username;
            console.log('saving username... ' + username);
            await axios.post('/user/storeUser', username)
          } else {
            await axios.delete('/user/deleteStoredUsername')
          }

          let username = values.username;
          let password = btoa(values.password);
          let userDets = { username, password };
          let response = await axios.post("/user/signin", userDets);
          let userAuth = JSON.parse(JSON.stringify(response)).data
          
          if(!userAuth) {
            setSubmitting(false);
            setErrors({ errorMsg: 'Username or password incorrect' })
          } else {
            console.log("attempting to sign in...")
            await auth.signInWithCustomToken(userAuth).then(async function(res) {
              await res.user.getIdToken().then(function(idToken){
                sessionStorage.setItem('jwtToken', idToken)
              }).catch(function(err) {
                console.log("error: " + err);
              });
            }).catch(function(err) {
              console.log("error: " + err);
            })
            
            let response = await axios.post("/user/role", values.username);
            let location = (String)(JSON.parse(JSON.stringify(response)).data);
            sessionStorage.setItem("username", values.username);
            console.log("location: ", location);
            setSubmitting(false)
            if(location) {
              window.location="/" + location;
            } else {
              setErrors({ errorMsg: 'failed to login' })
            }
          }
        }}

        render={({submitForm, isSubmitting, errors}) =>  (

          <Form>
            <TheDialog
              storedUser={storedUser}
              submitForm={submitForm}
              isSubmitting={isSubmitting}
              errors={errors}/>
          </Form> 
        )} 
      />)
    )
  }
}

export default Login;