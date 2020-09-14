import { AUTH_USER_RESULT, LOGIN_RESULT, LOGOUT_RESULT } from '../actions/types';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_USER_RESULT:
            return { isAuth: action.payload.isAuth, role: action.payload.role }
        case LOGIN_RESULT:
            return { login: action.payload.login };
        case LOGOUT_RESULT:
            return { logout: action.payload.logout }
        default:
            return state;
    }
}

export default userReducer;