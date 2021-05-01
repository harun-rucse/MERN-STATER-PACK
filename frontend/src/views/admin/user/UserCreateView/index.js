import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import Loader from 'src/components/Loader';
import useNotification from 'src/hooks/useNotification';
import * as userAction from 'src/store/actions/userActions';
import UserCreateFrom from './UserCreateForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UserCreateView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const notification = useNotification();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);

  const { loading, error } = userList;

  const handleSubmit = (value) => {
    const { name, email, password, passwordConfirm, role, photo } = value;
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('passwordConfirm', passwordConfirm);
    data.append('role', role);
    if (photo.length) data.append('photo', photo[0]);

    dispatch(
      userAction.createUser(data, () => {
        notification('User create successful', 'success');
        navigate('/admin/users');
      })
    );
  };

  if (error) {
    notification(error, 'error');
  }

  return (
    <Page className={classes.root} title="Create new user">
      {loading && <Loader open={loading} />}
      <Container maxWidth="lg">
        <UserCreateFrom handleSubmit={handleSubmit} />
      </Container>
    </Page>
  );
};

export default UserCreateView;
