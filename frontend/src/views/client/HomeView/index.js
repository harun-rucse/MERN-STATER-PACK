import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const HomeView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Welcome screen">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Typography align="center" variant="h4">
          Welcome to MERN World!
        </Typography>
      </Box>
    </Page>
  );
};

export default HomeView;
