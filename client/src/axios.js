import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : '';
export default axios;