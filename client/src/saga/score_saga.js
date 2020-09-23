import {
    all,
    fork,
    put,
    call,
    takeEvery,
    takeLatest,
} from 'redux-saga/effects';
import { EVALUATE_SCORE, EVALUATE_SCORE_RESULT } from '../actions/types';
import axios from 'axios';

//-------------evaluateScore----------------
let evaluateData;
async function enrollClassAPI() {
    return await axios
        .post('/api/score/evaluate', evaluateData)
        .then((response) => response.data);
}

function* evaluateScore(data) {
    evaluateData = data.payload;
    try {
        const payload = yield call(enrollClassAPI);
        yield put({
            type: EVALUATE_SCORE_RESULT,
            payload,
        });
    } catch (error) {
        console.log(error);
    }
}
//-------------evaluateScore----------------

function* watchScore() {
    yield takeEvery(EVALUATE_SCORE, evaluateScore);
}

export default function* scoreSaga() {
    yield all([fork(watchScore)]);
}
