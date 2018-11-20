import React from 'react';
import { DialogContent,
         FormControl,
         FormHelperText,
         LinearProgress } from '@material-ui/core/';
import TheFields from './theFields';

export default function TheContent(props) {
  const {
    storedUser,
    errors,
    isSubmitting
  } = props;

  return(
    <DialogContent>
        <FormControl 
          error
        >
          <FormHelperText>
            {errors.errorMsg}
          </FormHelperText>
        </FormControl>
        <TheFields
          storedUser={storedUser}
        />
        <div>
          <p>
            Don't have an account? <br/>
            <a
              href="/signup"
            >
              Sign Up Now
            </a>
          </p> 
            
          {isSubmitting && <LinearProgress/>}
          
        </div>
      </DialogContent>
  );
}