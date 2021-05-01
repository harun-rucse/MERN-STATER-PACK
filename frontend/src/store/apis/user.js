import client from './client';

export const createUser = (userData) => client.post('/users', userData);

export const fetchUsers = () => client.get('/users');

export const fetchUser = (id) => client.get(`/users/${id}`);

export const updateUser = (id, userData) =>
  client.patch(`/users/${id}`, userData);

export const deleteUser = (id) => client.delete(`/users/${id}`);

export const fetchProfile = () => client.get('/users/me');

export const updateProfile = (userData) =>
  client.patch('/users/update-me', userData);
