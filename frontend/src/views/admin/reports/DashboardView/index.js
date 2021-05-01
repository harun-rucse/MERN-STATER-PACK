import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, makeStyles } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import Page from 'src/components/Page';
import * as userAction from 'src/store/actions/userActions';
import LatestUsers from './LatestUsers';
import TotalQuantityCard from './TotalQuantityCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  card: {
    height: theme.spacing(12)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);

  const { data: users } = userList;

  useEffect(() => {
    dispatch(userAction.fetchUsers());
  }, [dispatch]);

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            {users && (
              <TotalQuantityCard
                label="TOTAL USERS"
                quantity={Object.values(users).length}
                Icon={PeopleIcon}
              />
            )}
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            {users && (
              <TotalQuantityCard
                label="TOTAL USERS"
                quantity={Object.values(users).length}
                Icon={PeopleIcon}
              />
            )}
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            {users && (
              <TotalQuantityCard
                label="TOTAL USERS"
                quantity={Object.values(users).length}
                Icon={PeopleIcon}
              />
            )}
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            {users && (
              <TotalQuantityCard
                label="TOTAL USERS"
                quantity={Object.values(users).length}
                Icon={PeopleIcon}
              />
            )}
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Grid container spacing={3}>
              <Grid item lg={12} sm={12} xl={12} xs={12}>
                {users && (
                  <TotalQuantityCard
                    label="TOTAL USERS"
                    quantity={Object.values(users).length}
                    className={classes.card}
                    Icon={PeopleIcon}
                  />
                )}
              </Grid>
              <Grid item lg={12} sm={12} xl={12} xs={12}>
                {users && (
                  <TotalQuantityCard
                    label="TOTAL USERS"
                    quantity={Object.values(users).length}
                    className={classes.card}
                    Icon={PeopleIcon}
                  />
                )}
              </Grid>
              <Grid item lg={12} sm={12} xl={12} xs={12}>
                {users && (
                  <TotalQuantityCard
                    label="TOTAL USERS"
                    quantity={Object.values(users).length}
                    className={classes.card}
                    Icon={PeopleIcon}
                  />
                )}
              </Grid>
              <Grid item lg={12} sm={12} xl={12} xs={12}>
                {users && (
                  <TotalQuantityCard
                    label="TOTAL USERS"
                    quantity={Object.values(users).length}
                    className={classes.card}
                    Icon={PeopleIcon}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={9} md={12} xl={9} xs={12}>
            {users && <LatestUsers users={Object.values(users).slice(0, 5)} />}
          </Grid>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Typography variant="h1">Other table list</Typography>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
