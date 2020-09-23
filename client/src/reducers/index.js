import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import classReducer from './class_reducer';
import scoreReducer from './score_reducer';

const rootReducer = combineReducers({
    userReducer,
    classReducer,
    scoreReducer,
});

export default rootReducer;
