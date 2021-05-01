import React from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles
} from '@material-ui/core';
import {
  Form,
  FormTextField,
  FormSubmitButton
} from 'src/components/admin/form';

const useStyles = makeStyles(() => ({
  root: {}
}));

const validationSchema = Yup.object().shape({
  passwordCurrent: Yup.string()
    .required()
    .min(6)
    .label('Current Password'),
  password: Yup.string()
    .required()
    .min(6)
    .label('New Password'),
  passwordConfirm: Yup.string()
    .required()
    .min(6)
    .label('Confirm Password')
});

const PasswordUpdate = ({ handleSubmit, className }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <Form
        initialValues={{
          passwordCurrent: '',
          password: '',
          passwordConfirm: ''
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <CardHeader
          subheader="Your can update your password"
          title="Change Password"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <FormTextField
                name="passwordCurrent"
                label="Current Password"
                type="password"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormTextField
                name="password"
                label="New Password"
                type="password"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormTextField
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <FormSubmitButton label="Change Password" color="secondary" />
        </Box>
      </Form>
    </Card>
  );
};

PasswordUpdate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default PasswordUpdate;
