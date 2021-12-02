import dotenv from 'dotenv';
dotenv.config();

export const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
export const SERVER_URL = 'http://localhost:5000/';//process.env.REACT_APP_SERVER_URL;