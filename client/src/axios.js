import axios from 'axios';
import { SERVER_URL } from './secret';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : SERVER_URL;
export default axios;