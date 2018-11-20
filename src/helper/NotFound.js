import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { Paper, Typography, Grid } from '@material-ui/core'

const styles = theme => ({
  paper: {
    borderRadius: 25,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    boxShadow: '0 0 20px 10px rgba(0, 0, 0, .8)',
  },
  typography: {
    textAlign: 'center'
  }
});

class NotFound extends Component {
  render() {
    const { classes } = this.props;
    return(
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        style={{minHeight: '100vh'}}>

        <Grid 
          item 
          xs={20}>

          <Paper 
            className={classes.paper} 
            elevation={24}>

            <Typography 
              className={classes.typography} 
              variant="h3">
              404
            </Typography>

            <Typography 
              className={classes.typography} 
              variant="h5">
              Page not found.
            </Typography>
            
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);