import React from 'react';
import { Button,
         DialogActions } from '@material-ui/core';

export default function TheActions(props) {
  const {
    submitForm
  } = props;

  const dialogActionsStyle = {
    margin: '20px 20px',
  }

  return(
    <DialogActions
      style={dialogActionsStyle}
    >
      <Button
        href="/login"
        color="secondary"
        variant="contained"
      >
        Cancel
      </Button>,
      <Button
        onClick={submitForm}
        color="primary"
        variant="contained"
      >
        Submit
      </Button>,
    </DialogActions>
  );
}