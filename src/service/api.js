import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

const instance = axios.create({
  baseURL: 'https://api.github.com',
  adapter: httpAdapter,
});

export default {
  searchUser: (userName) =>
    instance.get(`/users/${userName}`).then(({ data }) => data),
};
