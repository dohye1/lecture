import {
    AUTH_USER_RESULT,
    LOGIN_RESULT,
    LOGOUT_RESULT,
    REGISTER_RESULT,
    UPDATE_RESULT,
} from '../actions/types';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_USER_RESULT:
            return { isAuth: action.payload.isAuth, user: action.payload.user };
        case LOGIN_RESULT:
            return { login: action.payload.login };
        case LOGOUT_RESULT:
            return { logout: action.payload.logout };
        case REGISTER_RESULT:
            return { register: action.payload.register };
        case UPDATE_RESULT:
            return { user: action.payload.user };
        default:
            return state;
    }
};

export default userReducer;
