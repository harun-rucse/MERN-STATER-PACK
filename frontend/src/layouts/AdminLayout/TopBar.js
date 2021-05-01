import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import useNotification from 'src/hooks/useNotification';
import * as authAction from 'src/store/actions/authActions';
import * as settingAction from 'src/store/actions/settingActions';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginLeft: theme.spacing(1)
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const notification = useNotification();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

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
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        {setting && (
          <Typography variant="h4" className={classes.title}>
            {setting.dashboardTitle}
          </Typography>
        )}
        <Box flexGrow={1} />
        <Box>
          <IconButton color="inherit" onClick={handleLogout}>
            <InputIcon />
          </IconButton>
        </Box>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
