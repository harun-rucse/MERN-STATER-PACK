import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5)
  },
  success: {
    backgroundColor: theme.palette.success.light,
    '& .MuiButton-label': {
      color: theme.palette.success.main
    }
  },
  error: {
    backgroundColor: theme.palette.error.light,
    '& .MuiButton-label': {
      color: theme.palette.error.main
    }
  }
}));

const ActionButton = ({ onClick, color, children }) => {
  const classes = useStyle();

  return (
    <Button onClick={onClick} className={`${classes.root} ${classes[color]}`}>
      {children}
    </Button>
  );
};

ActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default ActionButton;
