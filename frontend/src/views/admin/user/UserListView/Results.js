import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Box, Card, makeStyles, Avatar, Chip } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import Table from 'src/components/admin/Table';
import ActionButton from 'src/components/admin/ActionButton';
import Popup from 'src/components/Popup';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const UserResult = ({
  className,
  users,
  open,
  setOpen,
  handleDelete,
  handleSetUserId,
  ...rest
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const columns = [
    {
      name: 'photo',
      label: 'Photo',
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: 'role',
      label: 'Role',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value === 'admin' ? (
            <Chip color="secondary" label={value} size="small" />
          ) : (
            <Chip color="primary" label={value} size="small" />
          );
        }
      }
    },
    {
      name: 'createdAt',
      label: 'Created At',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'updatedAt',
      label: 'Updated At',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => {
          return (
            <>
              <ActionButton
                color="success"
                onClick={() => navigate(`/admin/users/edit/${id}`)}
              >
                <EditIcon fontSize="small" />
              </ActionButton>
              <ActionButton color="error" onClick={() => handleSetUserId(id)}>
                <DeleteIcon color="error" fontSize="small" />
              </ActionButton>
            </>
          );
        }
      }
    }
  ];

  const data = users.map((user) => ({
    key: user._id,
    photo: <Avatar alt="Test" src={user.photo} />,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: moment(user.createdAt).format('DD/MM/YYYY'),
    updatedAt: moment(user.updatedAt).format('DD/MM/YYYY'),
    actions: user._id
  }));

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table
            title="User List"
            data={data}
            columns={columns}
            searchPlaceholder="Search Users"
          />
        </Box>
      </PerfectScrollbar>
      <Popup
        open={open}
        setOpen={setOpen}
        message="You want to delete this user"
        handleDelete={handleDelete}
      />
    </Card>
  );
};

UserResult.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleSetUserId: PropTypes.func.isRequired
};

export default UserResult;
