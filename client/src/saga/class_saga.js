import {
    all,
    fork,
    put,
    call,
    takeEvery,
    takeLatest,
} from 'redux-saga/effects';
import {
    ALL_CLASS,
    ALL_CLASS_RESULT,
    NEW_CLASS,
    NEW_CLASS_RESULT,
    ENROLL_CLASS,
    ENROLL_CLASS_RESULT,
} from '../actions/types';
import axios from 'axios';

//-------------enrollClass----------------
let enrollData;
async function enrollClassAPI() {
    return await axios
        .post('/api/class/enroll', enrollData)
        .then((response) => response.data);
}

function* enrollClass(data) {
    enrollData = data.payload;
    try {
        const payload = yield call(enrollClassAPI);
        yield put({
            type: ENROLL_CLASS_RESULT,
            payload,
        });
    } catch (error) {
        console.log(error);
    }
}
//-------------enrollClass----------------

//-------------newClass----------------
let lectureData;
async function newClassAPI() {
    return await axios
        .post('/api/class/new', lectureData)
        .then((response) => response.data);
}

function* newClass({ payload }) {
    lectureData = payload;
    try {
        const result = yield call(newClassAPI);
        yield put({
            type: NEW_CLASS_RESULT,
            payload: result,
        });
    } catch (error) {
        console.log(error);
    }
}
//-------------newClass----------------

//-------------allClass----------------
async function allClassAPI() {
    return await axios.get('/api/class/all').then((response) => response.data);
}

function* allClass() {
    try {
        const payload = yield call(allClassAPI);
        yield put({
            type: ALL_CLASS_RESULT,
            payload,
        });
    } catch (error) {
        console.log('여기에러발생했음' + error);
    }
}
//-------------allClass----------------

function* watchClass() {
    yield takeEvery(ALL_CLASS, allClass);
    yield takeEvery(NEW_CLASS, newClass);
    yield takeEvery(ENROLL_CLASS, enrollClass);
}

export default function* classSaga() {
    yield all([fork(watchClass)]);
}
