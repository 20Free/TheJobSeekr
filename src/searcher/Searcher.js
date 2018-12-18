import React, { Component } from 'react';
import AppNavbar from '../AppNavbar'
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import axios from 'axios';
import { Redirect } from '@reach/router';
import LoadingPage from '../helper/LoadingPage';
import LoadingPaper from '../helper/LoadingPaper';
import InputBase from '@material-ui/core/InputBase';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  searchButton: {
    marginRight: theme.spacing.unit * 2,
    marginTop: (theme.spacing.unit * 2) - 1,
    marginBottom: theme.spacing.unit,
    borderRadius: '0 34 34 0',
    elevation: 0,
    boxShadow: 'none',
    textTransform: 'none',
    '&:active': {
      boxShadow: 'none',
    },
  },
  search: {
    position: 'relative',
    borderRadius: '34 0 0 34',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 1)',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    height: 35,
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
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
    overflow: 'auto',
  },
  listItem: {
    borderRadius: 25,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
    boxShadow: '0 3px 6px 1px rgba(91, 91, 91, 0.8)',
  },
  applyButton: {
    margin: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  }
})

class SearcherHome extends Component {

  state = {
    isRole: false,
    isLoading: true,
    currTitle: '',
    currDesc: '',
    jobs: [],
    isSearching: false,
    searchText: '',
    currLink: '',
    buttonVisible: false,
  };


  componentDidMount() {
    this.checkRole();
  }

  checkRole() {
	console.log('got here')
    axios.post("/user/role", sessionStorage.getItem("username"))
    .then(response => {
      if(JSON.parse(JSON.stringify(response)).data === 'searcher') {
        this.setState({
          isRole: true,
          isLoading: false
        })
        this.loadJobs();
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
  
  loadJobs() {
	    this.setState({
	      isSearching: true
	    })
	    axios.post("https://thejobseekr-api.herokuapp.com/api/query", "a")
	    .then(response => {
	      this.setState({
	         jobs: JSON.parse(JSON.stringify(response)).data,
	         isSearching: false,
	      });
	    })
	    .catch(err => {
	      console.log(err);
	    });
	  }

  suggestJobs = evt => {
    const inputValue = evt.target.value;
    this.setState({
      searchText: inputValue,
    });
    this.filterJobs(inputValue);
  }

  filterJobs = inputValue => {
    const { jobs } = this.state;

    this.setState({
      jobs: jobs.filter(item => {
        return inputValue.split("").every(internalItem => {
          return item.metadata.title.toLowerCase().indexOf(internalItem.toLowerCase()) !== -1
              || item.content.toLowerCase().indexOf(internalItem.toLowerCase()) !== -1;
        });
      })
    });
  }

  setCurrTitleDescAndApplyLink = (title, description, id, ref) => {
	if(ref.match(/https:\/\/www.airbnb.ca\/careers\/departments\/position\/\d+/)) { //it's a career job
	    this.setState({
	      currTitle: title,
	      currDesc: description,
	      buttonVisible: true,
	      currLink: "https://www.airbnb.ca/careers/apply2/" + id + "?gh_src=",
	    })
	} else { //it's a contract job
		this.setState({
		  currTitle: title,
		  currDesc: description,
		  buttonVisible: true,
		  currLink: ref + "#app",
		})
	}
  }

  search = () => {
    const{ searchText } = this.state;
    this.setState({
      isSearching: true
    })
    if(searchText) {
      var query = searchText.replace(/\s/g, '|');
      axios.post('https://thejobseekr-api.herokuapp.com/api/query', query)
      .then(response => {
        this.setState({
           jobs: JSON.parse(JSON.stringify(response)).data,
           isSearching: false,
        });
      })
    }
  }

  linesToParagraphs = (nodes) => {
	   return nodes
	    .map(node => typeof node === 'string' ?
	       node.split('\n').map(text => <p>{text}</p>) : node)
	        .reduce((nodes, node) => nodes.concat(node), []);
  }


  render() {
    const { classes } = this.props;
    const { isLoading, isRole, currTitle, currDesc, searchText, isSearching, jobs, currLink, buttonVisible} = this.state;


    return (<div>{!isLoading ? (<div> { isRole ? (
      <div>
        <AppNavbar />
        <div className={classes.root}>
          <Grid container >
            <Grid item xs={6} style={{overflow: 'auto', maxHeight: window.innerHeight * 0.92}}>
              <Grid container>
                <Grid item xs={10}>
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
                    >
                    {searchText}
                    </InputBase>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <Button className={classes.searchButton} variant="contained" color="secondary" fullWidth onClick={this.search}>
                    Search
                  </Button>
                </Grid>
              </Grid>
              {isSearching ?
                (<LoadingPaper/>):
                (jobs.map((job, i) => (
                  <Paper key={i} onClick={this.setCurrTitleDescAndApplyLink.bind(this, job.metadata.title, job.content, job.jobID, job.reference)} className={classes.listItem} elevation={1}>
                    <Typography variant="h6">
                      {job.metadata.title}
                    </Typography>
                    <Typography noWrap variant="body1">
                      {job.content}
                    </Typography>
                  </Paper>))
                )}
            </Grid>
            <Grid item xs={6} >
              <Paper className={classes.paper} elevation={1}>
                <Typography variant="h6">
                  {currTitle}
                </Typography>
                <Typography variant="body1">
                  {(currDesc.split('\n').map(text => <p>{text}</p>) : node)
      	        .reduce((nodes, node) => nodes.concat(node), [])}
                  {buttonVisible ?
                  (<Button variant="contained" color="secondary" className={classes.applyButton} href={currLink}>
                    Apply Now
                  </Button>) : (null)}
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
