import React, { Component } from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TheDialog from './dialog/theDialog'

function equalTo(ref, msg) {
  return Yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    params: {
      reference: ref.path,
    },
    test: function(value) {
      return value === this.resolve(ref);
    },
    message: msg
  });
}
Yup.addMethod(Yup.string, 'equalTo', equalTo);

const theFirstValidationSchema = Yup.object().shape({
  firstName: Yup.string('Enter a First Name')
    .required(),
  lastName: Yup.string('Enter a Last Name')
    .required(),
  phoneNumber: Yup.string("Enter a phone number")
    .matches(/^[+][1][0-9]{10,}/, {
      message:'Must be a valid phone number [+1xxxxxxxxxx]',
      excludeEmptyString: true
    })
    .min(12, "Must be a valid phone number [+1xxxxxxxxxx]")
    .max(12, "Must be a valid phone number [+1xxxxxxxxxx]")
    .required()
});
const theSecondValidationSchema = Yup.object().shape({
  username: Yup.string('Enter a username')  
    .min(2, 'Username must be atleast 2 characters long')
    .max(128, 'username must be less than 128 characters')
    .matches(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/, "Username cannot contain special characters")
    .required(),
  password: Yup.string('Enter a password')
    .min(6, 'Password must be atleast 6 characters')
    .required(),
  confirmPassword: Yup.string('Confirm Password')
    .equalTo(Yup.ref('password'), 'passwords must match')
    .required()
});
const theThirdValidationSchema = Yup.object().shape({
  email: Yup.string('Enter an email')
    .email()
    .required(),
  role: Yup.string()
    .oneOf(['searcher', 'recruiter'], 'You must select a role.')
    .required(),
  terms: Yup.boolean()
    .oneOf([true], 'Please accept the terms and conditions.')
    .required()
});
  
const validationSchemas = [theFirstValidationSchema, theSecondValidationSchema, theThirdValidationSchema];

class Signup extends Component {

  state = {
    stepIndex: 0
  };

  moveForward = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex === 2) {
      this.setState({ stepIndex: 0, finished: false });
      window.location = "/login"
    } else {
      this.moveForward();
    }
  };

  moveToStep(newStepIndex) {
    this.setState({
      stepIndex: newStepIndex
    })
  }

  handlePrev = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex - 1
    })
  }

  render() {
    const { stepIndex } = this.state;
    const initialValues = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      role: 'none',
      terms: false
    }
    
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[stepIndex]}
        onSubmit={async (values, {setErrors, setSubmitting}) => {

          if(stepIndex === 0) {
            const response = await axios.post('/user/phoneNumber', values.phoneNumber)
            let phoneNumber = JSON.parse(JSON.stringify(response)).data
            setSubmitting(false)
            if(!phoneNumber) {
              this.handleNext()
            } else {
              setErrors({phoneNumber: 'Phone number already exists!'})
            }
          } else if(stepIndex === 1) {
            const response = await axios.post('/user/username', values.username)
            let userID = JSON.parse(JSON.stringify(response)).data
            setSubmitting(false)
            if(!userID) {
              this.handleNext()
            } else {
              setErrors({username: 'User already exists!'})
            }
          } else if (stepIndex === 2){
            const response = await axios.post('/user/email', values.email)
            let emailExists = JSON.parse(JSON.stringify(response)).data
            if(!emailExists) {
              let firstName = values.firstName;
              let lastName = values.lastName;
              let phoneNumber = values.phoneNumber;
              let username = values.username;
              let password = btoa(values.password);
              let email = values.email;
              let role = values.role;
              let createdUser = { firstName,
                lastName,
                phoneNumber,
                username,
                password,
                email,
                role 
              }; 
              const response = await axios.post('/user/create', createdUser)
              let message = String(JSON.parse(JSON.stringify(response)).data)
              console.log(message)
              setSubmitting(false)
              if(message.includes('phone')) {
                console.log('got here')
                await this.moveToStep(0)
                setErrors({ phoneNumber: message })
              } else if(message.includes('User')) {
                setErrors({ terms: message })
              } else if(message.includes('error')) {
                alert(message)
              }
              else {
                alert(message)
                this.handleNext()
              }
            
            } else {
              setSubmitting(false)
              setErrors({email: 'Email already exists!'})
            }
          } 
        }}
        render={({submitForm, isSubmitting, errors}) => (
          
          <Form>
            <TheDialog 
              stepIndex={stepIndex}
              errors={errors}
              submitForm={submitForm}
              isSubmitting={isSubmitting}
              handlePrev={this.handlePrev} />
          </Form>
        )}
      />
    );
  }
}

export default Signup;