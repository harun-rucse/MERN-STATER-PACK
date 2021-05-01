import client from './client';

export const fetchSetting = () => client.get('/settings');

export const createSetting = (data) => client.post('/settings', data);

export const updateSetting = (id, data) =>
  client.patch(`/settings/${id}`, data);
