import React from 'react';
import FirstFormFields from './fields/firstFormFields';
import SecondFormFields from './fields/secondFormFields';
import ThirdFormFields from './fields/thirdFormFields';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function OtherContent(props) {
  const {
    stepIndex,
    errors,
    isSubmitting
  } = props;

  function getStepContent(stepIndex, errors) {
    switch (stepIndex) {
      case 0:
        return <FirstFormFields />;
      case 1:
        return <SecondFormFields />;
      case 2: 
        return <ThirdFormFields errors={errors} />;
      default:
        return 'Your default stepper';
    }
  }

  return (
    <div>
      <div>
        {getStepContent(stepIndex, errors)}  
      </div><br/>
      <p>
        {"Have an account? "} 
        <a
          href="/login"
        >
         Login
        </a>
      </p><br/>
      {isSubmitting && <LinearProgress />} 
      <br/>
    </div>
  );
}