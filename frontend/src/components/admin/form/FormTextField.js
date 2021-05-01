import React from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const FormField = ({ name, label, ...rest }) => {
  const {
    touched,
    errors,
    setFieldValue,
    values,
    setFieldTouched
  } = useFormikContext();

  return (
    <TextField
      name={name}
      label={label}
      margin="normal"
      onBlur={() => setFieldTouched(name)}
      onChange={(e) => setFieldValue(name, e.target.value)}
      value={values[name]}
      variant="outlined"
      error={Boolean(touched[name] && errors[name])}
      helperText={touched[name] && errors[name]}
      {...rest}
    />
  );
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default FormField;
