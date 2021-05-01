import React from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const FormSubmitButton = ({ label, color, ...rest }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Button color={color} variant="contained" onClick={handleSubmit} {...rest}>
      {label}
    </Button>
  );
};

FormSubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string
};

FormSubmitButton.defaultProps = {
  color: 'primary'
};

export default FormSubmitButton;
