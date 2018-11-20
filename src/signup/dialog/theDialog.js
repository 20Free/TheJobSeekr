import React from 'react';
import { Dialog,
         DialogTitle,
         DialogContent } from '@material-ui/core';
import TheStepper from './dialog_content/theStepper';
import OtherContent from './dialog_content/otherContent';
import TheDialogActions from './dialog_content/theDialogActions';

export default function TheDialog(props) {
  const {
    stepIndex,
    errors,
    submitForm,
    isSubmitting,
    handlePrev
  } = props;

  return (
    <Dialog
      open
      aria-labelledby="label">
      <DialogTitle id="label">Signup for TheJobSeekr</DialogTitle>
      <DialogContent>
        <TheStepper stepIndex={stepIndex}/>
        <OtherContent errors={errors} 
                      stepIndex={stepIndex}
                      isSubmitting={isSubmitting}/>
        <TheDialogActions submitForm={submitForm}
                          isSubmitting={isSubmitting}
                          stepIndex={stepIndex}
                          handlePrev={handlePrev}/>
      </DialogContent>
    </Dialog>
  );
}