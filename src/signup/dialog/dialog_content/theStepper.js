import React from 'react';
import {Stepper, Step, StepLabel} from '@material-ui/core';

export default function TheStepper(props) {
  const {
    stepIndex    
  } = props;

  return (
    <Stepper activeStep={stepIndex}>
      <Step>
        <StepLabel>Basic Info</StepLabel>
      </Step>
      <Step>
        <StepLabel>Login Info</StepLabel>
      </Step>
      <Step>
        <StepLabel>Other Info</StepLabel>
      </Step>
    </Stepper>
  );
}