import { ALL_CLASS_RESULT, NEW_CLASS_RESULT } from '../actions/types';

const classReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_CLASS_RESULT:
            return { allClassResult: action.payload.allClass, class: action.payload.all }
        case NEW_CLASS_RESULT:
            return { newClassResult: action.payload.newLecture, lectureData: action.payload.lectureData }
        default:
            return state;
    }
}

export default classReducer;