import React from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

export default function SecondFormFields() {
  return (
    <div>
      <Field
        required
        name="username"
        label="Username"
        fullWidth
        component={TextField}
      />
      <br /><br/>
      <Field
        required
        type="password"
        label="Password"
        name="password"
        fullWidth
        component={TextField}
      />
      <br /><br/>
      <Field
        required
        type="password"
        label="Confirm Password"
        name="confirmPassword"
        fullWidth
        component={TextField}
      />
    </div>);
}