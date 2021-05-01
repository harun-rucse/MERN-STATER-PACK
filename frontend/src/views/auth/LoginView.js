import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  Box,
  Container,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import {
  Form,
  FormTextField,
  FormSubmitButton
} from 'src/components/admin/form';
import Loader from 'src/components/Loader';
import useNotification from 'src/hooks/useNotification';
import * as authAction from 'src/store/actions/authActions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label('Email'),
  password: Yup.string()
    .min(6)
    .required()
    .label('Password')
});

const LoginView = () => {
  const classes = useStyles();
  const notification = useNotification();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { loading, authInfo, error } = auth;

  useEffect(() => {
    if (authInfo) {
      window.location = authInfo.role === 'admin' ? '/admin/dashboard' : '/';
    }
  }, [authInfo]);

  const handleSubmit = (value) => {
    const { email, password } = value;
    dispatch(
      authAction.login(email, password, () => {
        notification('Login successful', 'success');
      })
    );
  };

  if (error) {
    notification(error, 'error');
  }

  return (
    <Page className={classes.root} title="Login">
      {loading && <Loader open={loading} />}
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Form
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Box mb={3}>
              <Typography color="textPrimary" variant="h2">
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in on the internal world
              </Typography>
            </Box>
            <FormTextField
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              required
            />
            <FormTextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              required
            />
            <Box my={2}>
              <FormSubmitButton
                label="Sing in now"
                size="large"
                color="primary"
              />
            </Box>
            <Typography color="textSecondary" variant="body1">
              Don&apos;t have an account?
              <Link component={RouterLink} to="/register" variant="h6">
                Sign up
              </Link>
            </Typography>
          </Form>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
