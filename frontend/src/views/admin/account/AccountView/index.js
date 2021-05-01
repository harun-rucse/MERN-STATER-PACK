import React, { useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'src/components/Page';
import Loader from 'src/components/Loader';
import useNotification from 'src/hooks/useNotification';
import * as userAction from 'src/store/actions/userActions';
import * as authAction from 'src/store/actions/authActions';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import PasswordUpdate from './PasswordUpdate';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  passwordContainer: {
    marginTop: theme.spacing(3)
  }
}));

const AccountView = () => {
  const classes = useStyles();
  const notification = useNotification();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const passwordChange = useSelector((state) => state.passwordChange);

  const {
    loading: profileLoading,
    data: user,
    error: profileError
  } = userProfile;
  const { loading: passwordLoading, error: passwordError } = passwordChange;

  useEffect(() => {
    dispatch(userAction.fetchProfile());
  }, [dispatch]);

  const handleProfileSubmit = (value) => {
    const { name, email, photo } = value;
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    if (photo.length) data.append('photo', photo[0]);

    dispatch(
      userAction.updateProfile(data, () => {
        notification('Profile update successful', 'success');
      })
    );
  };

  const handlePasswordSubmit = (value) => {
    console.log(value);
    dispatch(
      authAction.updateUserPassword(value, () => {
        notification('Password successfully changed', 'success');
      })
    );
  };

  if (profileError || passwordError) {
    notification(profileError || passwordError, 'error');
  }

  return (
    <Page className={classes.root} title="Account">
      {profileLoading ||
        (passwordLoading && (
          <Loader open={profileLoading || passwordLoading} />
        ))}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} xs={12}>
            {user && <Profile user={user} />}
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            {user && (
              <ProfileDetails user={user} handleSubmit={handleProfileSubmit} />
            )}
            <PasswordUpdate
              className={classes.passwordContainer}
              handleSubmit={handlePasswordSubmit}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default AccountView;
