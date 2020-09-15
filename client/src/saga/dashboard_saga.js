import { all, fork, put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { MY_DASHBOARD, MY_DASHBOARD_RESULT } from '../actions/types';
import axios from 'axios';


//-------------auth----------------
async function authAPI() {
    return await axios.get('/api/dashboard/my').then(response => response.data);
}

function* myDashboard() {
    try {
        const payload = yield call(authAPI);
        console.log(payload);
        //yield put({ type: AUTH_USER_RESULT, payload })
    } catch (error) {
        console.log(error)
    }
    //-------------auth----------------
}

function* watchDashboard() {
    yield takeEvery(MY_DASHBOARD, myDashboard);

}

export default function* dashboardSaga() {
    yield all([fork(watchDashboard)])
}