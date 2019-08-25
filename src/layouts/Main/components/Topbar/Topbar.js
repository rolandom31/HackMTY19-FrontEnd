import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  let styling = {
    maxHeight: '50px',
    
  };
  const topcolor ={
    backgroundColor: '#FFFFFF'
  };
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      style={topcolor}
    >
      <Toolbar>
        
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/images/logos/JDA.png"
            style={styling}
          />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
