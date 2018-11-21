import React, { Component } from 'react';
import AppNavbar from '../AppNavbar'
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Redirect } from '@reach/router';
import LoadingPage from '../helper/LoadingPage';
import InputBase from '@material-ui/core/InputBase';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: 34,
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 1)',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    height: 35,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
  },
  searchIcon: {
    width: theme.spacing.unit * 4,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'grey',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 4,
    transition: theme.transitions.create('width'),
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: window.innerHeight * 0.85,
    margin: theme.spacing.unit,
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 1)',
    borderRadius: 0,
  },
  listItem: {
    borderRadius: 25,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
    boxShadow: '0 3px 6px 1px rgba(91, 91, 91, 0.8)',
  }
})

const jobs = [
  {
    title: 'Example Job title 1',
    description: 'Example quick description of job 1 overflow text overflow textoverflow textoverflow textoverflow textoverflow textoverflow textoverflow textoverflow textoverflow textoverflow textoverflow textoverflow textoverflow text'
  },
  {
    title: 'Example Job title 2',
    description: 'Example quick description of job 2'
  }
];

class SearcherHome extends Component {

  state = {
    isRole: false,
    isLoading: true,
    currTitle: '',
    currDesc: '',
    jobs,
    filtered: jobs,
  };

  
  componentDidMount() {
    this.checkRole();
  }

  checkRole() {
    axios.post("/user/role", sessionStorage.getItem("username"))
    .then(response => {
      if(JSON.parse(JSON.stringify(response)).data === 'searcher') {
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

  suggestJobs = evt => {
    const inputValue = evt.target.value;
    this.filterJobs(inputValue);
  }

  filterJobs = inputValue => {
    const { jobs } = this.state;
    
    this.setState({
      filtered: jobs.filter(item => {
        return inputValue.split("").every(internalItem => {
          return item.title.toLowerCase().indexOf(internalItem.toLowerCase()) !== -1
              || item.description.toLowerCase().indexOf(internalItem.toLowerCase()) !== -1; 
        });
      })
    });
  }

  setCurrTitleAndDesc (title, description) {
    this.setState({
      currTitle: title,
      currDesc: description
    })
  }

  render() {
    const { classes } = this.props;
    const { isLoading, isRole, currTitle, currDesc, filtered } = this.state;

    
    return (<div>{!isLoading ? (<div> { isRole ? (
      <div>
        <AppNavbar />
        <div className={classes.root}>
          <Grid container >
            <Grid item xs={6}>
              <div className={classes.search} >
                <div className={classes.searchIcon}>
                  <SearchIcon />
                 </div>
                <InputBase
                  placeholder="Search for jobs..."
                  fullWidth
                  onChange={this.suggestJobs}
                  classes={{
                    input: classes.inputInput,
                  }}
                />
              </div>
              {filtered.map((job, i) => (
                <Paper key={i} onClick={this.setCurrTitleAndDesc.bind(this, job.title, job.description)} className={classes.listItem} elevation={1}>
                  <Typography variant="h6">
                    {job.title}
                  </Typography>
                  <Typography noWrap variant="body1">
                    {job.description}
                  </Typography>
                </Paper>))}
            </Grid>
            <Grid item xs={6} >
              <Paper className={classes.paper} elevation={1}>
                <Typography variant="h6">
                  {currTitle}
                </Typography>
                <Typography variant="body1">
                  {currDesc}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>): 
      (<Redirect to="access_denied"/>)}</div>): 
      (<div><LoadingPage /></div>)}</div>
    );
  }
}

SearcherHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearcherHome);