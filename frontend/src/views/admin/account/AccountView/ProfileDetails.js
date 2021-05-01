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
  FormImagePicker,
  FormSubmitButton
} from 'src/components/admin/form';

const useStyles = makeStyles(() => ({
  root: {}
}));

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .label('User name'),
  email: Yup.string()
    .required()
    .email()
    .label('Email')
});

const ProfileDetails = ({ user, handleSubmit, className }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <Form
        initialValues={{
          name: user.name,
          email: user.email,
          photo: ''
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <CardHeader
          subheader="Your basic profile information"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <FormTextField
                name="name"
                label="User Name"
                type="text"
                fullWidth
                required
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormTextField
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                required
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormImagePicker
                name="photo"
                label="Drag and drop an image here or click"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <FormSubmitButton label="Update Profile" color="primary" />
        </Box>
      </Form>
    </Card>
  );
};

ProfileDetails.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default ProfileDetails;
