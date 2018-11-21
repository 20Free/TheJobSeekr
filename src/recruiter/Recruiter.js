import React, { Component } from 'react';
import AppNavbar from '../AppNavbar';
import axios from 'axios';
import { Redirect } from '@reach/router';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import plus from '../icons/plus.png';
import LoadingPage from '../helper/LoadingPage';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit * 2,
    display: 'center',
    flexWrap: 'wrap',
  },
  bigButton: {
    borderRadius: 25,
    boxShadow: '0 3px 6px 1px rgba(91, 91, 91, 0.8)',
    textTransform: 'none'

  },
  topText: {
    paddingLeft: theme.spacing.unit,
    fontSize: theme.spacing.unit * 5.7,
    color: 'rgba(255, 255, 255, 0.67)'
  },
  bottomText: {
    fontSize: theme.spacing.unit * 5.7,
    color: 'rgba(255, 255, 255, 0.67)'
  }
})

class RecruiterHome extends Component {
  
  state = {
    isRole: false,
    isLoading: true
  }
  
  componentDidMount() {
    this.checkRole();
  }

  checkRole() {
    axios.post("/user/role", sessionStorage.getItem("username"))
    .then(response => {
      console.log("response data: " + response.data);
      if(JSON.parse(JSON.stringify(response)).data === 'recruiter') {
        this.setState({
          isRole: true,
          isLoading: false
        })
      } else {
        this.setState({
          isLoading: false
        })
        return(<Redirect to="access_denied"/>)
      }
    })
    .catch(err => {
      console.log(err)
      this.setState({
        isLoading: false
      })
      return(<Redirect to="access_denied"/>)
    })
  }

  render() {
    const { classes } = this.props;
    const { isLoading, isRole } = this.state;
    return ( <div>{!isLoading ? (<div>{isRole ? (<div>
      <AppNavbar />
      <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '85vh', maxWidth:'98%' }}
          className={classes.root}
        >
          <Button variant='contained' color='primary' className={classes.bigButton}>
            <Grid justify='center'  zeroMinWidth alignItems='center' className={classes.grid}>
              <Grid item xs={12} zeroMinWidth>
                <p className={classes.topText} align='center'>
                  Want to recruit someone?
                </p>
              </Grid>
              <br/>
              <Grid item xs={12}>
                <img src={plus} alt="Plus" height="200" width="200" />
              </Grid>
              <br/>
              <Grid item xs={12}>
                <p align='center' className={classes.bottomText}>
                  Post a Job
                </p>
              </Grid>
            </Grid>
          </Button>
      </Grid>
    </div>) : (
      <Redirect to="/access_denied"/>
    )}</div>) : (<LoadingPage />)}</div>
      
    );
  }
}

RecruiterHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecruiterHome);