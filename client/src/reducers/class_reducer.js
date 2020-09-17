import { ALL_CLASS_RESULT } from '../actions/types';

const classReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_CLASS_RESULT:
            return { allClassResult: action.payload.allClass, class: action.payload.all }
        default:
            return state;
    }
}

export default classReducer;