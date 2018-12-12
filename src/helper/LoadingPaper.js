import React from 'react';
import {CircularProgress, Paper, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    borderRadius: 25,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
})

function LoadingPaper(props) {
  const {classes} = props;
  return(
    <Grid
      container
      alignItems="center"
      justify="center"
      direction="column"
      style={{minHeight: '100vh'}}
    >
      <Grid
        item
        xs={20}
      >
        <Paper
          className={classes.paper}
          elevation={24}
        >
          <CircularProgress
            disableShrink
            color='primary'
            thickness={3.6}
            size={100}
            variant='indeterminate'
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

LoadingPaper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingPaper);
