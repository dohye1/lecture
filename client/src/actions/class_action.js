import { ALL_CLASS, ENROLL_CLASS, NEW_CLASS,EDIT_CLASS } from './types';

export const allClass = () => {
    return {
        type: ALL_CLASS,
    };
};

export const newClass = (data) => {
    return {
        type: NEW_CLASS,
        payload: data,
    };
};

export const editClass = (data) => {
    return {
        type: EDIT_CLASS,
        payload: data,
    };
};

export const enrollClass = (data) => {
    return {
        type: ENROLL_CLASS,
        payload: data,
    };
};
