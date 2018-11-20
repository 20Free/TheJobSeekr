import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import {CircularProgress, Paper, Grid} from '@material-ui/core'

const styles = theme => ({
  root: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  paper: {
    borderRadius: 25,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
});

class LoadingPage extends Component {
  render() {
    const { classes } = this.props;
    return(
      <Grid
        className={classes.root}
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
}

LoadingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingPage);