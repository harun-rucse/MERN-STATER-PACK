import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Loader from 'src/components/Loader';
import useNotification from 'src/hooks/useNotification';
import * as userAction from 'src/store/actions/userActions';
import UserEditForm from './UserEditForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UserEditView = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const notification = useNotification();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);

  const { loading, data: users, error } = userList;

  useEffect(() => {
    dispatch(userAction.fetchUser(id));
  }, [dispatch]);

  const handleSubmit = (value) => {
    const { name, email, role, photo } = value;
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('role', role);
    if (photo.length) data.append('photo', photo[0]);

    dispatch(
      userAction.updateUser(id, data, () => {
        notification('User update successful', 'success');
        navigate('/admin/users');
      })
    );
  };

  if (error) {
    notification(error, 'error');
  }

  return (
    <Page className={classes.root} title="Update a user">
      {loading && <Loader open={loading} />}
      <Container maxWidth="lg">
        {users && users[id] && (
          <UserEditForm user={users[id]} handleSubmit={handleSubmit} />
        )}
      </Container>
    </Page>
  );
};

export default UserEditView;
