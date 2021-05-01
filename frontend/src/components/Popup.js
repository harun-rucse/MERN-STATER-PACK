import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

const Popup = ({ open, setOpen, message, handleDelete }) => {
  return (
    <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        <Typography variant="h3" color="secondary">
          Are you sure?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Popup.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Popup;
