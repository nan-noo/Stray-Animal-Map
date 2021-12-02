import axios from '../axios';
import {USER_SERVER} from '../components/Config';
import {LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER} from './types';

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit) 
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    };
};

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit) 
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    };
};

export function auth(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/auth`, dataToSubmit) 
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    };
};

export function logoutUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/logout`, dataToSubmit) 
        .then(response => response.data);
    

    return {
        type: LOGOUT_USER,
        payload: request
    };
};