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
  name: Yup.string()
    .required()
    .label('User name'),
  email: Yup.string()
    .required()
    .email()
    .label('Email'),
  password: Yup.string()
    .min(6)
    .required()
    .label('Password'),
  passwordConfirm: Yup.string()
    .min(6)
    .required()
    .label('Confirm Password')
});

const RegisterView = () => {
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
    dispatch(
      authAction.register(value, () => {
        notification('Register successful', 'success');
      })
    );
  };

  if (error) {
    notification(error, 'error');
  }

  return (
    <Page className={classes.root} title="Register">
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
              name: '',
              email: '',
              password: '',
              passwordConfirm: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Box mb={3}>
              <Typography color="textPrimary" variant="h2">
                Create new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create new account
              </Typography>
            </Box>
            <FormTextField
              name="name"
              label="User name"
              type="text"
              fullWidth
              required
            />
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
            <FormTextField
              name="passwordConfirm"
              label="Confirm Password"
              type="password"
              fullWidth
              required
            />
            <Box my={2}>
              <FormSubmitButton
                label="Sing up now"
                size="large"
                color="primary"
              />
            </Box>
            <Typography color="textSecondary" variant="body1">
              Have an account?
              <Link component={RouterLink} to="/login" variant="h6">
                Sign in
              </Link>
            </Typography>
          </Form>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
