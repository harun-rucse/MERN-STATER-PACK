import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    height: 56,
    width: 56
  },
  green: {
    backgroundColor: colors.green[600]
  },
  red: {
    backgroundColor: colors.red[600]
  },
  orange: {
    backgroundColor: colors.orange[600]
  }
}));

const TotalQuantityCard = ({
  className,
  label,
  quantity,
  Icon,
  color,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {label}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {quantity}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={`${classes.avatar} ${classes[color]}`}>
              <Icon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalQuantityCard.propTypes = {
  className: PropTypes.string,
  quantity: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  Icon: PropTypes.node.isRequired,
  color: PropTypes.string
};

TotalQuantityCard.defaultProps = {
  color: 'green'
};

export default TotalQuantityCard;
