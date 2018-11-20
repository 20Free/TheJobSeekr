import React from 'react';
import { Field } from 'formik';
import { TextField,
         CheckboxWithLabel } from 'formik-material-ui';

export default function TheFields(props) {
  const {
    storedUser
  } = props;

  return (
    <div>    
      <Field
        name="username"
        label="Username"
        component={TextField}
        value={storedUser}
        fullWidth
      />
      <br/><br/>
      <Field
        name="password"
        type="password"
        label="Password"
        component={TextField}
        fullWidth
      />
      <br/><br/>
      <Field
        name="remember"
        Label={{ label: "Remember Me" }}
        component={CheckboxWithLabel}
      />
      <br/>
    </div>
  );
}