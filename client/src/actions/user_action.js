import { AUTH_USER, LOGIN, LOGOUT, REGISTER, UPDATE } from './types';

export const auth = () => {
    return {
        type: AUTH_USER,
    };
};

export const login = (email, password) => {
    return {
        type: LOGIN,
        payload: { email, password },
    };
};

export const register = (userInfo) => {
    return {
        type: REGISTER,
        payload: userInfo,
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
    };
};

export const update = () => {
    return { type: UPDATE };
};
