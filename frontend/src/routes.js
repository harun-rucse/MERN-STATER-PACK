import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from 'src/layouts/AdminLayout';
import ClientLayout from 'src/layouts/ClientLayout';
import AccountView from 'src/views/admin/account/AccountView';
import UserListView from 'src/views/admin/user/UserListView';
import UserCreateView from 'src/views/admin/user/UserCreateView';
import UserEditView from 'src/views/admin/user/UserEditView';
import DashboardView from 'src/views/admin/reports/DashboardView';
import SettingsView from 'src/views/admin/settings/SettingsView';
import LoginView from 'src/views/auth/LoginView';
import RegisterView from 'src/views/auth/RegisterView';
import HomeView from 'src/views/client/HomeView';
import NotFoundView from 'src/views/errors/NotFoundView';

const routes = (authInfo) => [
  {
    path: 'admin',
    element: !authInfo ? (
      <Navigate to="/login" />
    ) : authInfo.role !== 'admin' ? (
      <Navigate to="/" />
    ) : (
      <AdminLayout />
    ),
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'users', element: <UserListView /> },
      { path: 'users/create', element: <UserCreateView /> },
      { path: 'users/edit/:id', element: <UserEditView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '/', element: <DashboardView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <HomeView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
