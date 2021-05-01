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
  dashboardTitle: Yup.string()
    .required()
    .label('Dashboard Title'),
  frontendTitle: Yup.string()
    .required()
    .label('Frontend Title')
});

const UISettings = ({ data, handleSubmit, className }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <Form
        initialValues={{
          dashboardTitle: data ? data.dashboardTitle : '',
          frontendTitle: data ? data.frontendTitle : ''
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <CardHeader
          subheader="UI Settings"
          title="Customize ui settings both admin and frontend"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormTextField
                name="dashboardTitle"
                label="Dashboard Title"
                type="text"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormTextField
                name="frontendTitle"
                label="Frontend Title"
                type="text"
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <FormSubmitButton
            label={data ? 'Update' : 'Create'}
            color={data ? 'secondary' : 'primary'}
          />
        </Box>
      </Form>
    </Card>
  );
};

UISettings.propTypes = {
  data: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default UISettings;
