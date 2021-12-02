import axios from 'axios';
import { SERVER_URL } from './config/config';

axios.defaults.baseURL = SERVER_URL;
export default axios;