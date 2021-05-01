import React from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme) => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));

const LatestUsers = ({ className, users, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Latest users" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Photo</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow hover key={user._id}>
                  <TableCell>
                    <Avatar
                      alt="User"
                      src={user.photo}
                      className={classes.avatar}
                    />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip color="primary" label={user.role} size="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onClick={() => navigate('/admin/users', { replace: true })}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestUsers.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default LatestUsers;
