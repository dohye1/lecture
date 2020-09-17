import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import classReducer from './class_reducer';

const rootReducer = combineReducers({
    userReducer, classReducer
});

export default rootReducer;