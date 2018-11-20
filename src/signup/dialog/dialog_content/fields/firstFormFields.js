import React from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

export default function FirstFormFields() {
  return (
    <div>
      <Field
        required
        name="firstName"
        label="First Name"
        fullWidth
        component={TextField}
      />
      <br /><br/>
      <Field
        required
        name="lastName"
        label="Last Name"
        fullWidth
        component={TextField}
      />
      <br /><br/>
      <Field
        required
        name="phoneNumber"
        label="Phone Number"
        fullWidth
        component={TextField}
      />
    </div>
  );
}