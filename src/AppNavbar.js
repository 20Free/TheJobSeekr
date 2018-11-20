import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import symbol from './icons/symbol.png'
import { navigate } from '@reach/router';

const styles = {
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    color: 'black',
  },
};

class AppNavbar extends Component {

  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.handleClose();
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('username');
    console.log('logging out...');
    navigate("login");
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    return (
      
      <div className={classes.toolbar}>
        <AppBar position="static" color="primary"  >
          <Toolbar >
            <Typography variant="title" color="inherit" className={classes.grow} >
                Home
              </Typography>
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <img src={symbol} alt="Profile Icon" height="25" width="25" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </div>);
  }
}

AppNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppNavbar);