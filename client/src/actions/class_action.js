import { ALL_CLASS, NEW_CLASS } from './types';

export const allClass = () => {
    return {
        type: ALL_CLASS
    }
}

export const newClass = (data) => {
    return {
        type: NEW_CLASS,
        payload: data
    }

}