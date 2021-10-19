import {LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER} from '../_actions/types';

const userReducer = function(previousState = {}, action){
    switch(action.type){
        case LOGIN_USER:
            return {...previousState, login: action.payload};
        case REGISTER_USER:
            return {...previousState, register: action.payload};
        case AUTH_USER:
            return {...previousState, userData: action.payload};
        case LOGOUT_USER:
            return {...previousState, logout: action.payload};
        default:
            return previousState;   
    }
}

export default userReducer;