import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

const FormImagePicker = ({ label, name, filesLimit, ...rest }) => {
  const { setFieldValue } = useFormikContext();

  return (
    <DropzoneArea
      filesLimit={filesLimit}
      showAlerts={false}
      acceptedFiles={['image/*']}
      dropzoneText={label}
      onChange={(files) => setFieldValue(name, files)}
      {...rest}
    />
  );
};

FormImagePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  filesLimit: PropTypes.number
};

FormImagePicker.defaultProps = {
  filesLimit: 1
};

export default FormImagePicker;
