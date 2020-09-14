import rootSaga from '../saga/index';
import rootReducer from '../reducers/index';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

export default store;
