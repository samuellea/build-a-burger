import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-84b3e.firebaseio.com/'
});

// instance.interceptor.request...
// Can also set up intereceptors for our custom instances, same as we did for global axios config.

export default instance;