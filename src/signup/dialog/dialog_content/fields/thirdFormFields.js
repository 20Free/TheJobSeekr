import React from 'react';
import { Field } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import { FormControl, FormHelperText, MenuItem } from '@material-ui/core';

export default function ThirdFormFields(props) {
  const {
    errors
  } = props;

  const roles = [
    {
      value: 'none',
      label: 'Please Select a Role',
    },
    {
      value: 'searcher',
      label: 'Searcher',
    },
    {
      value: 'recruiter',
      label: 'Recruiter',
    },
  ];

  return (
    <div>
      <FormControl error>
        <FormHelperText>{errors.terms}</FormHelperText>
        <br />
        <Field
          required
          name="email"
          type="email"
          label="Email"
          fullWidth
          component={TextField}
        />
        <br /><br/>
        <Field
          required
          select
          name="role"
          component={TextField}
          fullWidth
        >
          {roles.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Field>
        <br /><br/>
        <Field
          name="terms"
          Label={{ label: 'Accept the Terms and Conditions' }}
          component={CheckboxWithLabel}
        />
      </FormControl>
  </div>);
}