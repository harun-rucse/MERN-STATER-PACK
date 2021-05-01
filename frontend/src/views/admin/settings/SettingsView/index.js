import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Loader from 'src/components/Loader';
import useNotification from 'src/hooks/useNotification';
import * as settingAction from 'src/store/actions/settingActions';
import UISettings from './UISettings';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();
  const notification = useNotification();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const { loading, data, error } = settings;

  useEffect(() => {
    dispatch(settingAction.fetchSetting());
  }, [dispatch]);

  const handleSubmit = (value) => {
    if (data) {
      dispatch(
        settingAction.updateSetting(data._id, value, () => {
          notification('Setting update successful', 'success');
        })
      );
    } else {
      dispatch(
        settingAction.createSetting(value, () => {
          notification('Setting create successful', 'success');
        })
      );
    }
  };

  if (error) {
    notification(error, 'error');
  }

  return (
    <Page className={classes.root} title="Settings">
      {loading ? (
        <Loader open={loading} />
      ) : (
        <Container maxWidth="lg">
          <UISettings data={data} handleSubmit={handleSubmit} />
        </Container>
      )}
    </Page>
  );
};

export default SettingsView;
