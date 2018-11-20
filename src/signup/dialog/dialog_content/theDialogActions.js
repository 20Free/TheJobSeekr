import React from 'react';
import { DialogActions, Button } from '@material-ui/core';

export default function TheDialogActions(props) {
  const {
    stepIndex,
    isSubmitting,
    submitForm,
    handlePrev
  } = props;

  return (
    <DialogActions>
      <Button
        disabled={stepIndex === 0}
        variant="contained"
        onClick={handlePrev}
      >
        Back
      </Button>
      <Button
        color="secondary"
        variant="contained"
        disabled={isSubmitting}
        onClick={submitForm}
      >
        {stepIndex === 2 ? 'Submit' : 'Next'}
      </Button>
      <Button
        color="primary"
        variant="contained"
        href='/login'
      >
        Cancel           
      </Button>
    </DialogActions>
  );
}