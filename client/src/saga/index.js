import { all, fork } from 'redux-saga/effects';
import userSaga from './user_saga';
import dashboardSaga from './dashboard_saga';

export default function* rootSaga() {
    yield all([fork(userSaga), fork(dashboardSaga)])
}
