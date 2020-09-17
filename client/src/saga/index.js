import { all, fork } from 'redux-saga/effects';
import userSaga from './user_saga';
import classSaga from './class_saga';

export default function* rootSaga() {
    yield all([fork(userSaga), fork(classSaga)])
}
