import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Logo from 'src/components/Logo';
import getFirstName from 'src/utils/getFirstName';
import useNotification from 'src/hooks/useNotification';
import * as authAction from 'src/store/actions/authActions';
import * as settingAction from 'src/store/actions/settingActions';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
  Avatar,
  Menu,
  MenuItem,
  Box
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    flexGrow: 1
  },
  logo: {
    marginRight: theme.spacing(1)
  },
  toolbar: {
    height: 64
  },
  login: {
    color: '#fff'
  },
  profile: {
    color: '#fff'
  }
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();
  const notification = useNotification();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = useSelector((state) => state.auth);
  const settings = useSelector((state) => state.settings);

  const { authInfo } = auth;
  const { data: setting } = settings;

  useEffect(() => {
    dispatch(settingAction.fetchSetting());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(authAction.logout());
    notification('Logout successful', 'success');
  };

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.logo}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
        {setting && (
          <Typography variant="h4" className={classes.title}>
            {setting.frontendTitle}
          </Typography>
        )}

        {authInfo ? (
          <>
            <Typography variant="subtitle1">
              {`Hello ${getFirstName(authInfo.name)}`}
            </Typography>
            <IconButton className={classes.profile} onClick={handleMenu}>
              <Avatar src={authInfo.photo} alt={authInfo.name} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              <RouterLink to="/admin/dashboard">
                <MenuItem onClick={handleClose}>Admin Panel</MenuItem>
              </RouterLink>
              <RouterLink to="/profile">
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </RouterLink>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <RouterLink to="/login">
            <Typography variant="subtitle2" className={classes.login}>
              Login
            </Typography>
          </RouterLink>
        )}
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
