import client from './client';

export const login = (email, password) =>
  client.post('/auth/login', { email, password });

export const register = (data) => client.post('/auth/register', data);

export const logout = () => client.get('/auth/logout');

export const updatePassword = (userData) =>
  client.patch('/auth/update-password', userData);
