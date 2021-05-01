import axios from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:4000/api'
});

const authInfo = localStorage.getItem('authInfo')
  ? JSON.parse(localStorage.getItem('authInfo'))
  : null;

if (authInfo) {
  client.defaults.headers.common = {
    Authorization: `Bearer ${authInfo.token}`
  };
}

export default client;
