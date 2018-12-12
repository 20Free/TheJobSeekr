import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LoadingPaper from './LoadingPaper.js'

const styles = theme => ({
  root: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },

});

class LoadingPage extends Component {
  render() {
    const { classes } = this.props;
    return(
      <div
        className={classes.root}
      >
          <LoadingPaper/>
      </div>
    );
  }
}

LoadingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingPage);
