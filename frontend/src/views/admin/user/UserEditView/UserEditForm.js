import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Button,
  makeStyles
} from '@material-ui/core';
import {
  Form,
  FormTextField,
  FormSelectField,
  FormImagePicker,
  FormSubmitButton
} from 'src/components/admin/form';

const useStyles = makeStyles((theme) => ({
  cancelButton: {
    marginRight: theme.spacing(2)
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
  role: Yup.string()
    .required()
    .label('Role')
});

const UserEditForm = ({ user, handleSubmit }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Form
      initialValues={{
        name: user.name,
        email: user.email,
        role: user.role,
        photo: ''
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Grid container spacing={6}>
        <Grid item lg={7} md={6} xs={12}>
          <Card>
            <CardHeader
              subheader="Update an existing user"
              title="Update a user"
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
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={5} md={6} xs={12}>
          <Card>
            <CardHeader title="User Permissions" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <FormSelectField
                    fullWidth
                    label="Select user Role"
                    name="role"
                    required
                  >
                    <option value="" disabled />
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </FormSelectField>
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
              <Button
                className={classes.cancelButton}
                color="secondary"
                variant="contained"
                onClick={() => navigate('/admin/users')}
              >
                Cancel
              </Button>
              <FormSubmitButton label="Edit user" color="primary" />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
};

UserEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default UserEditForm;
