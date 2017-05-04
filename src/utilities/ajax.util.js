import axios from 'axios';
import cookies from './cookies';

axios.defaults.baseURL = '';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const api_instance = () => axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: cookies.get(config.app.auth.cookie_name)
  }
});

const ajax = {
  api: {
    get: (request) => {
      return ajax.get(request, api_instance());
    },
    post: (request) => {
      return ajax.post(request, api_instance());
    }
  },
  get: (request, instance) => {
    return (instance || axios).get(request.endpoint, {
      params: request.params
    });
  },
  post: (request, instance) => {
    return (instance || axios).post(request.endpoint, request.body);
  }
};

export default ajax;
