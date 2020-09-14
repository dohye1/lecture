import { all, fork, put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { AUTH_USER, AUTH_USER_RESULT, LOGIN, LOGIN_RESULT, LOGOUT, LOGOUT_RESULT } from '../actions/types';
import axios from 'axios';

//-------------logout----------------\
async function logoutAPI() {
    return await axios.get('/api/user/logout');
}

function* logout() {
    try {
        const payload = yield call(logoutAPI);
        yield put({
            type: LOGOUT_RESULT,
            payload
        })
    } catch (error) {
        console.log(error)
    }
}
//-------------logout----------------


//-------------login----------------
let loginInfo;
async function loginAPI() {
    return await axios.post('/api/user/login', loginInfo).then(response => response.data);
}

function* login({ payload }) {
    try {
        loginInfo = payload;
        const loginResult = yield call(loginAPI);
        yield put({ type: LOGIN_RESULT, payload: loginResult })
    } catch (error) {
        console.log(error)
    }
}

//-------------login----------------


//-------------auth----------------
async function authAPI() {
    return await axios.get('/api/user/auth').then(response => response.data);
}

function* authUser() {
    try {
        const payload = yield call(authAPI);
        yield put({ type: AUTH_USER_RESULT, payload })
    } catch (error) {
        console.log(error)
    }
}
//-------------auth----------------

function* watchUser() {
    yield takeEvery(AUTH_USER, authUser);
    yield takeLatest(LOGIN, login);
    yield takeLatest(LOGOUT, logout);

}

export default function* userSaga() {
    yield all([fork(watchUser)])
}