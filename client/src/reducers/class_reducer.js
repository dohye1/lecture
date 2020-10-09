import {
    ALL_CLASS_RESULT,
    NEW_CLASS_RESULT,
    ENROLL_CLASS_RESULT,
    EDIT_CLASS_RESULT,
} from '../actions/types';

const classReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_CLASS_RESULT:
            return {
                allClassResult: action.payload.allClass,
                class: action.payload.all,
            };
        case NEW_CLASS_RESULT:
            return {
                newClassResult: action.payload.newLecture,
            };
        case EDIT_CLASS_RESULT:
            return {
                editClassResult: action.payload.editLecture,
            };
        case ENROLL_CLASS_RESULT:
            return {
                enrollResult: action.payload.enrollResult,
            };
        default:
            return state;
    }
};

export default classReducer;
