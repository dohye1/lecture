import { all, fork, put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { ALL_CLASS, ALL_CLASS_RESULT } from '../actions/types';
import axios from 'axios';

//-------------allClass----------------\
async function allClassAPI() {
    return await axios.get('/api/class/all').then(response => response.data);
}

function* allClass() {
    try {
        const payload = yield call(allClassAPI);
        yield put({
            type: ALL_CLASS_RESULT,
            payload
        })
    } catch (error) {
        console.log(error)
    }
}
//-------------allClass----------------


function* watchClass() {
    yield takeEvery(ALL_CLASS, allClass);

}

export default function* classSaga() {
    yield all([fork(watchClass)])
}