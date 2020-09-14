import { AUTH_USER, LOGIN, LOGOUT } from './types';

export const auth = () => {
    return {
        type: AUTH_USER
    }
}

export const login = (email, password) => {
    return {
        type: LOGIN,
        payload: { email, password }
    }
}
export const logout = () => {
    return {
        type: LOGOUT
    }
}