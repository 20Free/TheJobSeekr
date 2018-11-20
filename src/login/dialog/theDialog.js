import React from 'react';
import { Dialog,
         DialogTitle} from '@material-ui/core';
import TheContent from './dialog_content/theContent';
import TheActions from './dialog_content/theActions';

export default function TheDialog(props) {
  const {
    errors,
    storedUser,
    isSubmitting,
    submitForm
  } = props;

  return(
    <Dialog
        open
        aria-labelledby="form-dialog-title"
    >
      <DialogTitle 
        id="form-dialog-title"
      >
        Sign In To TheJobSeekr
      </DialogTitle>
      <TheContent
        errors={errors}
        storedUser={storedUser}
        isSubmitting={isSubmitting}
      />
      <TheActions 
        submitForm={submitForm}
      />  
    </Dialog>
  );
}