import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : 'https://create-variable-name.herokuapp.com/';
export default axios;