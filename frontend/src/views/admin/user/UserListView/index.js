import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'src/components/Page';
import Loader from 'src/components/Loader';
import useNotification from 'src/hooks/useNotification';
import * as userAction from 'src/store/actions/userActions';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UserListView = () => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const notification = useNotification();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);

  const { loading, data: users, error } = userList;

  useEffect(() => {
    dispatch(userAction.fetchUsers());
  }, [dispatch]);

  const handleSetUserId = (id) => {
    setOpenPopup(true);
    setDeleteUserId(id);
  };

  const handleDelete = () => {
    dispatch(
      userAction.deleteUser(deleteUserId, () => {
        notification('User delete success', 'success');
      })
    );
    setOpenPopup(false);
  };

  if (error) {
    notification(error, 'error');
  }

  return (
    <Page className={classes.root} title="User list">
      {loading && <Loader open={loading} />}
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          {users && (
            <Results
              users={Object.values(users)}
              open={openPopup}
              setOpen={setOpenPopup}
              handleDelete={handleDelete}
              handleSetUserId={handleSetUserId}
            />
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default UserListView;
