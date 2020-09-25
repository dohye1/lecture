import {
    AUTH_USER_RESULT,
    LOGIN_RESULT,
    LOGOUT_RESULT,
    REGISTER_RESULT,
} from '../actions/types';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_USER_RESULT:
            return { isAuth: action.payload.isAuth, user: action.payload.user };
        case LOGIN_RESULT:
            console.log(action.payload.login);
            return { login: action.payload.login };
        case LOGOUT_RESULT:
            return { logout: action.payload.logout };
        case REGISTER_RESULT:
            return { register: action.payload.register };
        default:
            return state;
    }
};

export default userReducer;
